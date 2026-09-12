#!/usr/bin/env bash
set -euo pipefail
: "${SCHEME:?Set SCHEME}"
: "${EXPORT_OPTIONS:?Set EXPORT_OPTIONS to a non-secret export options plist}"
xcodebuild -exportArchive -archivePath "${ARCHIVE:-build/archive/$SCHEME.xcarchive}" -exportOptionsPlist "$EXPORT_OPTIONS" -exportPath build/ipa
