# Validation Guide: Shared SDK Console Logging

## Prerequisites

- JDK 17+ and the repository's `./gradlew` wrapper; macOS with an iOS simulator and an Android device/emulator for native-platform verification.
- Existing test/sample apps and local or mocked endpoints; do not put credentials or customer data in diagnostic messages.
- Read [the observable output contract](contracts/sdk-console-logging.md) and [runtime state model](data-model.md). The checks below validate this working-tree implementation; compilation alone is not native-log evidence.

## Focused automated checks

### Second review round (2026-11-02)

The planned Android compilation passed:

```bash
./gradlew :engine-webview:compileAndroidMain :samples:android-cmp-app:compileDebugAndroidTestKotlinAndroid --quiet
```

Two temporary session-only instrumentation checks passed on an Android 12
emulator with WebView 151:

```bash
./gradlew --no-configuration-cache -I <session-only-init-script> :samples:android-cmp-app:connectedDebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=com.pega.constellation.sdk.kmp.loggingreview.LoggingReviewProbe --quiet
```

The probe exercised all WebView callback levels and real JavaScript console
messages with the flag off, on and off again, checking native Logcat priorities,
filtering, warnings/errors and error source details. On this WebView,
`console.log` and `console.info` arrived as `LOG` and `console.debug` as `TIP`;
other WebView versions may report different levels. The second check confirmed
that `ComposeTest` setup and teardown leave both flag values unchanged. The
temporary test and init script were removed afterward.

The full sample UI flow was not run because its local mock CDN fixtures are
absent. The native multi-engine/custom-component matrix remains open (T019/T025).

### 2026-11-02 simplification

First run `./gradlew :engine-webview:jvmTest :engine-webview:iosSimulatorArm64Test :engine-webview:compileAndroidMain --quiet`. The standalone JVM logger test was subsequently removed per user feedback; unrelated JVM tests remain. iOS tests capture the production no-argument handler's stdout and check explicit error/warn/info/debug mapping, malformed input and shared toggles.

Compile the affected sample sources. Verify that their previous explicit debug settings are preserved: SwiftUI reads its plist, while Android Compose, shared CMP and mocked SwiftUI flows enable debugging unconditionally. Verify Android priorities/tags/throwable traces on a device when available; stdout tests do not establish Logcat output.

### Review-feedback results (2026-11-02)

After removing the JVM logger test and restoring the samples, this command passed
with a session-only init script substituting local SDK projects for the standalone
Android Compose sample's published dependencies:

```bash
./gradlew --no-configuration-cache -I <session-only-init-script> :engine-webview:jvmTest :engine-webview:iosSimulatorArm64Test :samples:android-cmp-app:compileDebugKotlinAndroid :samples:android-cmp-app:compileReleaseKotlinAndroid :samples:android-compose-app:compileDebugKotlin :samples:android-compose-app:compileReleaseKotlin :samples:base-cmp-app:compileKotlinJvm :samples:base-cmp-app:compileKotlinIosSimulatorArm64 --quiet
```

All three Swift consumers listed below passed Debug builds using:

```bash
xcodebuild -quiet -project samples/swiftui-components-app/swiftui-components-app.xcodeproj -scheme swiftui-components-app -configuration Debug -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' CODE_SIGNING_ALLOWED=NO build
xcodebuild -quiet -project samples/swiftui-components-app/UITest/UITest.xcodeproj -scheme UITest -configuration Debug -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' CODE_SIGNING_ALLOWED=NO build
xcodebuild -quiet -project samples/ios-cmp-app/iosApp.xcodeproj -scheme samples.ios-cmp-app.iosApp -configuration Debug -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' CODE_SIGNING_ALLOWED=NO build
git diff --check
```

The sample source and Gradle files match their pre-simplification versions.
The temporary init script was removed. Swift Release builds and the full
interactive smoke matrix were not repeated for this feedback revision.

### Earlier simplification results (2026-11-02)

The results below precede the feedback revision. The JVM logger tests and
build-mode assertions are historical, not coverage or requirements for the
restored samples.

After the subsequent removal of engine-local debug snapshots, this command passed:

```bash
./gradlew :engine-webview:compileAndroidMain :engine-webview:compileKotlinIosSimulatorArm64 :engine-webview:jvmTest :engine-webview:iosSimulatorArm64Test --quiet
git diff --check
```

The source audit confirmed direct companion reads at both engines' existing
inspection and embedded-configuration sites, with no retained local debug flag.
The setter still does not synchronize views; set the flag before SDK creation
and leave it unchanged during flows.

Passed:

```bash
./gradlew :engine-webview:jvmTest :engine-webview:iosSimulatorArm64Test :engine-webview:compileAndroidMain --quiet
./gradlew :engine-webview:jvmTest :engine-webview:iosSimulatorArm64Test :engine-webview:compileAndroidMain :samples:android-cmp-app:compileDebugKotlinAndroid :samples:android-cmp-app:compileReleaseKotlinAndroid :samples:base-cmp-app:compileKotlinJvm :samples:base-cmp-app:compileKotlinIosSimulatorArm64 :ui-renderer-cmp:jvmTest :ui-renderer-cmp:compileAndroidMain --quiet
git diff --check
```

The retained engine tests passed: 4 JVM tests (including 2 logger tests) and 3
iOS handler tests. The iOS tests exercise two production handlers sharing the
live flag, not an injected substitute output.

The standalone Android Compose sample uses published dependencies. A session-only
Gradle init script substituted the four SDK modules with their local projects and
added a temporary instrumented smoke test to the existing Android CMP test source
set. No dependency-resolution change or device test is retained in the repository.
This command passed, with the local init-script path supplied for `-I`:

```bash
./gradlew --no-configuration-cache -Pkotlin.incremental=false -I <session-only-init-script> :samples:android-compose-app:compileDebugKotlin :samples:android-compose-app:compileReleaseKotlin :samples:android-cmp-app:connectedDebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=com.pega.constellation.sdk.kmp.loggingvalidation.LogSmokeTest --quiet
adb -s emulator-5554 logcat -d -v brief 'ConstellationLogSmoke:V' '*:S'
```

The one native smoke test passed on the attached Android emulator. Exact Logcat
assertions confirmed V/D/I only during the enabled phase, W/E in all three
off/on/off phases, the original tag, and error throwable stack traces. Generated
app `BuildConfig` values were also checked as true in Debug and false in Release.
An earlier compilation hit a Kotlin incremental-cache error and automatically
recompiled successfully; the command above was repeated with incremental
compilation disabled and completed without that error.

Each of these Swift consumers built successfully with both `Debug` and `Release`:

| Project | Scheme |
| --- | --- |
| `samples/swiftui-components-app/swiftui-components-app.xcodeproj` | `swiftui-components-app` |
| `samples/swiftui-components-app/UITest/UITest.xcodeproj` | `UITest` |
| `samples/ios-cmp-app/iosApp.xcodeproj` | `samples.ios-cmp-app.iosApp` |

For each project/scheme pair, the command was:

```bash
xcodebuild -quiet -project "$project" -scheme "$scheme" -configuration "$configuration" -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' CODE_SIGNING_ALLOWED=NO build
```

The normal Xcode build phases rebuilt the matching Kotlin frameworks. The
SwiftUI sample's actual `SDKConfiguration.swift` was additionally evaluated by
`xcrun swift -D DEBUG -` and `xcrun swift -`, asserting true and false respectively.
No signing or external Pega environment was needed.

**Remaining limitation**: the full interactive two-engine/custom-component and
inspection matrix below was not rerun. Native logger smoke output, handler tests
and sample compilation do not establish that full end-to-end matrix; T019/T025
remain open. The older evidence at the end of this guide predates this simplification.

From the repository root, after implementation:

```bash
./gradlew :engine-webview:jvmTest :engine-webview:iosSimulatorArm64Test :engine-webview:compileAndroidMain :engine-webview:compileKotlinIosSimulatorArm64 :ui-renderer-cmp:jvmTest :ui-renderer-cmp:compileAndroidMain :ui-renderer-cmp:compileKotlinIosSimulatorArm64 --quiet
```

No Android SDK logging device test is retained per user direction; run the Android native-log and multi-engine matrix below manually. iOS simulator tests cover console-level mapping and the shared flag through two handlers; engine inspection/configuration with a stable flag is also a manual check. Off/on/off tests exercise the logger's filter, not a supported mid-flow inspection-reconfiguration workflow. Reset the global setting in `finally`/teardown. Compile the updated Kotlin samples and rebuild the Swift framework/sample where tooling is available; confirm the generated Swift companion setter name before documenting exact Swift syntax. If a device or simulator is unavailable, report the limitation rather than counting compilation as native-log evidence.

## Platform behavior matrix

Create two SDK engines on each platform with `ConstellationSdk.debuggable = false`, then log from both using supported SDK and custom-component console messages (`log`, `info`, `debug`, `warn`, `error`) and SDK-native diagnostics. Capture **native platform logs** (Android Logcat and iOS app console, not the WebKit inspector). Set `ConstellationSdk.debuggable = true` without recreating either engine and repeat, then turn it off again and repeat.

| Global setting | Both engines' forwarded routine output | Both engines' SDK-native routine output | Both engines' warnings/errors |
| --- | --- | --- | --- |
| Default / `false` | Hidden | Hidden | Visible |
| `true` | Visible | Visible | Visible |
| Changed back to `false` | Hidden | Hidden | Visible |

Check that a new engine's creation does not reset logging; SDK-origin Android direct Logcat calls are also gated; priorities, tags, error source details, throwable traces, and iOS `JS:`/formatted output remain as before. The WebView console is shared with custom components; browser-only utilities and WebKit's own console are not filtered. Existing unsupported-renderer warning output stays visible.

## Inspection and API checks

1. Set `ConstellationSdk.debuggable = true` **before** SDK creation and keep it constant throughout the flow. Verify inspection and serialized embedded debug settings are enabled. Repeat in a fresh flow with the flag set to `false` before SDK creation.
2. Verify both engines read the companion property directly at inspection and embedded configuration sites, without retaining local debug state. Android applies inspection at configure and builds embedded configuration at page load; iOS reads the flag for both at action startup. Mid-flow changes are not a supported integration pattern, and the setter does not synchronize existing views. Android inspection is process-wide, not per-view state.
3. Search for `ConstellationSdkConfig(... debuggable = ...)`, old data-class `copy(debuggable = ...)`, and `ConsoleHandler(showDebugLogs = ...)` usages in code, tests, samples, guides, and integration skills; migrate them. Review documentation for the intentional API break and Kotlin/Swift guidance.
4. Check SDK-owned routine log sites: there must be **zero** individual debug-setting guards and no direct Android platform-log calls bypassing the shared gate. Document any platform manual checks not executed; unit tests alone cannot establish native output.

## Evidence from this implementation

- The Android managed-device `SdkConsoleLoggingTest` previously passed native Logcat assertions for forwarded levels, two running engines across toggles, an SDK-owned routine diagnostic, independent host logging, and network error priority/tag/throwable preservation. It was removed per user direction, so these cases are not covered by the retained automated suite and require manual rechecking.
- iOS simulator `:engine-webview:iosSimulatorArm64Test` passed the console-level/global-toggle test. The separate engine inspection-snapshot test was removed per user direction, so that behavior remains unverified until the manual smoke check is run. The rebuilt XCFramework and both Swift sample projects also compiled with `ConstellationSdkCompanion().debuggable`.
- The full interactive native-log/custom-component smoke matrix for iOS and Android has **not** been executed. Automated simulator tests and Android WebView console forwarding do not establish how every app-supplied custom script appears in a running iOS app's platform log; keep T019/T025 open until those observations are made.
