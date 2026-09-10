#!/usr/bin/env sh
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
ROOT_DIR=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
WRAPPER_DIR="$ROOT_DIR/apps/android/gradle/wrapper"
WRAPPER_JAR="$WRAPPER_DIR/gradle-wrapper.jar"
WRAPPER_URL="https://services.gradle.org/distributions/gradle-8.11.1-wrapper.jar"
EXPECTED_SHA256="2db75c40782f5e8ba1fc278a5574bab070adccb2d21ca5a6e5ed840888448046"

mkdir -p "$WRAPPER_DIR"

verify() {
    [ -f "$1" ] || return 1
    actual=$(sha256sum "$1" | awk '{print $1}')
    [ "$actual" = "$EXPECTED_SHA256" ]
}

if verify "$WRAPPER_JAR"; then
    echo "Gradle 8.11.1 wrapper JAR already present and verified."
    exit 0
fi

TMP="$WRAPPER_JAR.tmp"
rm -f "$TMP"
trap 'rm -f "$TMP"' EXIT HUP INT TERM

curl --fail --location --silent --show-error "$WRAPPER_URL" --output "$TMP"

if ! verify "$TMP"; then
    echo "ERROR: Gradle wrapper JAR checksum verification failed." >&2
    exit 1
fi

mv "$TMP" "$WRAPPER_JAR"
trap - EXIT HUP INT TERM

echo "Downloaded and verified Gradle 8.11.1 wrapper JAR."
