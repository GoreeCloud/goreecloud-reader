# GoreeCloud Reader — Repository Specifications

## Status

- Product: GoreeCloud Reader
- Repository: `GoreeCloud/goreecloud-reader`
- Version: `0.0.3-foundation`
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

`apps/web` is a dependency-free application shell. It renders synthetic Reader items and supports local UI search/filter interactions. It performs no network requests, file-system access, account authentication, persistence, media decoding, or personal-data processing.

The 0.0.3 foundation also adds repository-local GLAZE UI V1.3 semantic token mapping plus source-level resilience checks for visible focus, reduced motion, increased contrast, forced colors, and an opaque fallback when backdrop-filter effects are unavailable. These source mappings are not rendered acceptance.

### Android client

`apps/android` is a Jetpack Compose scaffold targeting Android API 36 with minimum API 28. It declares no storage, media, network, contacts, account, or other sensitive runtime permission. Its initial screen uses synthetic data only.

The Android debug build path is verified with Android Gradle Plugin 8.10.1, Gradle 8.11.1, JDK 17, and API 36. Source/build success does not establish physical-device, accessibility, release-signing, or production acceptance.

### Contracts

`contracts/*.schema.json` use JSON Schema 2020-12 for portable data definitions. Schemas currently cover library items, reading progress, and listening progress.

`contracts/glaze-ui/reader-glaze-v1.3.json` is the repository-local GLAZE UI adoption contract. It pins the current Stable GLAZE UI V1.3 / 1.3.0 release to immutable tag `v1.3.0` and exact Glaze source commit `ff34f232f295c9dcb07e4c681f66d4104d0b9323`, records the web/Android mapping surfaces, preserves Platform-System truth boundaries, and keeps every unproven Glaze acceptance gate false.

The contract also binds Reader to the verified canonical Glaze consumer registration `GoreeCloud/goreecloud-glaze-ui#178@8354308445da9ac35ced2b37a7f503a08a0aaf72:adoption-required`. That record confirms Reader is registered for the required current Stable 1.3.0 baseline while remaining unaccepted and not production-eligible.

### Privacy boundary

`privacy/privacy-shield.application-manifest.json` declares no purposes and no resources. This is deliberately fail-closed. The foundation must not begin real personal-library processing merely because source-level UI, schemas, build output, or design-system adoption controls exist.

## Platform-System status

All seven GoreeCloud Platform Systems are applicable. Runtime integration is not claimed.

- **GoreeCloud Manager:** blocked pending administrative/operational contracts and accepted integration.
- **Privacy Shield:** blocked; source manifest is fail-closed and runtime authorization/acceptance is absent.
- **Wardveil Security:** blocked pending security enforcement and accepted evidence.
- **Everkeep:** blocked pending backup, restore, portability, and recovery verification.
- **Glaze UI:** current target is Stable GLAZE UI V1.3 / 1.3.0. Exact source pinning, verified canonical `adoption-required` registration, repository-local mapping, and automated adoption validation are established, but Reader remains `applicable-migration-required` because rendered web, Android native/physical-device, accessibility, representative task-flow, and product-specific acceptance are incomplete.
- **GoreeCloud Mesh:** blocked pending justified capability/event contracts.
- **GoreeCloud Identity:** blocked pending account, profile, authorization, session, and device integration.

## Glaze UI adoption control plane

The current Stable Glaze source authority for Reader is:

- Repository: `GoreeCloud/goreecloud-glaze-ui`
- Product: `GLAZE UI V1.3 — Adaptive Resonance`
- Version: `1.3.0`
- Immutable tag: `v1.3.0`
- Tag object: `f020fdc8a39de442f9fdfb405d658259c52b99df`
- Stable source commit: `ff34f232f295c9dcb07e4c681f66d4104d0b9323`
- Canonical consumer registration merge: PR #178 / `8354308445da9ac35ced2b37a7f503a08a0aaf72`
- Canonical consumer state: `adoption-required`; accepted target/revision/evidence remain unset; `productionEligible: false`
- Relevant post-merge Glaze validation: Consumer Registry run `34442401310`; V1.3 Migration and Consumer Boundary run `34442401386`

`scripts/validate-glaze-adoption.mjs` fails closed if Reader drifts from the Stable source authority or verified consumer-registration revision, removes its local mapping record, weakens explicit non-acceptance gates, or drops source-level web/native conditions that can be validated automatically. Canonical registration does not by itself establish `accepted-v1`.

## Data and privacy

The development foundation uses only hard-coded synthetic sample items. It does not collect, transmit, persist, synchronize, index, upload, or scan user media or activity.

Before real content processing is enabled, implementation must define and verify at least:

- user and service authority;
- operation-level Privacy Shield authorization;
- library/resource scoping;
- purpose limitation and minimization;
- retention/deletion behavior;
- secure media access and administrative enforcement;
- backup/recovery behavior that respects privacy lifecycle requirements.

## Media support

Actual format parsing/decoding is **not implemented** in the foundation. Planned formats remain tracked in `FEATURE-ROADMAP.md` and include CBZ, CBR, image archives/directories, EPUB, PDF, TXT/HTML where appropriate, M4B/M4A, MP3, AAC, FLAC, OGG, and OPUS.

## Source preservation

The planned architecture treats original media as source assets. Generated derivatives such as thumbnails, indexes, optimized images, and transcoded audio must be separated from originals. The foundation does not yet create any derivatives.

## Accessibility

Foundation interfaces are structured to support keyboard/touch navigation, semantic headings, scalable layouts, reduced motion, increased-contrast and forced-colors behavior, and native semantic controls. Formal rendered/browser, assistive-technology, Android native, and physical-device accessibility acceptance has not been completed.

## Build and verification state

Repository validation verifies source structure, privacy-boundary invariants, truthful nonconformant state, the fail-closed GLAZE UI V1.3 adoption contract, and the exact canonical Glaze consumer-registration anchor. CI also builds and verifies a nonempty Android debug APK for the exact candidate and accepted `main` revisions.

The following remain unverified or incomplete: real personal-media behavior, full browser/rendered Glaze acceptance, Android physical-device behavior, assistive-technology acceptance, release signing, Wardveil/runtime security acceptance, Privacy Shield runtime authorization, Everkeep recovery acceptance, Identity/Mesh/Manager runtime integration, and production deployment.
