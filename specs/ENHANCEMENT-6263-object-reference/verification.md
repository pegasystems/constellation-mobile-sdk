# ENHANCEMENT-6263 ObjectReference Verification

**Status**: Initial implementation slice complete; live ObjectReference fixture capture and sample acceptance remain pending.
**Baseline**: Current master at implementation start.

## Completed Checks

| Check | Result |
| --- | --- |
| JavaScript syntax | `node --check` passed for `object-reference.component.js` and `object-reference-utils.js`. |
| JavaScript helper tests (historical) | Passed during development; the standalone JS test file was subsequently removed at the user's request. No JS test coverage is retained. |
| JVM/core/renderer build | `./gradlew :core:compileKotlinJvm :engine-webview:jvmTest :ui-renderer-cmp:compileKotlinJvm` passed. |
| Resource packaging | `WebViewResourcesTest` now asserts the ObjectReference scripts and map are bundled; covered by `:engine-webview:jvmTest`. |
| Android CMP sample | `./gradlew :samples:android-cmp-app:assembleDebug` passed. |
| iOS CMP app build | `xcodebuild -project samples/ios-cmp-app/iosApp.xcodeproj -scheme iosApp -configuration Debug -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' build` passed. |
| Native SwiftUI app build | `xcodebuild -project samples/swiftui-components-app/swiftui-components-app.xcodeproj -scheme swiftui-components-app -configuration Debug -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' build` passed; the new `ObjectReferenceComponentView.swift` compiled. |
| Published SDK artifacts | `./gradlew publishToMavenLocal --no-configuration-cache` passed. |
| Android native sample build | Passed after updating the stale `defaultHttpClient()` call to `defaultCallFactory()` in `AndroidComposeActivity.kt`, using the locally published artifacts and `--no-configuration-cache`. |

The first combined publish-and-build attempt failed because the sample ran before local `5.0.0` artifacts were available and Gradle configuration-cache serialization failed for the sample navigation task. Publication was then run separately with `--no-configuration-cache`, followed by a successful native sample build with the same flag.

## Pending Evidence

No representative ObjectReference Pega case, sanitized DX responses, or case identifiers were available in the repository during this implementation slice. The following remain unverified until T001-T003 are completed:

| Runtime/platform | Status |
| --- | --- |
| Pega 24 Android CMP | Unverified |
| Pega 24 iOS CMP | Unverified |
| Pega 24 Android native | Unverified |
| Pega 24 SwiftUI Dropdown | Unverified |
| Pega 25 Android CMP | Unverified |
| Pega 25 iOS CMP | Unverified |
| Pega 25 Android native | Unverified |
| Pega 25 SwiftUI Dropdown | Unverified |
| Pega 26 Android CMP | Unverified |
| Pega 26 iOS CMP | Unverified |
| Pega 26 Android native | Unverified |
| Pega 26 SwiftUI Dropdown | Unverified |

The initial implementation intentionally does not fabricate response fixtures or claim server submission, parameter refresh, Cards, tables, read-only persistence, or SwiftUI behavior without representative metadata.

## Trace-driven Bug Fix Validation

- `SelectableCardComponent` consumes its own `ClickItem` before forwarding other events to secondary fields. Single selection and multi insert/delete actions retain their existing behavior.
- `ObjectReferenceComponent.destroy()` invalidates pending requests and delegates unsubscribe/child cleanup to `ContainerBaseComponent`, removing the duplicate unsubscribe seen in `logs-obj-ref1.txt`.
- Historical validation: three focused regression tests failed on the original behavior, then passed after the fixes (6 total passed). The standalone JS test file was subsequently removed at the user's request; use existing test infrastructure for future validation.
- `node --check engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/templates/selectable-card.component.js` and `node --check engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/fields/object-reference.component.js`: passed.
- `./gradlew :engine-webview:jvmTest --no-configuration-cache`: passed, including bundled-resource checks.
- `git diff --check`: passed. These regression checks do not replace a live rerun of the captured Pega Cards flow.

## Environment Notes

- Gradle emitted the existing warning that the `iosX64Test` target is disabled on the ARM64 host.
- Gradle emitted existing deprecation warnings for Material Icons, Compose `menuAnchor`, and Kotlin expect/actual classes.
- No credentials or customer data were added.
