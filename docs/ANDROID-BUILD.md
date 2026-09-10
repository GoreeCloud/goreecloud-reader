# GoreeCloud Reader Android Build

## Status

This document defines the reproducible **development/debug** Android build path for GoreeCloud Reader. It does not establish Stable, production, release-signing, or physical-device acceptance.

## Toolchain

- Android Gradle Plugin: `8.10.1`
- Gradle: `8.11.1`
- JDK: `17`
- compile/target SDK: `36`
- minimum SDK: `28`

AGP 8.10 is selected because it supports API 36 and uses Gradle 8.11.1 as its minimum/default compatible Gradle line.

## Wrapper integrity

The repository stores the wrapper launch scripts and pinned wrapper properties. The wrapper JAR is downloaded from the official Gradle `v8.11.1` source tag by a repository bootstrap script and verified before use. The Gradle binary distribution is downloaded by the wrapper from Gradle's official distribution service and is independently checksum-pinned in `gradle-wrapper.properties`.

Pinned SHA-256 values:

- Gradle 8.11.1 binary distribution: `f397b287023acdba1e9f6fc5ea72d22dd63669d59ed4a289a29b1a76eee151c6`
- Gradle 8.11.1 wrapper JAR: `2db75c40782f5e8ba1fc278a5574bab070adccb2d21ca5a6e5ed840888448046`

The wrapper properties set `distributionSha256Sum`, so the downloaded Gradle distribution must match the pinned official checksum.

## Linux/macOS build

From the repository root:

```bash
./scripts/bootstrap-gradle-wrapper.sh
cd apps/android
./gradlew --no-daemon :app:assembleDebug
```

Expected debug artifact:

`apps/android/app/build/outputs/apk/debug/app-debug.apk`

## Windows bootstrap

Run:

```powershell
./scripts/bootstrap-gradle-wrapper.ps1
cd apps/android
./gradlew.bat --no-daemon :app:assembleDebug
```

## CI acceptance boundary

GitHub Actions installs the required Android SDK platform, bootstraps and verifies the wrapper JAR, builds `:app:assembleDebug`, verifies that the APK exists, and uploads that debug APK as build evidence.

A successful build proves source/build compatibility for that exact revision. It does not prove physical-device behavior, signing/release readiness, accessibility, runtime Platform-System acceptance, or production suitability.
