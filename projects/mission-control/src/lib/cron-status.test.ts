import assert from "node:assert/strict";
import test from "node:test";

import { parseCronPayload, toSafeCronError } from "./cron-status-parser";

test("parseCronPayload normaliza jobs rastreados", () => {
  const payload = {
    jobs: [
      {
        name: "daily-morning-brief-hector",
        state: {
          nextRunAt: "2026-02-24T13:05:00.000Z",
          lastStatus: "ok",
          lastDurationMs: 8123,
          lastDeliveryStatus: "delivered"
        }
      },
      {
        name: "mission-control-closeout",
        lastRunStatus: "error",
        lastDurationMs: "2099",
        nextRunAtMs: 1771952400000
      }
    ]
  };

  const jobs = parseCronPayload(payload);

  assert.equal(jobs[0].name, "daily-morning-brief-hector");
  assert.equal(jobs[0].lastStatus, "ok");
  assert.equal(jobs[0].lastDurationMs, 8123);
  assert.equal(jobs[0].deliveryStatus, "delivered");

  assert.equal(jobs[2].name, "mission-control-closeout");
  assert.equal(jobs[2].lastStatus, "error");
  assert.equal(jobs[2].lastDurationMs, 2099);
  assert.ok(jobs[2].nextRunAt?.startsWith("2026-"));
});

test("parseCronPayload soporta payloads sin estructura esperada", () => {
  const jobs = parseCronPayload({ foo: "bar" });

  assert.equal(jobs.length, 4);
  for (const job of jobs) {
    assert.equal(job.lastStatus, null);
    assert.equal(job.nextRunAt, null);
    assert.equal(job.lastDurationMs, null);
  }
});

test("toSafeCronError no filtra stderr crudo", () => {
  const message = toSafeCronError({
    code: "ENOENT",
    stderr: "token-secreto-que-no-se-debe-exponer"
  });

  assert.equal(
    message,
    "No se pudo leer estado cron: OpenClaw CLI no esta disponible en este host."
  );
  assert.equal(message.includes("token-secreto"), false);
});
