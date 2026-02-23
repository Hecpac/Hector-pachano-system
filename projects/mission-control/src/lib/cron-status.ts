import "server-only";

import { execFile } from "node:child_process";
import { promisify } from "node:util";

import {
  buildEmptyJobs,
  parseCronPayload,
  toSafeCronError,
  TRACKED_CRON_JOBS,
  type CronJobStatus,
  type TrackedCronJobName
} from "./cron-status-parser";

const execFileAsync = promisify(execFile);

export { TRACKED_CRON_JOBS, parseCronPayload, toSafeCronError };
export type { CronJobStatus, TrackedCronJobName };

export type CronStatusSnapshot = {
  jobs: CronJobStatus[];
  error: string | null;
};

const CRON_TIMEOUT_MS = 8000;
const MAX_OUTPUT_BYTES = 1024 * 1024;

export async function getCronStatus(): Promise<CronStatusSnapshot> {
  try {
    const { stdout } = await execFileAsync(
      "openclaw",
      ["cron", "list", "--json", "--all", "--timeout", String(CRON_TIMEOUT_MS)],
      { timeout: CRON_TIMEOUT_MS, maxBuffer: MAX_OUTPUT_BYTES }
    );

    const parsed = JSON.parse(stdout) as unknown;

    return {
      jobs: parseCronPayload(parsed),
      error: null
    };
  } catch (error: unknown) {
    return {
      jobs: buildEmptyJobs(),
      error: toSafeCronError(error)
    };
  }
}
