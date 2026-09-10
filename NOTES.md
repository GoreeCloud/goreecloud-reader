# GoreeCloud Reader — Engineering Notes

## Foundation decisions

- Build Reader as original GoreeCloud-owned software rather than adopting another complete application codebase.
- Use the established GoreeCloud `apps/web`, `apps/android`, `contracts`, `docs`, `privacy`, and `scripts` repository pattern.
- Use synthetic media only until real-content privacy and authority boundaries are accepted.
- Keep the Privacy Shield manifest fail-closed with no purposes/resources during the foundation stage.
- Target the current GoreeCloud Platform Contract schema `0.2` and Stable Glaze UI `1.3.0`, while explicitly retaining nonconformant status until acceptance is proven.
- License original Reader source as AGPL-3.0-or-later, matching the network/self-hosted distribution needs and an established GoreeCloud application licensing pattern.

## Known limitations

- No backend service or persistent database.
- No real library import, scanning, indexing, or media parsing.
- No reader/player implementation.
- No account/authentication flow.
- No runtime GoreeCloud Platform-System integration.
- No Gradle wrapper or verified Android build artifact yet.
- No production deployment or release.
- No completed accessibility, security, recovery, or device acceptance.

## Next engineering slice

After foundation validation, the next bounded implementation should define a local library/catalog core and ingestion interface that remains testable with synthetic fixtures until Privacy Shield, Identity, and Wardveil runtime contracts permit real-media operations.
