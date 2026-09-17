# GoreeCloud Reader — Glaze UI Adoption

**Document Version:** 1.2  
**Reader lifecycle:** Development  
**Implemented Glaze source mapping:** GLAZE UI V1.3 / `1.3.0`  
**Required current Stable target:** GLAZE UI V1.5 / `1.5.1`  
**Current Stable source authority:** `GoreeCloud/goreecloud-glaze-ui@98da57064ede0f334627b632bc16801f580331af`  
**V1.5 Development record:** Historical regression evidence only  
**V1.5.1 Stable integration state:** Repository-local compatibility evidence only; substantive source migration and consumer acceptance remain open

## Current authority

Reader's currently implemented Glaze source mapping remains **GLAZE UI V1.3 — Adaptive Resonance** (`1.3.0`). That source-adoption control plane is pinned to immutable tag `v1.3.0`, tag object `f020fdc8a39de442f9fdfb405d658259c52b99df`, and exact historical Glaze source commit `ff34f232f295c9dcb07e4c681f66d4104d0b9323` in `GoreeCloud/goreecloud-glaze-ui`.

That V1.3 evidence is implementation provenance, not the current Stable consumer target. The authoritative current Stable requirement for Reader is **GLAZE UI V1.5 / `1.5.1`** at exact Glaze source revision `98da57064ede0f334627b632bc16801f580331af`. Reader has not completed substantive migration of its shipped web or Android source to that Stable release and therefore remains `applicable-migration-required`, lifecycle Development, overall `nonconformant`, and ineligible for Stable qualification.

The current Stable Glaze lifecycle declares `currentOfficial: 1.5.1`, `currentStable: 1.5.1`, no active Candidate, and no active patch Release Candidate. V1.5.0 remains the immediate known-good Stable rollback baseline. Shared V1.5.1 qualification covers 18 accepted Glaze obligations, but those shared design-system qualifications do not become Reader-local rendered, native, accessibility, workflow, performance, rollback, release, deployment, or production acceptance.

The repository-local V1.3 machine record remains `contracts/glaze-ui/reader-glaze-v1.3.json`. The current Stable compatibility record is `contracts/glaze-ui/reader-glaze-v1.5.1-stable.json`. `scripts/validate-glaze-adoption.mjs` fails closed if Reader drifts from its pinned implementation evidence, current Stable target, current Platform Contract authority, acceptance blockers, or local-only foundation safeguards. `scripts/validate-glaze-v1.5.1-stable.mjs` separately validates Reader semantics against an exact detached checkout of the current Stable Glaze revision.

## Current Platform Contract authority

Reader now targets **GoreeCloud Platform Contract `0.2`** at central authority revision `GoreeCloud/GoreeCloud@981c5807f249955e9f2c6c5d9136c9ed9c8017e9`.

The current contract defines **exactly seven Integral Platform Systems**: GoreeCloud Manager, Privacy Shield, Wardveil Security, Everkeep, Glaze UI, GoreeCloud Mesh, and GoreeCloud Identity. **GoreeCloud Sync is not an eighth Integral Platform System.** Reader's synchronization requirements remain real product obligations, but Sync is governed separately as an application/service capability and must earn its own dataset, authorization, reconciliation, offline-resume, cross-device, and runtime acceptance evidence.

The earlier Reader Contract 0.3/eight-system branch state is retained only as historical development provenance. It is not the current authority and is not an intermediate state that must be promoted before this reconciliation can reach `main`.

## Canonical consumer registration

Glaze UI PR #178 was merged into the authoritative `GoreeCloud/goreecloud-glaze-ui` `main` branch as revision `8354308445da9ac35ced2b37a7f503a08a0aaf72`. That historical registration established Reader as `adoption-required` for the then-governing V1.3 target, with no accepted target/revision/evidence and `productionEligible: false`.

Current Glaze UI V1.5.1 consumer authority continues to list `GoreeCloud/goreecloud-reader` as `adoption-required`, requires target version `1.5.1`, leaves accepted `targetVersion`, accepted `referenceRevision`, and accepted evidence unset, and keeps `productionEligible: false`. Newer Stable authority therefore supersedes the historical registration target without rewriting the historical record.

Neither the historical registration nor the current registry grants Reader `accepted-v1`, current-Stable Glaze conformance, Stable application status, overall conformance, or production eligibility.

## Repository-local mapping

### Web

The static web foundation maps its implemented V1.3 Glaze semantics into local application tokens and behavior without fetching Glaze assets from a remote runtime source. Current foundation behavior includes solid durable content, translucent interaction/navigation surfaces where appropriate, semantic tokens, responsive layouts, visible keyboard focus, reduced-motion handling, increased-contrast/forced-colors behavior, opaque resilience fallback, explicit unavailable-state messaging, and synthetic-data-only operation.

This source mapping does not establish current-Stable V1.5.1 migration or acceptance.

### Android

The Android foundation uses Jetpack Compose / Material 3 primitives as a native mapping surface for semantic hierarchy, native controls, accessibility behavior, and platform integration. Material 3 is not treated as a substitute for Glaze UI and does not independently establish Glaze conformance.

Current Android evidence remains limited to source review plus the verified API 36 debug-build path. Real-device visual, ergonomic, accessibility, and task-flow acceptance are still required, as is substantive migration to the applicable current-Stable Glaze contract.

## Historical V1.5 Development regression record

Reader retains a bounded repository-local compatibility exercise for historical **GLAZE UI V1.5 / `1.5.0-dev.1`** at exact Glaze Development revision `e7c397837908e4644d6230f17d0f73e84e3d1558`.

That upstream revision was explicitly Development, `consumerEligible: false`, and used Stable baseline `1.4.1`. The Reader-local record `contracts/glaze-ui/reader-glaze-v1.5-development.json` therefore remains historical Development evidence. It is not rewritten to claim that 1.5.1 existed at the time, and it is not used as Reader's current Stable target.

`scripts/validate-glaze-v1.5-development.mjs` continues to exercise the four historical Reader scenarios against that exact Development revision so later repository changes cannot silently break the previously established compatibility properties. The workflow labels this as historical regression evidence rather than current Stable acceptance.

## V1.5.1 Stable repository-local compatibility

Reader now carries a separate bounded compatibility record for exact current Stable **GLAZE UI V1.5 / `1.5.1`** at source revision `98da57064ede0f334627b632bc16801f580331af`.

The machine record is `contracts/glaze-ui/reader-glaze-v1.5.1-stable.json`. The validator `scripts/validate-glaze-v1.5.1-stable.mjs` checks the exact Glaze Stable checkout, lifecycle identity, consumer registry state, reviewed V1.5 implementation anchor, V1.5.1 qualification anchor, current Platform Contract 0.2 authority, and the retained representative Reader profile. It then runs four Reader-specific semantic scenarios:

- the shared offline Reader profile, preserving local reading while synchronization remains visible but unavailable;
- an online synchronization state where sync becomes invocable only because the authoritative service provider declares it available;
- duplicate synchronization-capability ownership, which fails closed instead of inventing provider precedence; and
- Privacy Shield-owned data-use authorization in `permission-required` state, which remains disabled until user-initiated recovery and cannot be granted by Glaze.

Across those scenarios Glaze remains presentation-only. It cannot infer authorization, grant permission, invent provider precedence, automatically navigate, automatically execute consequential actions, or automatically execute fallbacks. Diagnostics remain privacy-minimized and do not require telemetry or remote analysis.

This compatibility exercise adds no shipped Reader runtime dependency on the V1.5.1 module and does not change `platform_systems.glaze_ui.version` from the truthfully implemented `1.3.0`. It changes Reader's required Stable target and validates semantic compatibility only.

Passing this Stable compatibility gate does **not** establish rendered V1.5.1 application acceptance, Android native or physical-device V1.5.1 acceptance, manual assistive-technology acceptance, representative real-product task-flow acceptance, product-specific performance acceptance, rollback acceptance, repository-local consumer acceptance, release approval, deployment, Stable qualification, or production eligibility.

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

This is materially stronger than source-only mapping evidence because it exercises the rendered implementation in actual browser engines. It is still **not** current-Stable consumer acceptance because the rendered foundation continues to implement V1.3 semantics rather than a completed V1.5.1 source migration. Automated checks also cannot establish manual assistive-technology behavior, human visual/optical review, real Reader workflows that are not implemented, production performance, rollback approval, or product production approval.

## Truth and authority boundaries

Glaze UI governs presentation and interaction only. Reader must not let visual state fabricate or strengthen platform-system authority:

- Privacy Shield remains authoritative for privacy, permitted data use, consent, and purpose truth.
- Wardveil Security remains authoritative for security and protection truth.
- Everkeep remains authoritative for continuity and recovery truth.
- GoreeCloud Identity remains authoritative for account, identity, authentication, authorization, device, and session truth.
- GoreeCloud Mesh remains authoritative for coordination and capability-discovery truth within its governed scope; reachability does not itself grant authorization.
- GoreeCloud Manager remains authoritative for applicable administrative and operational-management surfaces once integrated.

GoreeCloud Sync remains a separately governed application/service capability rather than a platform authority. Glaze may present capability state from authorized providers, but it cannot create, strengthen, merge, or reinterpret their authority. Provider conflicts fail closed; permission recovery remains user initiated; consequential and fallback actions are not automatically executed.

## Acceptance status

**Not accepted yet.** Exact V1.3 source pinning, historical canonical consumer registration, repository-local V1.3 mapping, automated Chromium/Firefox/WebKit foundation evidence, retained V1.5 Development regression evidence, and bounded V1.5.1 Stable compatibility testing are useful evidence but are not sufficient for current-Stable GLAZE UI consumer acceptance.

The following gates remain fail-closed:

- substantive migration from the implemented V1.3 source mapping to current Stable V1.5.1;
- formal rendered web acceptance against the migrated current Stable implementation;
- manual web accessibility/assistive-technology acceptance;
- representative real-product web task-flow acceptance;
- Android native visual/interaction acceptance against the current Stable contract;
- Android physical-device acceptance;
- Android accessibility acceptance;
- representative Android task-flow acceptance;
- product-specific performance acceptance for the actual Reader workload;
- full product-specific current-Stable Glaze conformance review;
- applicable Privacy Shield, Wardveil Security, Everkeep, Identity, Mesh, Manager, and separately governed Sync runtime acceptance;
- rollback and release approval; and
- deployment, production readiness, and production acceptance.

Until those gates are independently accepted, `goreecloud.platform.yaml` must remain `applicable-migration-required`, the repository remains `nonconformant`, current-Stable acceptance is unauthorized, and production eligibility remains false.

## Reader-specific future components

Planned Glaze work still includes cover grids, shelves, title/series detail pages, distraction-free reader chrome, manga spread controls, webtoon navigation, EPUB typography controls, PDF navigation, audiobook Now Playing, downloads, annotations, and responsive tablet/large-screen layouts. Each implemented surface must earn its own applicable rendered/native/accessibility/task-flow evidence; neither the V1.3 foundation record, the historical V1.5 Development record, nor the V1.5.1 compatibility record pre-approves those future components.
