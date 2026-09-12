#!/usr/bin/env bash
set -euo pipefail
: "${SCHEME:?Set SCHEME}"
: "${PROJECT_OR_WORKSPACE:?Set PROJECT_OR_WORKSPACE to .xcodeproj or .xcworkspace}"
CONFIGURATION="${CONFIGURATION:-Release}"
if [[ "$PROJECT_OR_WORKSPACE" == *.xcworkspace ]]; then xcodebuild -workspace "$PROJECT_OR_WORKSPACE" -scheme "$SCHEME" -configuration "$CONFIGURATION" -destination 'generic/platform=iOS' build; else xcodebuild -project "$PROJECT_OR_WORKSPACE" -scheme "$SCHEME" -configuration "$CONFIGURATION" -destination 'generic/platform=iOS' build; fi
