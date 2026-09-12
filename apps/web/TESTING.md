# GoreeCloud Reader Web Rendered Verification

## Scope

This directory contains a development-only browser-rendered verification harness for the synthetic GoreeCloud Reader web foundation. It does not authorize real media processing and does not establish full GLAZE UI consumer acceptance or production readiness.

The harness exercises the actual static web implementation through Chromium, Firefox, and WebKit. It verifies the currently implemented synthetic foundation only:

- local-only application requests;
- visible keyboard focus and skip navigation;
- category filtering and current-state semantics;
- library search and empty-state recovery;
- modal detail interaction and focus restoration;
- explicit unavailable-state behavior for blocked import/read/download actions;
- progress semantics;
- responsive narrow-window composition;
- reduced-motion behavior; and
- automated WCAG A/AA checks through axe-core.

Manual assistive-technology qualification, human visual/optical review, full browser/platform support approval, real Reader workflows, Android acceptance, performance qualification, rollback approval, and production approval remain separate gates.

## Development-test dependencies

The harness uses pinned development-test dependencies only:

- `@playwright/test` 1.63.0 — Apache-2.0; browser automation/test runner.
- `axe-core` 4.13.0 — MPL-2.0; automated accessibility analysis.

Neither dependency is shipped as part of the static Reader web runtime. CI installs them only to execute verification.

## Run

From `apps/web`:

```bash
npm install --ignore-scripts --no-audit --no-fund
npx playwright install --with-deps chromium firefox webkit
npm run test:rendered
```

The Playwright configuration starts a loopback-only Python static server and writes machine-readable test evidence under `test-results/`.
