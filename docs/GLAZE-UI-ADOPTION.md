# GoreeCloud Reader — GLAZE UI V1.3 Adoption

## Current authority

Reader targets the current Stable **GLAZE UI V1.3 — Adaptive Resonance** release (`1.3.0`). The adoption control plane is pinned to the immutable Stable tag `v1.3.0`, tag object `f020fdc8a39de442f9fdfb405d658259c52b99df`, and exact Stable Glaze source commit `ff34f232f295c9dcb07e4c681f66d4104d0b9323` in `GoreeCloud/goreecloud-glaze-ui`.

The repository-local machine record is `contracts/glaze-ui/reader-glaze-v1.3.json`. `scripts/validate-glaze-adoption.mjs` fails closed if Reader drifts from the pinned Stable release identity or canonical consumer-registration revision, weakens its acceptance blockers, removes required source mappings, introduces remote web design-system fetching, or drops the foundation accessibility/resilience checks that can be validated automatically.

## Canonical consumer registration

Glaze UI PR #178 was merged into the authoritative `GoreeCloud/goreecloud-glaze-ui` `main` branch as revision `8354308445da9ac35ced2b37a7f503a08a0aaf72`. The canonical `consumers/registry.json` now registers `GoreeCloud/goreecloud-reader` with status `adoption-required`, `requiredTargetVersion: 1.3.0`, no accepted target/revision/evidence, and `productionEligible: false`.

The relevant current-authority post-merge Glaze checks passed on that exact `main` revision: **GLAZE UI Consumer Registry** run `34442401310` and **GLAZE UI V1.3 Migration and Consumer Boundary** run `34442401386`.

That registration is governance evidence only. It does not grant Reader `accepted-v1`, Stable application status, overall conformance, or production eligibility. Older V1.1/V1.2 Candidate workflow families remain separate historical repository debt and are not used as Reader acceptance evidence.

## Repository-local mapping

### Web

The dependency-free web foundation maps current-Stable Glaze semantics into local application tokens and behavior without fetching Glaze assets from a remote runtime source. Current foundation behavior includes:

- solid durable content with translucent interaction/navigation surfaces where appropriate;
- semantic Glaze canvas/surface/ink/accent/focus mapping tokens;
- responsive layouts;
- visible keyboard focus;
- reduced-motion handling;
- increased-contrast and forced-colors handling;
- opaque resilience fallback when backdrop-filter effects are unavailable;
- explicit unavailable-state messaging;
- synthetic-data-only operation with no remote design-system or application asset fetching.

These mappings are implementation evidence, not rendered acceptance.

### Android

The Android foundation uses Jetpack Compose / Material 3 primitives as a native mapping surface for semantic hierarchy, native controls, accessibility behavior, and platform integration. Material 3 is not treated as a substitute for Glaze UI and does not independently establish Glaze conformance.

Current Android evidence remains limited to source review plus the verified reproducible API 36 debug-build path. Real-device visual, ergonomic, accessibility, and task-flow acceptance are still required.

## Truth and authority boundaries

Glaze UI governs presentation and interaction only. Reader must not let visual state fabricate or strengthen platform-system authority:

- Privacy Shield remains authoritative for privacy and consent truth.
- Wardveil Security remains authoritative for security and protection truth.
- Everkeep remains authoritative for continuity and recovery truth.
- GoreeCloud Identity remains authoritative for account, identity, authorization, device, and session truth.
- GoreeCloud Mesh remains authoritative for coordination/capability truth.
- GoreeCloud Manager remains authoritative for applicable administrative/operational surfaces once integrated.

## Acceptance status

**Not accepted yet.** Repository-local mapping, exact Stable source pinning, verified canonical consumer registration, and automated checks are necessary but not sufficient for GLAZE UI acceptance.

The following gates remain fail-closed:

- rendered web acceptance;
- web accessibility acceptance;
- representative web task-flow acceptance;
- Android native visual/interaction acceptance;
- Android physical-device acceptance;
- Android accessibility acceptance;
- representative Android task-flow acceptance;
- full product-specific Glaze conformance review;
- production readiness and release governance.

Until those gates are independently accepted, `goreecloud.platform.yaml` must remain `applicable-migration-required`, the repository remains `nonconformant`, `accepted-v1` is unauthorized, and production eligibility remains false.

## Reader-specific future components

Planned Glaze work still includes cover grids, shelves, title/series detail pages, distraction-free reader chrome, manga spread controls, webtoon navigation, EPUB typography controls, PDF navigation, audiobook Now Playing, downloads, annotations, and responsive tablet/large-screen layouts. Each implemented surface must earn its own applicable rendered/native/accessibility/task-flow evidence; this foundation record does not pre-approve those future components.
