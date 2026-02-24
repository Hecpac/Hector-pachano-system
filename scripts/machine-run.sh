#!/usr/bin/env bash
set -euo pipefail

# Uso:
#   ./scripts/machine-run.sh "Objetivo" "repo"
# Ejemplo:
#   ./scripts/machine-run.sh "Corregir SEO técnico y validar build" "hector-services-site"

if [ "$#" -lt 2 ]; then
  echo "Uso: $0 \"Objetivo\" \"repo\""
  echo "- repo puede ser absoluto o relativo a /Users/hector/.openclaw/workspace/projects"
  exit 1
fi

OBJECTIVE="$1"
REPO_INPUT="$2"

WORKSPACE="/Users/hector/.openclaw/workspace"
PROJECTS_ROOT="$WORKSPACE/projects"

if [[ "$REPO_INPUT" = /* ]]; then
  REPO_PATH="$REPO_INPUT"
else
  REPO_PATH="$PROJECTS_ROOT/$REPO_INPUT"
fi

if [ ! -d "$REPO_PATH" ]; then
  echo "Error: repo no existe: $REPO_PATH"
  exit 1
fi

TASK_ID="RUN-$(date +%Y%m%d-%H%M%S)"

if [ -f "$REPO_PATH/package.json" ]; then
  GATE_COMMANDS="[cd $REPO_PATH && npm run lint --if-present, cd $REPO_PATH && npm run typecheck --if-present, cd $REPO_PATH && npm test --if-present]"
elif [ -f "$REPO_PATH/pyproject.toml" ]; then
  GATE_COMMANDS="[cd $REPO_PATH && uv run ruff check ., cd $REPO_PATH && uv run pytest -q]"
else
  GATE_COMMANDS="[cd $REPO_PATH && git status --short]"
fi

PROMPT=$(cat <<EOF
[MACHINE_RUN_V1]
task_id: $TASK_ID
objective: $OBJECTIVE
repo: $REPO_PATH
constraints: [sin deploy, sin cambios destructivos, sin credentials/secrets, respetar guardrails]
done_criteria: [gate en verde, evidencia verificable]
gate_commands: $GATE_COMMANDS
rollback_plan: [git -C $REPO_PATH restore -SW .]
budgets: {token_budget: 250000, time_budget_min: 45, cost_budget_usd: 8}
ORQUESTACION: PLAN(planner)->EXECUTE(executor)->REVIEW(reviewer)->GATE(determinista); si GATE falla => rollback + reporte FAIL; salida final PASS/FAIL + evidencia + riesgos + siguiente paso.
EOF
)

openclaw agent \
  --agent planner \
  --thinking medium \
  --timeout 1800 \
  --json \
  --message "$PROMPT"
