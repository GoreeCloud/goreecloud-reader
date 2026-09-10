# GoreeCloud Reader — Implemented Features

This document records **current repository implementation state**, not the planned product roadmap.

## Implemented in `0.0.1-foundation`

### Repository foundation

- Required GoreeCloud root governance and product-documentation controls.
- AGPL-3.0-or-later licensing declaration.
- Machine-readable `goreecloud.platform.yaml` with explicit nonconformant/blocked Platform-System states.
- Least-privilege GitHub Actions source validation.

### Web application foundation

- Dependency-free Reader application shell.
- Synthetic Books, Manga, Comics, and Audiobooks sample library.
- Synthetic Continue Reading and Continue Listening progress display.
- Search across synthetic title/creator/series fields.
- Media-type filters.
- Responsive artwork-oriented Glaze-informed presentation.
- Explicit unavailable-state feedback for unimplemented actions.
- No network calls, real file import, or persistence.

### Android application foundation

- Jetpack Compose application scaffold.
- Synthetic library list and media-type filters.
- Search over synthetic items.
- Progress presentation.
- No sensitive Android permissions declared.

### Shared contracts and privacy boundary

- JSON Schema for library items.
- JSON Schema for reading progress.
- JSON Schema for listening progress.
- Fail-closed Privacy Shield application manifest with no declared purposes/resources.
- Validation that real-content processing remains disabled at the foundation boundary.

## Partially implemented

- Glaze UI adoption: visual direction is represented, but authoritative consumer acceptance is not complete.
- Library-domain modeling: foundational schemas exist, but ingestion, persistence, metadata extraction, edition linking, and full hierarchy behavior are not implemented.
- Accessibility: structural considerations exist, but formal accessibility verification is incomplete.

## Not implemented / still planned

Real media import and scanning, manga/comic reading, webtoon rendering, EPUB/PDF reading, audiobook playback, metadata extraction/editing, persistence, user accounts/profiles, permissions, real progress storage, cross-device sync, offline downloads, external metadata, full-text search, OCR, recommendations, statistics, server APIs, deployment, and runtime Platform-System acceptance remain planned.

See `FEATURE-ROADMAP.md` for the complete active feature obligations.
