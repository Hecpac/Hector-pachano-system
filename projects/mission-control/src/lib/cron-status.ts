import "server-only";

import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export const TRACKED_CRON_JOBS = [
  "daily-morning-brief-hector",
  "mission-control-approvals-check",
  "mission-control-closeout",
  "qts-cierre-6pm-report"
] as const;

export type TrackedCronJobName = (typeof TRACKED_CRON_JOBS)[number];

export type CronJobStatus = {
  name: TrackedCronJobName;
  nextRunAt: string | null;
  lastStatus: string | null;
  lastDurationMs: number | null;
  deliveryStatus: string | null;
};

export type CronStatusSnapshot = {
  jobs: CronJobStatus[];
  error: string | null;
};

const CRON_TIMEOUT_MS = 8000;
const MAX_OUTPUT_BYTES = 1024 * 1024;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function readNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function firstString(...values: unknown[]): string | null {
  for (const value of values) {
    const candidate = readString(value);
    if (candidate !== null) {
      return candidate;
    }
  }

  return null;
}

function firstNumber(...values: unknown[]): number | null {
  for (const value of values) {
    const candidate = readNumber(value);
    if (candidate !== null) {
      return candidate;
    }
  }

  return null;
}

function msToIso(value: number | null): string | null {
  if (value === null) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function extractJobs(payload: unknown): Record<string, unknown>[] {
  if (Array.isArray(payload)) {
    return payload.filter(isRecord);
  }

  if (!isRecord(payload)) {
    return [];
  }

  const directCandidates = [payload.jobs, payload.items, payload.entries, payload.crons];
  for (const candidate of directCandidates) {
    if (Array.isArray(candidate)) {
      return candidate.filter(isRecord);
    }
  }

  if (isRecord(payload.data)) {
    const nestedCandidates = [
      payload.data.jobs,
      payload.data.items,
      payload.data.entries,
      payload.data.crons
    ];
    for (const candidate of nestedCandidates) {
      if (Array.isArray(candidate)) {
        return candidate.filter(isRecord);
      }
    }
  }

  return [];
}

function normalizeJob(
  name: TrackedCronJobName,
  rawJob: Record<string, unknown> | undefined
): CronJobStatus {
  const state = rawJob && isRecord(rawJob.state) ? rawJob.state : undefined;

  const nextRunAt =
    firstString(state?.nextRunAt, rawJob?.nextRunAt) ??
    msToIso(firstNumber(state?.nextRunAtMs, rawJob?.nextRunAtMs));

  return {
    name,
    nextRunAt,
    lastStatus: firstString(
      state?.lastStatus,
      state?.lastRunStatus,
      rawJob?.lastStatus,
      rawJob?.lastRunStatus
    ),
    lastDurationMs: firstNumber(state?.lastDurationMs, rawJob?.lastDurationMs),
    deliveryStatus: firstString(state?.lastDeliveryStatus, rawJob?.lastDeliveryStatus)
  };
}

function buildEmptyJobs(): CronJobStatus[] {
  return TRACKED_CRON_JOBS.map((name) => ({
    name,
    nextRunAt: null,
    lastStatus: null,
    lastDurationMs: null,
    deliveryStatus: null
  }));
}

function firstErrorLine(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const line = value
    .split("\n")
    .map((item) => item.trim())
    .find((item) => item.length > 0);

  return line ?? null;
}

export async function getCronStatus(): Promise<CronStatusSnapshot> {
  const emptyJobs = buildEmptyJobs();

  try {
    const { stdout } = await execFileAsync(
      "openclaw",
      ["cron", "list", "--json", "--all", "--timeout", String(CRON_TIMEOUT_MS)],
      { timeout: CRON_TIMEOUT_MS, maxBuffer: MAX_OUTPUT_BYTES }
    );

    const parsed = JSON.parse(stdout) as unknown;
    const jobsByName = new Map<string, Record<string, unknown>>();

    for (const job of extractJobs(parsed)) {
      const name = readString(job.name);
      if (name) {
        jobsByName.set(name, job);
      }
    }

    return {
      jobs: TRACKED_CRON_JOBS.map((name) => normalizeJob(name, jobsByName.get(name))),
      error: null
    };
  } catch (error: unknown) {
    const stderr = isRecord(error) ? firstErrorLine(error.stderr) : null;
    const message = error instanceof Error ? firstErrorLine(error.message) : null;
    const detail = stderr ?? message;

    return {
      jobs: emptyJobs,
      error: detail
        ? `No se pudo leer el estado cron real desde OpenClaw local. ${detail}`
        : "No se pudo leer el estado cron real desde OpenClaw local."
    };
  }
}
