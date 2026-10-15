# Quickstart and Validation: ENHANCEMENT-6263 ObjectReference

**Feature**: [spec.md](spec.md)
**Status**: Guide for the planned implementation. Feature source, captured demo fixtures, and tests are not yet delivered; commands targeting new tests become runnable when those artifacts exist.

## Prerequisites

- JDK 17+, checked-in Gradle Wrapper, existing Android SDK/emulator setup (min SDK 26; managed tests use existing Pixel profiles).
- macOS and a compatible Xcode; current CI uses Xcode 26.3. Use the repository's current Kotlin/toolchain versions rather than obsolete RC advice in older integration docs.
- Node for JavaScript syntax checks only; no JS test runner or npm installation is introduced.
- Existing fixture CDN resources described in `test/src/commonMain/composeResources/files/responses/README.md`. Inspect prerequisites before using its download script, which refreshes downloaded assets; Node mocks do not require CDN files.
- An authorized Pega demo environment, ObjectReference case metadata and sanitized response captures. The case name/version/modes must be documented upon capture; no invented demo case identifier is supplied here.
- Existing authentication configuration for the samples; keep tokens and customer data out of checked-in files.

## Setup and Demo

1. Acquire the initial demo case: single Dropdown/Autocomplete, multiple Combobox, dependent parameter change, assignment submission, and persisted read-only results. Record the Pega/CoreJS version and expected identities in fixture provenance.
2. Configure the CMP environment locally following `docs/configure-sample-mobile-apps.md` and `samples/base-cmp-app/.../SDKConfig.kt`. Use the existing `Create` picker for an advertised case; use the configured `New Service` case only when it points to the captured demo.
3. Build/run Android CMP, then iOS CMP. Select one reference, replace it, select multiple records and remove one, change the parameter-driving field, and submit.
4. Inspect persisted results: identities must match final selection, labels must be readable, and configured read-only Cards/tables must retain their presentation. Repeat on both platforms.
5. Repeat required-empty, hidden-required, disabled/read-only, option failure/recovery, narrow screen, keyboard, and light/dark checks. For races, use controlled mocks rather than attempting to reproduce timing on a live server.
6. Publish/build the Android native sample and repeat the selector/submission smoke flow. Configure its `AndroidSDKConfig.kt` locally; confirm dependency version is the just-published SDK.
7. Build the native SwiftUI sample and its mocked UITest target. Run the captured editable Dropdown example and verify submitted identity. For absent child views verify existing unsupported-renderer behavior; do not add new child controls to make the example pass.

See [data-model.md](data-model.md) and [contracts/object-reference.md](contracts/object-reference.md) for field/state/routing contracts. This guide does not replace metadata acquisition or imply all versions supply the same modes.

## Verification Commands

All commands run from repository root. Record exact commands, versions, and results during implementation. These feature checks have not been run in this planning stage.

### Focused JS/core/resources

Use the existing verification infrastructure:

```bash
node --check engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/fields/object-reference.component.js
node --check engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/fields/object-reference-utils.js
./gradlew :core:compileKotlinJvm :core:jvmTest :engine-webview:jvmTest :ui-renderer-cmp:compileKotlinJvm
```

Expected: JavaScript syntax and existing Kotlin/resource checks pass. Verify runtime behavior through the existing Android instrumented tests and platform acceptance scenarios; no standalone JS suite is retained.

### Android CMP and reference regressions

```bash
./gradlew :samples:android-cmp-app:assembleDebug
./gradlew :test:pixelAndroidDeviceTest
./gradlew :samples:android-cmp-app:pixelDebugAndroidTest
```

Expected: captured ObjectReference tests render through the real WebView, assert saved content/page instructions and visible/read-only behavior; existing reference/selector tests remain passing. Preserve existing case-to-fixture mappings and version selections.

### Published-artifact Android native

```bash
./gradlew publishToMavenLocal
./gradlew :samples:android-compose-app:assembleDebug
```

Expected: local artifacts include ObjectReference model/JS/renderer, and the sample compiles/runs using its published-module integration. Confirm the current factory API if stale `defaultHttpClient()` usage causes compilation failure.

### iOS frameworks and CMP app

```bash
./gradlew :engine-webview:assembleConstellationSdkDebugXCFramework
./gradlew :engine-webview:assembleConstellationSdkReleaseXCFramework
xcodebuild -list -project samples/ios-cmp-app/iosApp.xcodeproj
xcrun simctl list devices available
```

Use an actual available simulator UDID and the scheme returned by `-list` (target is `iosApp`; confirm the local scheme before invocation):

```bash
xcodebuild -project samples/ios-cmp-app/iosApp.xcodeproj -scheme iosApp -configuration Debug -destination "platform=iOS Simulator,id=<SIMULATOR-UDID>" build
```

Xcode invokes `:samples:base-cmp-app:embedAndSignAppleFrameworkForXcode` with its required environment. Do not invoke embed/sign tasks as standalone proof of sample readiness. Launch through Xcode and record all primary demo outcomes/screenshots on the actual iOS CMP app.

### Native SwiftUI

```bash
xcodebuild -list -project samples/swiftui-components-app/swiftui-components-app.xcodeproj
xcodebuild -project samples/swiftui-components-app/UITest/UITest.xcodeproj -scheme UITest -destination "platform=iOS Simulator,id=<SIMULATOR-UDID>" -parallel-testing-enabled NO test
```

Build/run the production sample through the discovered scheme and its existing `:engine-webview:embedAndSignAppleFrameworkForXcode` phase. Expected: production and shared mocked UI compile; new Dropdown wrapper scenario saves the intended identity; existing Swift tests pass. Add case/data/submission routes to the Swift mocked network as needed; shared JSON alone is insufficient.

### Final integration check

```bash
./gradlew build
git diff --check
```

Run broad build after local publication when native sample artifacts are prerequisites. Report unavailable device/signing/CDN checks with remaining evidence; do not mark acceptance complete based on compilation only.

## Evidence Record

For each example record: Pega/CoreJS version, target type, presentation/cardinality/interactivity, platform/app, fixture provenance, command or manual steps, expected/actual saved identity, and screenshots where useful. Status is `verified`, `unavailable`, or `unverified`.

On each version where the corresponding ObjectReference metadata is available, run at least single selection/replacement/submission, multiple add/remove/submission, parameter-dependent refresh, and persisted read-only display. This compatibility gate follows the initial CMP demo milestone; it does not require every presentation/version before that first demo.

| Status | Required evidence |
| --- | --- |
| Verified | Scenario executed successfully on the recorded Pega/CoreJS version and platform; saved identities checked. |
| Unavailable | Recorded environment/authoring evidence establishes that the configuration cannot be supplied there. |
| Unverified | Access, capture, execution, or another prerequisite is missing; successful availability/behavior has not been established. |

Keep each platform's result separate. Android acceptance does not establish iOS acceptance, and existing-component regressions do not verify ObjectReference.

Initial matrix for implementation to populate:

| Runtime | Android CMP | iOS CMP | Android native | SwiftUI Dropdown |
| --- | --- | --- | --- | --- |
| Pega 24 | Unverified | Unverified | Unverified | Unverified |
| Pega 25 | Unverified | Unverified | Unverified | Unverified |
| Pega 26 | Unverified | Unverified | Unverified | Unverified |

Expand entries by captured presentation before publishing support claims. Regression checks for old components do not change these feature statuses.
