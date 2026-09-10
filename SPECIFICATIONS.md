# GoreeCloud Reader — Repository Specifications

## Status

- Product: GoreeCloud Reader
- Repository: `GoreeCloud/goreecloud-reader`
- Version: `0.0.1-foundation`
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

### Android client

`apps/android` is a Jetpack Compose scaffold targeting Android API 36 with minimum API 28. It declares no storage, media, network, contacts, account, or other sensitive runtime permission. Its initial screen uses synthetic data only.

### Contracts

`contracts/*.schema.json` use JSON Schema 2020-12 for portable data definitions. Schemas currently cover library items, reading progress, and listening progress.

### Privacy boundary

`privacy/privacy-shield.application-manifest.json` declares no purposes and no resources. This is deliberately fail-closed. The foundation must not begin real personal-library processing merely because source-level UI or schemas exist.

## Platform-System status

All seven GoreeCloud Platform Systems are applicable. Runtime integration is not claimed.

- **GoreeCloud Manager:** blocked pending administrative/operational contracts and accepted integration.
- **Privacy Shield:** blocked; source manifest is fail-closed and runtime authorization/acceptance is absent.
- **Wardveil Security:** blocked pending security enforcement and accepted evidence.
- **Everkeep:** blocked pending backup, restore, portability, and recovery verification.
- **Glaze UI:** adoption in progress; current target is Stable Glaze UI 1.3.0, but Reader consumer acceptance is not established.
- **GoreeCloud Mesh:** blocked pending justified capability/event contracts.
- **GoreeCloud Identity:** blocked pending account, profile, authorization, session, and device integration.

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

Foundation interfaces are structured to support keyboard/touch navigation, semantic headings, scalable layouts, reduced motion, and high-contrast-friendly styling. Formal accessibility acceptance has not been completed.

## Build and verification limitations

Repository validation verifies source structure and privacy-boundary invariants. Android reproducible builds, device testing, full browser compatibility, accessibility acceptance, security testing, recovery testing, and production deployment are not yet verified.
