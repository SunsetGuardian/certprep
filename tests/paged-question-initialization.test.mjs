import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const templateUrl = new URL(
  "../src/security-plus/sy0-701/practice-test/question.njk",
  import.meta.url,
);
const scriptUrl = new URL(
  "../src/assets/js/quiz/paged-question.js",
  import.meta.url,
);

test("keeps both paged views hidden until session restoration finishes", async () => {
  const template = await readFile(templateUrl, "utf8");

  assert.match(template, /data-paged-question-app[\s\S]*aria-busy="true"/);
  assert.match(template, /data-paged-view="restored" hidden/);
  assert.match(template, /data-paged-view="unavailable" hidden/);
  assert.doesNotMatch(
    template,
    /Checking this browser tab for an active test/,
  );
});

test("renders each paged view before exposing it", async () => {
  const script = await readFile(scriptUrl, "utf8");

  const restoredRender = script.indexOf(
    "renderRestoredSession(root, restoredView, result);",
  );
  const restoredReveal = script.indexOf(
    "restoredView.hidden = false;",
    restoredRender,
  );
  const unavailableRender = script.indexOf(
    "renderUnavailableSession(unavailableView, result);",
  );
  const unavailableReveal = script.indexOf(
    "unavailableView.hidden = false;",
    unavailableRender,
  );

  assert.ok(restoredRender >= 0);
  assert.ok(restoredReveal > restoredRender);
  assert.ok(unavailableRender >= 0);
  assert.ok(unavailableReveal > unavailableRender);
});
