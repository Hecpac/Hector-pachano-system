#!/usr/bin/env bash
set -Eeuo pipefail

usage() {
  cat <<'EOF'
validate-stack.sh — run lint + test + build in a JS/TS project

Usage:
  scripts/validate-stack.sh [project_path] [--best-effort]

Options:
  --best-effort   Do not fail if lint/test/build script is missing.
  -h, --help      Show this help.

Examples:
  scripts/validate-stack.sh /Users/hector/.openclaw/workspace/Sinpetca
  scripts/validate-stack.sh . --best-effort
EOF
}

TARGET="."
BEST_EFFORT=0

for arg in "$@"; do
  case "$arg" in
    --best-effort) BEST_EFFORT=1 ;;
    -h|--help) usage; exit 0 ;;
    *) TARGET="$arg" ;;
  esac
done

if [[ ! -d "$TARGET" ]]; then
  echo "❌ Project path not found: $TARGET" >&2
  exit 1
fi

cd "$TARGET"

if [[ ! -f package.json ]]; then
  echo "❌ package.json not found in: $(pwd)" >&2
  echo "   This validator currently targets JS/TS projects." >&2
  exit 1
fi

PM="npm"
declare -a RUN=("npm" "run")

if [[ -f pnpm-lock.yaml ]]; then
  PM="pnpm"
  RUN=("pnpm")
elif [[ -f yarn.lock ]]; then
  PM="yarn"
  RUN=("yarn")
elif [[ -f bun.lockb || -f bun.lock ]]; then
  PM="bun"
  RUN=("bun" "run")
fi

has_script() {
  local script_name="$1"
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    process.exit(pkg.scripts && pkg.scripts['${script_name}'] ? 0 : 1);
  " >/dev/null 2>&1
}

run_script() {
  local script_name="$1"
  echo "\n▶ Running: ${script_name}"
  "${RUN[@]}" "$script_name"
}

required=(lint test build)
missing=()

for s in "${required[@]}"; do
  if ! has_script "$s"; then
    missing+=("$s")
  fi
done

echo "Project: $(pwd)"
echo "Package manager: ${PM}"

if (( ${#missing[@]} > 0 )) && (( BEST_EFFORT == 0 )); then
  echo "❌ Missing required scripts in package.json: ${missing[*]}" >&2
  echo "   Tip: use --best-effort to skip missing scripts." >&2
  exit 2
fi

if (( ${#missing[@]} > 0 )); then
  echo "⚠️  Missing scripts (skipped due to --best-effort): ${missing[*]}"
fi

ran_any=0
for s in "${required[@]}"; do
  if has_script "$s"; then
    ran_any=1
    run_script "$s"
  fi
done

if (( ran_any == 0 )); then
  echo "❌ Nothing to run (no lint/test/build scripts found)." >&2
  exit 3
fi

echo "\n✅ Validation complete (lint + test + build)."
