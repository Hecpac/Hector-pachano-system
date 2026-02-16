#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  check-agent-os.sh [--all] [project-slug ...]

Examples:
  check-agent-os.sh --all
  check-agent-os.sh phd
  check-agent-os.sh phd qts-architect

Checks required folders/files for each project under projects/<name>.
Exits with non-zero status when any required element is missing.
EOF
}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CORE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
WORKSPACE_DIR="$(cd "$CORE_DIR/.." && pwd)"
PROJECTS_DIR="$WORKSPACE_DIR/projects"

if [[ ! -d "$PROJECTS_DIR" ]]; then
  echo "Error: projects directory not found: $PROJECTS_DIR" >&2
  exit 1
fi

CHECK_ALL=0
PROJECT_LIST=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help)
      usage
      exit 0
      ;;
    --all)
      CHECK_ALL=1
      shift
      ;;
    --*)
      echo "Error: unknown flag '$1'" >&2
      exit 1
      ;;
    *)
      PROJECT_LIST+=("$1")
      shift
      ;;
  esac
done

if [[ "$CHECK_ALL" -eq 1 && "${#PROJECT_LIST[@]}" -gt 0 ]]; then
  echo "Error: use --all OR explicit project slugs, not both." >&2
  exit 1
fi

if [[ "$CHECK_ALL" -eq 1 ]]; then
  for p in "$PROJECTS_DIR"/*; do
    [[ -d "$p" ]] || continue
    PROJECT_LIST+=("$(basename "$p")")
  done
fi

if [[ "${#PROJECT_LIST[@]}" -eq 0 ]]; then
  usage
  exit 1
fi

required_dirs=(
  ".agent-os"
  "context"
  "memory"
  "research"
  "deliverables"
  "metrics"
  "reviews"
)

required_files=(
  ".agent-os/CONFIG.override.yaml"
  ".agent-os/SECURITY.override.yaml"
  ".agent-os/agents.registry.yaml"
  "context/CONTEXT.md"
  "context/PROGRESS.md"
  "metrics/dashboard.yaml"
  "reviews/WEEKLY_REVIEW.md"
)

TOTAL=0
FAILED=0

check_project() {
  local slug="$1"
  local dir="$PROJECTS_DIR/$slug"
  local missing=0

  printf '\n🔎 Checking project: %s\n' "$slug"

  if [[ ! -d "$dir" ]]; then
    echo "  ❌ missing project directory: $dir"
    return 1
  fi

  local d
  for d in "${required_dirs[@]}"; do
    if [[ -d "$dir/$d" ]]; then
      echo "  ✅ dir  $d"
    else
      echo "  ❌ dir  $d"
      missing=1
    fi
  done

  local f
  for f in "${required_files[@]}"; do
    if [[ -f "$dir/$f" ]]; then
      echo "  ✅ file $f"
    else
      echo "  ❌ file $f"
      missing=1
    fi
  done

  # Lightweight content checks
  if [[ -f "$dir/.agent-os/CONFIG.override.yaml" ]]; then
    if grep -q '^project:' "$dir/.agent-os/CONFIG.override.yaml" && grep -q 'name:' "$dir/.agent-os/CONFIG.override.yaml"; then
      echo "  ✅ config has project/name"
    else
      echo "  ⚠️  config missing expected keys (project/name)"
      missing=1
    fi
  fi

  if [[ -f "$dir/context/CONTEXT.md" ]]; then
    if grep -q '{PROJECT_NAME}' "$dir/context/CONTEXT.md"; then
      echo "  ⚠️  unresolved placeholder in CONTEXT.md"
      missing=1
    fi
  fi

  if [[ "$missing" -eq 0 ]]; then
    echo "  ✅ RESULT: PASS"
    return 0
  fi

  echo "  ❌ RESULT: FAIL"
  return 1
}

for project in "${PROJECT_LIST[@]}"; do
  TOTAL=$((TOTAL + 1))
  if ! check_project "$project"; then
    FAILED=$((FAILED + 1))
  fi
done

printf '\n============================\n'
echo "Checked: $TOTAL"
echo "Failed : $FAILED"

if [[ "$FAILED" -gt 0 ]]; then
  exit 1
fi

echo "All checks passed ✅"
