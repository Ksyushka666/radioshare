#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ANDROID_SDK_ROOT="${ANDROID_SDK_ROOT:-${ANDROID_HOME:-}}"
if [[ -z "$ANDROID_SDK_ROOT" ]]; then echo "ANDROID_SDK_ROOT or ANDROID_HOME is required" >&2; exit 2; fi
if [[ -z "${RADIOSHARE_KEYSTORE:-}" || -z "${RADIOSHARE_KEYSTORE_PASSWORD:-}" || -z "${RADIOSHARE_KEY_ALIAS:-}" || -z "${RADIOSHARE_KEY_PASSWORD:-}" ]]; then echo "Android release signing variables are required: RADIOSHARE_KEYSTORE, RADIOSHARE_KEYSTORE_PASSWORD, RADIOSHARE_KEY_ALIAS, RADIOSHARE_KEY_PASSWORD" >&2; exit 2; fi
cd "$ROOT"
export ANDROID_HOME="$ANDROID_SDK_ROOT"
GRADLE_BIN="${GRADLE_BIN:-gradle}"
"$GRADLE_BIN" --no-daemon clean assembleRelease
pnpm install
CSC_IDENTITY_AUTO_DISCOVERY=false pnpm exec electron-builder --win portable
mkdir -p release
cp app/build/outputs/apk/release/app-release.apk release/RadioShare-release.apk
cp dist/RadioShare\ *.exe release/ 2>/dev/null || true
sha256sum release/* > release/SHA256SUMS.txt
printf '\nRelease artifacts:\n'; ls -lh release
