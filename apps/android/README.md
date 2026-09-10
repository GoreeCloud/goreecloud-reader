# GoreeCloud Reader Android Foundation

Android foundation for GoreeCloud Reader.

- Kotlin + Jetpack Compose
- compile/target SDK 36
- minimum SDK 28
- Java/Kotlin 17
- Android Gradle Plugin 8.10.1
- Gradle 8.11.1
- synthetic media only
- no sensitive permissions
- no account, network, storage, media parsing, reading, or playback integration yet

## Build

From the repository root:

```bash
./scripts/bootstrap-gradle-wrapper.sh
cd apps/android
./gradlew --no-daemon :app:assembleDebug
```

The bootstrap script downloads the official Gradle 8.11.1 wrapper JAR and verifies its published SHA-256 checksum before it can execute. The wrapper configuration also pins the Gradle distribution checksum.

A successful debug build is build-chain evidence only. Physical-device acceptance, release signing, production readiness, and real Reader functionality remain separate gates.
