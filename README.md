# GoreeCloud Reader

**Your private home for books, manga, comics, and audiobooks.**

GoreeCloud Reader is an original GoreeCloud-owned, open-source, self-hosted reading and audiobook application under active development.

## Current status

**Lifecycle:** Development foundation  
**Version:** `0.0.3-foundation`  
**Production status:** Not production-ready  
**Governing license:** GNU Affero General Public License v3 or later (`AGPL-3.0-or-later`)

The repository currently contains a functional **synthetic-data application shell** for web and Android, shared media-domain contracts, a fail-closed Privacy Shield application manifest, repository validation controls, a checksum-pinned Android debug build path, and an exact-source-pinned GLAZE UI V1.3 adoption control plane. It does **not** yet process a real personal library, read real books, play real audiobooks, synchronize user state, or claim runtime acceptance by GoreeCloud Platform Systems.

## Repository structure

- `apps/web` — dependency-free web application foundation using synthetic Reader items only.
- `apps/android` — Android/Jetpack Compose application foundation using synthetic Reader items only.
- `contracts` — versioned JSON Schemas plus the repository-local GLAZE UI V1.3 adoption contract.
- `privacy` — fail-closed Privacy Shield application manifest.
- `scripts` — repository, privacy-boundary, Glaze-adoption, and Gradle-wrapper bootstrap controls.
- `docs` — architecture, privacy, Android build, and Glaze UI adoption records.
- `goreecloud.platform.yaml` — machine-readable GoreeCloud Platform Contract declaration.

## Foundation behavior

The web and Android shells demonstrate:

- Books, Manga, Comics, and Audiobooks library categories.
- Search and media-type filtering over synthetic content.
- Artwork-oriented card presentation.
- Continue Reading / Continue Listening-style progress presentation.
- Clear unavailable-state handling for import, readers, playback, synchronization, and downloads.

No personal reading data is accepted by this foundation. Real content processing remains blocked until the required privacy, identity, security, continuity, management, and integration boundaries are implemented and accepted.

## Glaze UI adoption boundary

Reader targets **GLAZE UI V1.3 / 1.3.0 Stable** and pins its repository-local adoption contract to immutable tag `v1.3.0` and exact Glaze source commit `ff34f232f295c9dcb07e4c681f66d4104d0b9323`.

This establishes migration/adoption control, not acceptance. Rendered web acceptance, Android native and physical-device acceptance, accessibility acceptance, representative task-flow acceptance, and product-specific production acceptance remain open. Reader therefore remains `applicable-migration-required` for Glaze UI and `nonconformant` overall.

## Planned product scope

The authoritative feature plan is tracked in [`FEATURE-ROADMAP.md`](FEATURE-ROADMAP.md). Planned work includes specialized manga/comic, EPUB, PDF, webtoon, and audiobook experiences; metadata scanning and editing; offline access; cross-device state; user profiles and permissions; accessibility; original-file preservation; and all required GoreeCloud Platform-System integrations.

## Validation

Source-level checks:

```bash
node scripts/validate-foundation.mjs
node scripts/validate-privacy-boundary.mjs
node scripts/validate-glaze-adoption.mjs
```

Android debug build:

```bash
./scripts/bootstrap-gradle-wrapper.sh
cd apps/android
./gradlew --no-daemon :app:assembleDebug
```

The bootstrap and Gradle distribution are checksum-pinned. CI validates source controls, the fail-closed Glaze adoption contract, and the Android debug APK for the exact candidate revision. Passing these checks does not prove production readiness, physical-device acceptance, release signing, accessibility acceptance, or Stable application conformance.

## Licensing

GoreeCloud Reader is licensed under **AGPL-3.0-or-later**. See [`LICENSE`](LICENSE). Third-party dependencies remain governed by their respective licenses.

## Contribution boundary

The source is public by default under GoreeCloud's open-source requirements. Public source availability does not imply public access to any hosted GoreeCloud instance or an established external contribution workflow. Contribution procedures may be added when that workflow is intentionally opened.
