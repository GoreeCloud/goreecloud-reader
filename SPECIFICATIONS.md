# GoreeCloud Reader — Repository Specifications

## Status

- Product: GoreeCloud Reader
- Repository: `GoreeCloud/goreecloud-reader`
- Version: `0.0.4-foundation`
- Lifecycle: Development
- License: AGPL-3.0-or-later
- Implemented clients in this revision: Web foundation, Android foundation
- Production readiness: No

This file is the version-coupled repository specification. The canonical project specification is maintained in GoreeCloud Google Drive under `GoreeCloud/Projects/Project Specification — Reader.docx`.

## Product purpose

Reader is intended to provide a self-hosted, specialized home for books, ebooks, manga, comics, graphic novels, magazines, serialized publications, and audiobooks. The target workflow is:

**Import → Organize → Read or Listen → Save Progress → Resume Anywhere**

## Domain model

The planned durable content hierarchy is:

`Library → Series or Work → Edition or Volume → Chapter or Issue → Media Resource`

The foundation defines portable contracts for library items plus reading and listening progress. These contracts are intentionally smaller than the final product model and may evolve before Stable release.

## Foundation architecture

### Web client

`apps/web` is a static application shell. It renders synthetic Reader items and supports local UI search/filter/detail interactions. It performs no application network requests beyond its own loopback/static assets, no file-system access, account authentication, persistence, media decoding, or personal-data processing.

The 0.0.4 foundation adds a development-only Playwright/axe harness that renders this exact surface through Chromium, Firefox, and WebKit in CI. The harness verifies the implemented synthetic workflow, keyboard/focus behavior, semantic progress and dialog state, responsive/reduced-motion behavior, local-only request boundary, and automated WCAG A/AA findings. These checks materially improve evidence but do not replace manual assistive-technology, human visual, real-product workflow, rollback, or production acceptance.

### Android client

`apps/android` is a Jetpack Compose scaffold targeting Android API 36 with minimum API 28. It declares no storage, media, network, contacts, account, or other sensitive runtime permission. Its initial screen uses synthetic data only.

The Android debug build path is verified with Android Gradle Plugin 8.10.1, Gradle 8.11.1, JDK 17, and API 36. Source/build success does not establish physical-device, accessibility, release-signing, or production acceptance.

### Contracts

`contracts/*.schema.json` use JSON Schema 2020-12 for portable data definitions. Schemas currently cover library items, reading progress, and listening progress.

`contracts/glaze-ui/reader-glaze-v1.3.json` is the repository-local GLAZE UI adoption contract. It pins Stable GLAZE UI V1.3 / 1.3.0 to immutable tag `v1.3.0` and exact Glaze source commit `ff34f232f295c9dcb07e4c681f66d4104d0b9323`, records web/Android mapping surfaces, and now records the configured three-engine automated rendered-web evidence scope. All broader acceptance gates remain false.

The contract binds Reader to canonical Glaze consumer registration `GoreeCloud/goreecloud-glaze-ui#178@8354308445da9ac35ced2b37a7f503a08a0aaf72:adoption-required`. Reader remains unaccepted and not production-eligible.

### Privacy boundary

`privacy/privacy-shield.application-manifest.json` declares no purposes and no resources. This is deliberately fail-closed. The foundation must not begin real personal-library processing merely because UI, schemas, build output, or design-system evidence exists.

## Platform-System status

All seven GoreeCloud Platform Systems are applicable. Runtime integration is not claimed.

- **GoreeCloud Manager:** blocked pending administrative/operational contracts and accepted integration.
- **Privacy Shield:** blocked; source manifest is fail-closed and runtime authorization/acceptance is absent.
- **Wardveil Security:** blocked pending security enforcement and accepted evidence.
- **Everkeep:** blocked pending backup, restore, portability, and recovery verification.
- **Glaze UI:** current target is Stable GLAZE UI V1.3 / 1.3.0. Exact source pinning, canonical `adoption-required` registration, repository-local mapping, source validation, and an automated Chromium/Firefox/WebKit rendered-web matrix for the synthetic foundation are established. Reader remains `applicable-migration-required` because formal manual accessibility, real-product workflow, Android native/physical-device, rollback, production approval, and full consumer acceptance are incomplete.
- **GoreeCloud Mesh:** blocked pending justified capability/event contracts.
- **GoreeCloud Identity:** blocked pending account, profile, authorization, session, and device integration.

## Glaze UI adoption control plane

The current Stable Glaze source authority for Reader remains GLAZE UI V1.3 — Adaptive Resonance / 1.3.0, immutable tag `v1.3.0`, tag object `f020fdc8a39de442f9fdfb405d658259c52b99df`, Stable source commit `ff34f232f295c9dcb07e4c681f66d4104d0b9323`, and canonical consumer registration merge PR #178 / `8354308445da9ac35ced2b37a7f503a08a0aaf72` in state `adoption-required` with `productionEligible: false`.

`scripts/validate-glaze-adoption.mjs` fails closed if Reader drifts from those anchors, weakens its blockers, removes local mapping/evidence records, drops the rendered-web harness, or silently authorizes acceptance. Canonical registration and automated browser success do not independently establish `accepted-v1`.

## Data and privacy

The development foundation uses only hard-coded synthetic sample items. It does not collect, transmit, persist, synchronize, index, upload, or scan user media or activity.

Before real content processing is enabled, implementation must define and verify user/service authority, operation-level Privacy Shield authorization, library/resource scoping, purpose limitation/minimization, retention/deletion behavior, secure media access/administrative enforcement, and backup/recovery behavior that respects privacy lifecycle requirements.

## Media support

Actual format parsing/decoding is **not implemented** in the foundation. Planned formats remain tracked in `FEATURE-ROADMAP.md`.

## Source preservation

The planned architecture treats original media as source assets. Generated derivatives such as thumbnails, indexes, optimized images, and transcoded audio must be separated from originals. The foundation does not yet create any derivatives.

## Accessibility

The web foundation now exposes explicit filter state, named dialog semantics, progressbar semantics, visible focus, scalable responsive layouts, reduced motion, increased contrast/forced-colors behavior, and automated WCAG A/AA browser checks. Formal manual assistive-technology acceptance has not been completed. Android native/physical-device accessibility acceptance also remains incomplete.

## Build and verification state

Repository validation verifies source structure, privacy-boundary invariants, truthful nonconformant state, the fail-closed GLAZE UI V1.3 adoption contract, and its exact canonical source/registration anchors. CI additionally runs the actual static web surface through Chromium, Firefox, and WebKit and builds a nonempty Android debug APK for exact candidate and accepted `main` revisions.

The following remain unverified or incomplete: real personal-media behavior, manual assistive-technology acceptance, real Reader product workflows, Android physical-device behavior, release signing, Wardveil/runtime security acceptance, Privacy Shield runtime authorization, Everkeep recovery acceptance, Identity/Mesh/Manager runtime integration, rollback/production approval, and production deployment.
