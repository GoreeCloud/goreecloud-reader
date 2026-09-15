# GoreeCloud Reader — Glaze UI Adoption

**Document Version:** 1.1  
**Reader lifecycle:** Development  
**Implemented Glaze source mapping:** GLAZE UI V1.3 / `1.3.0`  
**Required current Stable target:** GLAZE UI V1.4.1 / `1.4.1`  
**V1.5 integration state:** Development compatibility only; not consumer-eligible

## Current authority

Reader's currently implemented Glaze source mapping remains **GLAZE UI V1.3 — Adaptive Resonance** (`1.3.0`). That source-adoption control plane is pinned to immutable tag `v1.3.0`, tag object `f020fdc8a39de442f9fdfb405d658259c52b99df`, and exact Glaze source commit `ff34f232f295c9dcb07e4c681f66d4104d0b9323` in `GoreeCloud/goreecloud-glaze-ui`.

That V1.3 evidence is historical/current implementation evidence, not the current Stable consumer target. The authoritative current Stable requirement for Reader is **GLAZE UI V1.4.1 / `1.4.1`**. Reader has not completed that migration or application-specific acceptance and therefore remains `applicable-migration-required`, lifecycle Development, overall `nonconformant`, and ineligible for Stable qualification.

The repository-local V1.3 machine record is `contracts/glaze-ui/reader-glaze-v1.3.json`. `scripts/validate-glaze-adoption.mjs` fails closed if Reader drifts from the pinned implementation evidence or canonical consumer-registration revision, weakens its acceptance blockers, removes required source mappings, introduces remote web design-system fetching, or drops the automated foundation checks that can be validated in CI. The same validator also requires the repository-owned Platform Contract to keep current Stable `1.4.1` as Reader's compatibility target.

## Canonical consumer registration

Glaze UI PR #178 was merged into the authoritative `GoreeCloud/goreecloud-glaze-ui` `main` branch as revision `8354308445da9ac35ced2b37a7f503a08a0aaf72`. That historical registration established Reader as `adoption-required` for the then-governing V1.3 target, with no accepted target/revision/evidence and `productionEligible: false`.

That registration is governance evidence only. It does not grant Reader `accepted-v1`, current-Stable Glaze conformance, Stable application status, overall conformance, or production eligibility. Newer Stable Glaze authority supersedes the historical registration target for current qualification.

## Repository-local mapping

### Web

The static web foundation maps its implemented V1.3 Glaze semantics into local application tokens and behavior without fetching Glaze assets from a remote runtime source. Current foundation behavior includes solid durable content, translucent interaction/navigation surfaces where appropriate, semantic tokens, responsive layouts, visible keyboard focus, reduced-motion handling, increased-contrast/forced-colors behavior, opaque resilience fallback, explicit unavailable-state messaging, and synthetic-data-only operation.

This source mapping does not establish current-Stable V1.4.1 migration or acceptance.

### Android

The Android foundation uses Jetpack Compose / Material 3 primitives as a native mapping surface for semantic hierarchy, native controls, accessibility behavior, and platform integration. Material 3 is not treated as a substitute for Glaze UI and does not independently establish Glaze conformance.

Current Android evidence remains limited to source review plus the verified API 36 debug-build path. Real-device visual, ergonomic, accessibility, and task-flow acceptance are still required, as is substantive migration to the applicable current-Stable Glaze contract.

## V1.5 Development integration

Reader carries a bounded repository-local compatibility exercise for **GLAZE UI V1.5 / `1.5.0-dev.1`** at exact Glaze development revision `e7c397837908e4644d6230f17d0f73e84e3d1558`.

V1.5 is explicitly **Development**, `consumerEligible: false`, and retains Stable baseline `1.4.1`. Reader therefore does not use V1.5 as its production dependency, current Stable target, or proof that the required V1.4.1 migration is complete.

The Reader-local Development record is `contracts/glaze-ui/reader-glaze-v1.5-development.json`. `scripts/validate-glaze-v1.5-development.mjs` consumes an exact detached checkout of the governed Glaze revision and exercises four Reader-specific machine scenarios:

- the canonical shared offline Reader profile, preserving local reading while synchronization is unavailable;
- an online synchronization state where sync becomes invocable only because the authoritative service provider declares it available;
- duplicate synchronization-capability ownership, which must fail closed rather than letting Glaze invent provider precedence; and
- Privacy Shield-owned data-use authorization in `permission-required` state, which must remain disabled until user-initiated recovery and cannot be granted by Glaze.

The dedicated CI job `Validate Reader Glaze V1.5 Development integration` verifies the exact Reader revision, fetches the exact Glaze V1.5 Development revision, and runs this repository-local compatibility validator. The integration adds no Reader runtime dependency on V1.5, changes no production or Stable compatibility declaration, and does not move V1.5 behavior into Reader's shipped web or Android runtime.

Passing this Development gate establishes only repository-local machine compatibility with the stated V1.5 resolver semantics. It does **not** establish rendered V1.5 acceptance, Android native or physical-device acceptance, assistive-technology acceptance, representative real-product task-flow acceptance, Privacy Shield acceptance, performance acceptance, repository-local consumer acceptance, Release Candidate qualification, Stable qualification, production deployment, or production eligibility.

## Automated rendered-web verification — 0.0.4 foundation

Reader carries a real browser-rendered CI harness for the **implemented synthetic web foundation**. The harness runs the same local static Reader surface through Chromium, Firefox, and WebKit and performs automated checks for:

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

This is materially stronger than source-only mapping evidence because it exercises the rendered implementation in actual browser engines. It is still **not** complete consumer acceptance. Automated checks cannot establish manual assistive-technology behavior, human visual/optical review, real Reader workflows that are not implemented, production performance, rollback approval, or product production approval. It also does not validate V1.5 rendering because V1.5 is not a Reader runtime dependency in this Development slice.

## Truth and authority boundaries

Glaze UI governs presentation and interaction only. Reader must not let visual state fabricate or strengthen platform-system authority:

- Privacy Shield remains authoritative for privacy, permitted data use, consent, and purpose truth.
- Wardveil Security remains authoritative for security and protection truth.
- Everkeep remains authoritative for continuity and recovery truth.
- GoreeCloud Identity remains authoritative for account, identity, authentication, authorization, device, and session truth.
- GoreeCloud Mesh remains authoritative for coordination and capability-discovery truth within its governed scope; reachability does not itself grant authorization.
- GoreeCloud Manager remains authoritative for applicable administrative and operational-management surfaces once integrated.

The V1.5 Development resolver may present capability state from those authorities but cannot create, strengthen, merge, or reinterpret their authority. Provider conflicts fail closed; permission recovery remains user initiated; consequential and fallback actions are not automatically executed.

## Acceptance status

**Not accepted yet.** Exact V1.3 source pinning, historical canonical consumer registration, repository-local mapping, source validation, the automated Chromium/Firefox/WebKit rendered-web matrix, and V1.5 Development compatibility testing are useful evidence but are not sufficient for current-Stable GLAZE UI acceptance.

The following gates remain fail-closed:

- substantive migration from the implemented V1.3 source mapping to current Stable V1.4.1;
- formal rendered web acceptance against the current Stable implementation beyond the automated foundation scope;
- manual web accessibility/assistive-technology acceptance;
- representative real-product web task-flow acceptance;
- Android native visual/interaction acceptance;
- Android physical-device acceptance;
- Android accessibility acceptance;
- representative Android task-flow acceptance;
- full product-specific current-Stable Glaze conformance review;
- applicable Privacy Shield, Wardveil Security, Everkeep, Identity, Mesh, and Manager runtime acceptance;
- rollback and production approval; and
- production readiness and release governance.

Until those gates are independently accepted, `goreecloud.platform.yaml` must remain `applicable-migration-required`, the repository remains `nonconformant`, current-Stable acceptance is unauthorized, and production eligibility remains false.

## Reader-specific future components

Planned Glaze work still includes cover grids, shelves, title/series detail pages, distraction-free reader chrome, manga spread controls, webtoon navigation, EPUB typography controls, PDF navigation, audiobook Now Playing, downloads, annotations, and responsive tablet/large-screen layouts. Each implemented surface must earn its own applicable rendered/native/accessibility/task-flow evidence; neither the V1.3 foundation record nor the V1.5 Development compatibility record pre-approves those future components.
