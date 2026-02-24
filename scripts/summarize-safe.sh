#!/usr/bin/env bash
set -euo pipefail

# summarize-safe.sh
# Wrapper around summarize CLI with X/Twitter fallback via r.jina.ai mirror.
#
# Usage:
#   scripts/summarize-safe.sh "https://x.com/..." --length short --json
#   scripts/summarize-safe.sh "https://docs.openclaw.ai" --length short

if ! command -v summarize >/dev/null 2>&1; then
  echo "❌ summarize no está instalado o no está en PATH" >&2
  exit 1
fi

if [[ $# -lt 1 ]]; then
  echo "Uso: $0 <input> [flags-de-summarize...]" >&2
  exit 1
fi

INPUT="$1"
shift || true
EXTRA_ARGS=("$@")

is_x_url() {
  [[ "$1" =~ ^https?://(x\.com|twitter\.com)/ ]]
}

to_jina_url() {
  local u="$1"
  if [[ "$u" =~ ^https:// ]]; then
    printf 'https://r.jina.ai/http://%s' "${u#https://}"
  elif [[ "$u" =~ ^http:// ]]; then
    printf 'https://r.jina.ai/http://%s' "${u#http://}"
  else
    printf '%s' "$u"
  fi
}

run_summarize_capture() {
  local url="$1"
  local out_file="$2"
  local err_file="$3"

  set +e
  summarize "$url" "${EXTRA_ARGS[@]}" >"$out_file" 2>"$err_file"
  local rc=$?
  set -e
  return "$rc"
}

TMP_OUT_ORIG="$(mktemp)"
TMP_ERR_ORIG="$(mktemp)"
TMP_OUT_FB="$(mktemp)"
TMP_ERR_FB="$(mktemp)"
trap 'rm -f "$TMP_OUT_ORIG" "$TMP_ERR_ORIG" "$TMP_OUT_FB" "$TMP_ERR_FB"' EXIT

if run_summarize_capture "$INPUT" "$TMP_OUT_ORIG" "$TMP_ERR_ORIG"; then
  # Soft-fail detection for X pages that return login wall text but still exit 0.
  if is_x_url "$INPUT" && grep -qiE "Something went wrong, but don['’]t fret|privacy related extensions may cause issues on x\.com" "$TMP_OUT_ORIG"; then
    echo "ℹ️ summarize devolvió contenido bloqueado de X; aplicando fallback r.jina.ai..." >&2
  else
    cat "$TMP_OUT_ORIG"
    exit 0
  fi
else
  if ! is_x_url "$INPUT"; then
    cat "$TMP_ERR_ORIG" >&2
    exit 1
  fi
  echo "ℹ️ summarize falló en X/Twitter; aplicando fallback r.jina.ai..." >&2
fi

FALLBACK_URL="$(to_jina_url "$INPUT")"
if run_summarize_capture "$FALLBACK_URL" "$TMP_OUT_FB" "$TMP_ERR_FB"; then
  cat "$TMP_OUT_FB"
  exit 0
fi

cat "$TMP_ERR_FB" >&2
exit 1
