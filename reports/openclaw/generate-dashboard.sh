#!/usr/bin/env bash
set -euo pipefail

BASE="/Users/hector/.openclaw/workspace/reports/openclaw"

mkdir -p "$BASE"

openclaw cron list --json > "$BASE/cron-jobs.json"
{
  echo "# Generated: $(date)"
  echo
  echo "## openclaw agents list"
  openclaw agents list
  echo
  echo "## openclaw status"
  openclaw status
} > "$BASE/agents-status.txt"

echo "Updated:"
echo "- $BASE/cron-jobs.json"
echo "- $BASE/agents-status.txt"
echo "- $BASE/agents-dashboard.html"
