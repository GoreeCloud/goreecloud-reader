# GoreeCloud Reader

**Your private home for books, manga, comics, and audiobooks.**

GoreeCloud Reader is an original GoreeCloud-owned, open-source, self-hosted reading and audiobook application under active development.

## Current status

**Lifecycle:** Development foundation  
**Version:** `0.0.4-foundation`  
**Production status:** Not production-ready  
**Governing license:** GNU Affero General Public License v3 or later (`AGPL-3.0-or-later`)

The repository currently contains a functional **synthetic-data application shell** for web and Android, shared media-domain contracts, a fail-closed Privacy Shield application manifest, repository validation controls, a checksum-pinned Android debug build path, an exact-source-pinned GLAZE UI V1.3 adoption control plane, and automated browser-rendered verification of the synthetic web foundation across Chromium, Firefox, and WebKit. It does **not** yet process a real personal library, read real books, play real audiobooks, synchronize user state, or claim runtime acceptance by GoreeCloud Platform Systems.

## Repository structure

- `apps/web` — static web application foundation using synthetic Reader items, with development-only rendered-browser verification.
- `apps/android` — Android/Jetpack Compose application foundation using synthetic Reader items only.
- `contracts` — versioned JSON Schemas plus the repository-local GLAZE UI V1.3 adoption contract.
- `privacy` — fail-closed Privacy Shield application manifest.
- `scripts` — repository, privacy-boundary, Glaze-adoption, and Gradle-wrapper bootstrap controls.
- `docs` — architecture, privacy, Android build, and Glaze UI adoption records.
- `goreecloud.platform.yaml` — machine-readable GoreeCloud Platform Contract declaration.

## Foundation behavior

The web and Android shells demonstrate Books, Manga, Comics, and Audiobooks library categories; search and media-type filtering over synthetic content; artwork-oriented card presentation; Continue Reading / Continue Listening-style progress presentation; and clear unavailable-state handling for import, readers, playback, synchronization, and downloads.

No personal reading data is accepted by this foundation. Real content processing remains blocked until the required privacy, identity, security, continuity, management, and integration boundaries are implemented and accepted.

## Glaze UI adoption boundary

Reader targets **GLAZE UI V1.3 / 1.3.0 Stable** and pins its repository-local adoption contract to immutable tag `v1.3.0` and exact Glaze source commit `ff34f232f295c9dcb07e4c681f66d4104d0b9323`.

The 0.0.4 foundation adds actual browser-rendered CI across Chromium, Firefox, and WebKit for the implemented synthetic web surface, including keyboard/focus, search/filter/detail/unavailable-state, responsive/reduced-motion, local-network-boundary, and automated WCAG A/AA checks. This is evidence, not full Glaze acceptance. Manual assistive-technology, real-product task-flow, Android native/physical-device, rollback, and production acceptance remain open. Reader therefore remains `applicable-migration-required` for Glaze UI and `nonconformant` overall.

## Planned product scope

The authoritative feature plan is tracked in [`FEATURE-ROADMAP.md`](FEATURE-ROADMAP.md). Planned work includes specialized manga/comic, EPUB, PDF, webtoon, and audiobook experiences; metadata scanning and editing; offline access; cross-device state; user profiles and permissions; accessibility; original-file preservation; and all required GoreeCloud Platform-System integrations.

## Validation

Source-level checks:

```bash
node scripts/validate-foundation.mjs
node scripts/validate-privacy-boundary.mjs
node scripts/validate-glaze-adoption.mjs
```

Rendered web checks:

```bash
cd apps/web
npm install --ignore-scripts --no-audit --no-fund
npx playwright install --with-deps chromium firefox webkit
npm run test:rendered
```

Android debug build:

```bash
./scripts/bootstrap-gradle-wrapper.sh
cd apps/android
./gradlew --no-daemon :app:assembleDebug
```

CI validates the exact candidate revision. Passing the automated browser and Android jobs does not prove production readiness, manual assistive-technology acceptance, physical-device acceptance, release signing, recovery acceptance, or full Stable application conformance.

## Licensing

GoreeCloud Reader is licensed under **AGPL-3.0-or-later**. See [`LICENSE`](LICENSE). Development-test and build dependencies remain governed by their respective licenses; the web rendered-verification dependencies are documented in `apps/web/TESTING.md`.

## Contribution boundary

The source is public by default under GoreeCloud's open-source requirements. Public source availability does not imply public access to any hosted GoreeCloud instance or an established external contribution workflow. Contribution procedures may be added when that workflow is intentionally opened.
