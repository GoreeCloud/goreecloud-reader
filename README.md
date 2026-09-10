# GoreeCloud Reader

**Your private home for books, manga, comics, and audiobooks.**

GoreeCloud Reader is an original GoreeCloud-owned, open-source, self-hosted reading and audiobook application under active development.

## Current status

**Lifecycle:** Development foundation  
**Version:** `0.0.2-foundation`  
**Production status:** Not production-ready  
**Governing license:** GNU Affero General Public License v3 or later (`AGPL-3.0-or-later`)

The repository currently contains a functional **synthetic-data application shell** for web and Android, shared media-domain contracts, a fail-closed Privacy Shield application manifest, repository validation controls, and a checksum-pinned Android debug build path. It does **not** yet process a real personal library, read real books, play real audiobooks, synchronize user state, or claim runtime acceptance by GoreeCloud Platform Systems.

## Repository structure

- `apps/web` — dependency-free web application foundation using synthetic Reader items only.
- `apps/android` — Android/Jetpack Compose application foundation using synthetic Reader items only.
- `contracts` — versioned JSON Schemas for library items and progress state.
- `privacy` — fail-closed Privacy Shield application manifest.
- `scripts` — repository, privacy-boundary, and Gradle-wrapper bootstrap controls.
- `docs` — architecture, privacy, Android build, and Glaze UI adoption notes.
- `goreecloud.platform.yaml` — machine-readable GoreeCloud Platform Contract declaration.

## Foundation behavior

The web and Android shells demonstrate:

- Books, Manga, Comics, and Audiobooks library categories.
- Search and media-type filtering over synthetic content.
- Artwork-oriented card presentation.
- Continue Reading / Continue Listening-style progress presentation.
- Clear unavailable-state handling for import, readers, playback, synchronization, and downloads.

No personal reading data is accepted by this foundation. Real content processing remains blocked until the required privacy, identity, security, continuity, management, and integration boundaries are implemented and accepted.

## Planned product scope

The authoritative feature plan is tracked in [`FEATURE-ROADMAP.md`](FEATURE-ROADMAP.md). Planned work includes specialized manga/comic, EPUB, PDF, webtoon, and audiobook experiences; metadata scanning and editing; offline access; cross-device state; user profiles and permissions; accessibility; original-file preservation; and all required GoreeCloud Platform-System integrations.

## Validation

Source-level checks:

```bash
node scripts/validate-foundation.mjs
node scripts/validate-privacy-boundary.mjs
```

Android debug build:

```bash
./scripts/bootstrap-gradle-wrapper.sh
cd apps/android
./gradlew --no-daemon :app:assembleDebug
```

The bootstrap and Gradle distribution are checksum-pinned. CI validates source controls and builds the Android debug APK for the exact candidate revision. Passing these checks does not prove production readiness, physical-device acceptance, release signing, or Stable conformance.

## Licensing

GoreeCloud Reader is licensed under **AGPL-3.0-or-later**. See [`LICENSE`](LICENSE). Third-party dependencies remain governed by their respective licenses.

## Contribution boundary

The source is public by default under GoreeCloud's open-source requirements. Public source availability does not imply public access to any hosted GoreeCloud instance or an established external contribution workflow. Contribution procedures may be added when that workflow is intentionally opened.
