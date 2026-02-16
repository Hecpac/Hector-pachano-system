#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  new-project.sh <project-slug> [--owner <name>] [--force] [--dry-run]

Examples:
  new-project.sh qts-architect
  new-project.sh market-intel --owner Hector
  new-project.sh my-project --force

Notes:
- project-slug must match: [a-z0-9][a-z0-9-]*
- Creates: projects/<project-slug>/...
- Copies context/review templates from agent-os-core/templates
EOF
}

if [[ $# -lt 1 ]]; then
  usage
  exit 1
fi

PROJECT_SLUG=""
OWNER="Hector"
FORCE=0
DRY_RUN=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help)
      usage
      exit 0
      ;;
    --owner)
      OWNER="${2:-}"
      if [[ -z "$OWNER" ]]; then
        echo "Error: --owner requires a value" >&2
        exit 1
      fi
      shift 2
      ;;
    --force)
      FORCE=1
      shift
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    --*)
      echo "Error: unknown flag '$1'" >&2
      exit 1
      ;;
    *)
      if [[ -n "$PROJECT_SLUG" ]]; then
        echo "Error: project slug already set to '$PROJECT_SLUG'" >&2
        exit 1
      fi
      PROJECT_SLUG="$1"
      shift
      ;;
  esac
done

if [[ -z "$PROJECT_SLUG" ]]; then
  echo "Error: missing project slug" >&2
  exit 1
fi

if ! [[ "$PROJECT_SLUG" =~ ^[a-z0-9][a-z0-9-]*$ ]]; then
  echo "Error: invalid project slug '$PROJECT_SLUG' (use lowercase letters, numbers, hyphens)" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CORE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
WORKSPACE_DIR="$(cd "$CORE_DIR/.." && pwd)"
PROJECTS_DIR="$WORKSPACE_DIR/projects"
PROJECT_DIR="$PROJECTS_DIR/$PROJECT_SLUG"

TEMPLATES_DIR="$CORE_DIR/templates"

required_templates=(
  "CONTEXT.template.md"
  "PROGRESS.template.md"
  "WEEKLY_REVIEW.template.md"
)

for file in "${required_templates[@]}"; do
  if [[ ! -f "$TEMPLATES_DIR/$file" ]]; then
    echo "Error: missing template '$TEMPLATES_DIR/$file'" >&2
    exit 1
  fi
done

if [[ -e "$PROJECT_DIR" && "$FORCE" -ne 1 ]]; then
  echo "Error: '$PROJECT_DIR' already exists. Use --force to overwrite." >&2
  exit 1
fi

run_cmd() {
  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "[dry-run] $*"
  else
    eval "$@"
  fi
}

render_template() {
  local src="$1"
  local dst="$2"

  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "[dry-run] render $src -> $dst"
    return 0
  fi

  sed \
    -e "s/{PROJECT_NAME}/$PROJECT_SLUG/g" \
    "$src" > "$dst"
}

if [[ "$FORCE" -eq 1 ]]; then
  run_cmd "rm -rf '$PROJECT_DIR'"
fi

run_cmd "mkdir -p '$PROJECT_DIR/.agent-os'"
run_cmd "mkdir -p '$PROJECT_DIR/context'"
run_cmd "mkdir -p '$PROJECT_DIR/memory/long-term'"
run_cmd "mkdir -p '$PROJECT_DIR/research'"
run_cmd "mkdir -p '$PROJECT_DIR/deliverables'"
run_cmd "mkdir -p '$PROJECT_DIR/metrics'"
run_cmd "mkdir -p '$PROJECT_DIR/reviews'"

render_template "$TEMPLATES_DIR/CONTEXT.template.md" "$PROJECT_DIR/context/CONTEXT.md"
render_template "$TEMPLATES_DIR/PROGRESS.template.md" "$PROJECT_DIR/context/PROGRESS.md"
render_template "$TEMPLATES_DIR/WEEKLY_REVIEW.template.md" "$PROJECT_DIR/reviews/WEEKLY_REVIEW.md"

if [[ "$DRY_RUN" -eq 0 ]]; then
  TODAY="$(date +%F)"
  cat > "$PROJECT_DIR/.agent-os/CONFIG.override.yaml" <<EOF
project:
  name: "$PROJECT_SLUG"
  owner: "$OWNER"

overrides:
  writable_paths:
    - "./context"
    - "./memory"
    - "./research"
    - "./deliverables"

agents:
  active: []

metadata:
  created_at: "$TODAY"
EOF

  cat > "$PROJECT_DIR/.agent-os/SECURITY.override.yaml" <<'EOF'
project_security:
  escalation_contact: ""
  extra_blocked_paths: []
  approved_external_domains: []
EOF

  cat > "$PROJECT_DIR/.agent-os/agents.registry.yaml" <<'EOF'
agents: []
EOF

  cat > "$PROJECT_DIR/memory/long-term/decisions.md" <<EOF
# Decisions — $PROJECT_SLUG

EOF

  cat > "$PROJECT_DIR/memory/long-term/lessons.md" <<EOF
# Lessons — $PROJECT_SLUG

EOF

  cat > "$PROJECT_DIR/metrics/dashboard.yaml" <<'EOF'
metrics:
  cycle_time: null
  rework_rate: null
  handoff_success: null
  guardrail_violations: 0
  tokens_per_task: null
  updated_at: null
EOF
fi

echo "✅ Project scaffold ready: $PROJECT_DIR"
if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "(dry-run mode: no files were written)"
fi
