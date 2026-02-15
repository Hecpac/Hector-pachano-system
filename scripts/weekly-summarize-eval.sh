#!/usr/bin/env bash
set -euo pipefail

WORKSPACE="${WORKSPACE:-/Users/hector/.openclaw/workspace}"
URL_FILE="${URL_FILE:-$WORKSPACE/config/summarize-eval-urls.txt}"
OUT_ROOT="${OUT_ROOT:-$WORKSPACE/reports/summarize-eval}"
BASE_MODEL="${BASE_MODEL:-openai/gpt-5.2}"
LENGTH="${LENGTH:-xl}"
TIMEOUT="${TIMEOUT:-2m}"
CASE_TIMEOUT_SECONDS="${CASE_TIMEOUT_SECONDS:-180}"

mkdir -p "$OUT_ROOT"
RUN_ID="$(date +%F_%H%M%S)"
RUN_DIR="$OUT_ROOT/$RUN_ID"
RAW_DIR="$RUN_DIR/raw"
mkdir -p "$RAW_DIR"

if ! command -v summarize >/dev/null 2>&1; then
  echo "summarize CLI no está instalado o no está en PATH" >&2
  exit 1
fi

# Load URLs from args (preferred) or URL_FILE
URLS=()
if [ "$#" -gt 0 ]; then
  for u in "$@"; do
    URLS+=("$u")
  done
elif [ -f "$URL_FILE" ]; then
  while IFS= read -r line; do
    line="${line%%#*}"
    line="$(echo "$line" | xargs)"
    [ -n "$line" ] && URLS+=("$line")
  done < "$URL_FILE"
fi

if [ "${#URLS[@]}" -eq 0 ]; then
  echo "No hay URLs para evaluar. Agrega URLs en $URL_FILE o pásalas como argumentos." >&2
  exit 1
fi

{
  echo "run_id\turl_idx\tlabel\tmode\tselector\tstatus\texit_code\telapsed_s\tmodel_used\toutput_chars"
} > "$RUN_DIR/results.tsv"

# Refresh free model preset
set +e
summarize refresh-free --runs 2 --smart 3 --min-params 27b --max-age-days 180 --verbose \
  > "$RUN_DIR/refresh-free.log" 2>&1
REFRESH_RC=$?
set -e

FREE_MODEL=""
if [ -f "$HOME/.summarize/config.json" ]; then
  FREE_MODEL="$(node -e 'const fs=require("fs");try{const p=process.env.HOME+"/.summarize/config.json";const j=JSON.parse(fs.readFileSync(p,"utf8"));const m=j?.models?.free;let out="";if(Array.isArray(m))out=m[0]||"";else if(typeof m==="string")out=m;process.stdout.write(out);}catch{}' || true)"
fi

run_case() {
  local run_id="$1"
  local url_idx="$2"
  local url="$3"
  local label="$4"
  local mode="$5"      # model|cli
  local selector="$6"  # model id or cli name

  local stem="u${url_idx}_${label}"
  local out_json="$RAW_DIR/${stem}.json"
  local out_err="$RAW_DIR/${stem}.stderr.log"

  local start_ts end_ts elapsed rc
  start_ts="$(date +%s)"

  local cmd=(summarize "$url" --json --stream off --length "$LENGTH" --timeout "$TIMEOUT")
  if [ "$mode" = "model" ]; then
    cmd+=(--model "$selector")
  else
    cmd+=(--cli "$selector")
  fi

  set +e
  python3 - "$CASE_TIMEOUT_SECONDS" "$out_json" "$out_err" "${cmd[@]}" <<'PY'
import subprocess
import sys

hard_timeout = int(sys.argv[1])
out_path = sys.argv[2]
err_path = sys.argv[3]
cmd = sys.argv[4:]

with open(out_path, "wb") as out, open(err_path, "wb") as err:
    try:
        proc = subprocess.run(cmd, stdout=out, stderr=err, timeout=hard_timeout)
        raise SystemExit(proc.returncode)
    except subprocess.TimeoutExpired:
        err.write(f"\n[weekly-eval] hard-timeout after {hard_timeout}s\n".encode("utf-8"))
        raise SystemExit(124)
PY
  rc=$?
  set -e

  end_ts="$(date +%s)"
  elapsed=$((end_ts - start_ts))

  local status="ok"
  [ "$rc" -ne 0 ] && status="error"

  local parsed model_used output_chars
  parsed="$(node -e '
const fs=require("fs");
try{
  const p=process.argv[1];
  const j=JSON.parse(fs.readFileSync(p,"utf8"));
  const model = j?.model?.id ?? j?.model ?? j?.metrics?.model ?? j?.metadata?.model ?? "";
  const summary = j?.summary ?? j?.output ?? j?.text ?? j?.result ?? "";
  process.stdout.write(String(model).replace(/\t|\n/g," ")+"\t"+String(summary).length);
}catch{process.stdout.write("\t");}
' "$out_json" 2>/dev/null || true)"

  model_used="${parsed%%$'\t'*}"
  output_chars="${parsed#*$'\t'}"
  [ "$output_chars" = "$parsed" ] && output_chars=""

  {
    printf "%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n" \
      "$run_id" "$url_idx" "$label" "$mode" "$selector" "$status" "$rc" "$elapsed" "$model_used" "$output_chars"
  } >> "$RUN_DIR/results.tsv"
}

idx=1
for url in "${URLS[@]}"; do
  run_case "$RUN_ID" "$idx" "$url" "baseline" "model" "$BASE_MODEL"
  run_case "$RUN_ID" "$idx" "$url" "free" "model" "free"
  run_case "$RUN_ID" "$idx" "$url" "codex" "cli" "codex"
  run_case "$RUN_ID" "$idx" "$url" "claude" "cli" "claude"
  run_case "$RUN_ID" "$idx" "$url" "gemini" "cli" "gemini"
  run_case "$RUN_ID" "$idx" "$url" "agent" "cli" "agent"
  idx=$((idx + 1))
done

# Human-readable report
{
  echo "# Weekly Summarize Eval"
  echo
  echo "- Run: \`$RUN_ID\`"
  echo "- Created: $(date)"
  echo "- refresh-free exit code: $REFRESH_RC"
  [ -n "$FREE_MODEL" ] && echo "- free candidate #1: \`$FREE_MODEL\`"
  echo "- Baseline: \`$BASE_MODEL\`"
  echo "- Length: \`$LENGTH\` | Timeout: \`$TIMEOUT\` | Hard timeout/case: \`$CASE_TIMEOUT_SECONDS s\`"
  echo
  echo "## Targets"
  i=1
  for url in "${URLS[@]}"; do
    echo "- u${i}: $url"
    i=$((i + 1))
  done
  echo
  echo "## Results"
  echo
  echo "| target | runner | status | sec | model | chars |"
  echo "|---|---|---:|---:|---|---:|"
  awk -F'\t' 'NR>1{printf("| u%s | %s | %s | %s | %s | %s |\n",$2,$3,$6,$8,$9,$10)}' "$RUN_DIR/results.tsv"
  echo
  echo "## Artifacts"
  echo "- TSV: \`$RUN_DIR/results.tsv\`"
  echo "- refresh log: \`$RUN_DIR/refresh-free.log\`"
  echo "- raw JSON/stderr: \`$RAW_DIR\`"
} > "$RUN_DIR/report.md"

ln -sfn "$RUN_DIR" "$OUT_ROOT/latest"

echo "OK: $RUN_DIR"
echo "Report: $RUN_DIR/report.md"