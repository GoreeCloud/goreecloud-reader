# GoreeCloud Reader — GLAZE UI V1.3 Adoption

## Current authority

Reader targets the current Stable **GLAZE UI V1.3 — Adaptive Resonance** release (`1.3.0`). The adoption control plane is pinned to the immutable Stable tag `v1.3.0`, tag object `f020fdc8a39de442f9fdfb405d658259c52b99df`, and exact Stable Glaze source commit `ff34f232f295c9dcb07e4c681f66d4104d0b9323` in `GoreeCloud/goreecloud-glaze-ui`.

The repository-local machine record is `contracts/glaze-ui/reader-glaze-v1.3.json`. `scripts/validate-glaze-adoption.mjs` fails closed if Reader drifts from the pinned Stable release identity or canonical consumer-registration revision, weakens its acceptance blockers, removes required source mappings, introduces remote web design-system fetching, or drops the automated foundation checks that can be validated in CI.

## Canonical consumer registration

Glaze UI PR #178 was merged into the authoritative `GoreeCloud/goreecloud-glaze-ui` `main` branch as revision `8354308445da9ac35ced2b37a7f503a08a0aaf72`. The canonical `consumers/registry.json` registers `GoreeCloud/goreecloud-reader` with status `adoption-required`, `requiredTargetVersion: 1.3.0`, no accepted target/revision/evidence, and `productionEligible: false`.

That registration is governance evidence only. It does not grant Reader `accepted-v1`, Stable application status, overall conformance, or production eligibility.

## Repository-local mapping

### Web

The static web foundation maps current-Stable Glaze semantics into local application tokens and behavior without fetching Glaze assets from a remote runtime source. Current foundation behavior includes solid durable content, translucent interaction/navigation surfaces where appropriate, semantic tokens, responsive layouts, visible keyboard focus, reduced-motion handling, increased-contrast/forced-colors behavior, opaque resilience fallback, explicit unavailable-state messaging, and synthetic-data-only operation.

### Android

The Android foundation uses Jetpack Compose / Material 3 primitives as a native mapping surface for semantic hierarchy, native controls, accessibility behavior, and platform integration. Material 3 is not treated as a substitute for Glaze UI and does not independently establish Glaze conformance.

Current Android evidence remains limited to source review plus the verified API 36 debug-build path. Real-device visual, ergonomic, accessibility, and task-flow acceptance are still required.

## Automated rendered-web verification — 0.0.4 foundation

Reader now carries a real browser-rendered CI harness for the **implemented synthetic web foundation**. The harness runs the same local static Reader surface through Chromium, Firefox, and WebKit and performs automated checks for:

- local-only application requests and preservation of the no-personal-media boundary;
- visible keyboard focus and skip navigation;
- category filtering plus explicit current-state semantics;
- search, empty-state recovery, and result-count behavior;
- modal details, accessible naming, focus restoration, and explicit blocked-action feedback;
- semantic progress reporting;
- narrow-window responsive composition;
- Reduced Motion behavior; and
- automated WCAG A/AA findings through axe-core.

The harness is implemented by `apps/web/tests/glaze-rendered.spec.mjs`, configured by `apps/web/playwright.config.mjs`, and described in `apps/web/TESTING.md`. The development-test dependencies are pinned to `@playwright/test` 1.63.0 and `axe-core` 4.13.0. They are not shipped as Reader runtime dependencies.

This is materially stronger than source-only mapping evidence because it exercises the rendered implementation in actual browser engines. It is still **not** complete consumer acceptance. Automated checks cannot establish manual assistive-technology behavior, human visual/optical review, real Reader workflows that are not implemented, production performance, rollback approval, or product production approval.

## Truth and authority boundaries

Glaze UI governs presentation and interaction only. Reader must not let visual state fabricate or strengthen platform-system authority:

- Privacy Shield remains authoritative for privacy and consent truth.
- Wardveil Security remains authoritative for security and protection truth.
- Everkeep remains authoritative for continuity and recovery truth.
- GoreeCloud Identity remains authoritative for account, identity, authorization, device, and session truth.
- GoreeCloud Mesh remains authoritative for coordination/capability truth.
- GoreeCloud Manager remains authoritative for applicable administrative/operational surfaces once integrated.

## Acceptance status

**Not accepted yet.** Exact Stable source pinning, canonical consumer registration, repository-local mapping, source validation, and the automated Chromium/Firefox/WebKit rendered-web matrix are necessary evidence but are not sufficient for GLAZE UI acceptance.

The following gates remain fail-closed:

- formal rendered web acceptance beyond the automated foundation scope;
- manual web accessibility/assistive-technology acceptance;
- representative real-product web task-flow acceptance;
- Android native visual/interaction acceptance;
- Android physical-device acceptance;
- Android accessibility acceptance;
- representative Android task-flow acceptance;
- full product-specific Glaze conformance review;
- rollback and production approval; and
- production readiness and release governance.

Until those gates are independently accepted, `goreecloud.platform.yaml` must remain `applicable-migration-required`, the repository remains `nonconformant`, `accepted-v1` is unauthorized, and production eligibility remains false.

## Reader-specific future components

Planned Glaze work still includes cover grids, shelves, title/series detail pages, distraction-free reader chrome, manga spread controls, webtoon navigation, EPUB typography controls, PDF navigation, audiobook Now Playing, downloads, annotations, and responsive tablet/large-screen layouts. Each implemented surface must earn its own applicable rendered/native/accessibility/task-flow evidence; this foundation record does not pre-approve those future components.
