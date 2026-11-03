# Tasks: Shared SDK Console Logging

**Input**: `specs/002-fix-console-logging/spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/sdk-console-logging.md`, and `quickstart.md`

## Format

`- [ ] T### [P?] [US#?] Description with exact repository path or command`

- `[P]` means the task can run alongside other independent tasks in the same phase after its prerequisites are met; tasks editing the same file are sequential.
- `[US1]`, `[US2]`, and `[US3]` correspond to the three prioritized stories in `spec.md`. Setup, foundational, and polish tasks have no story label.
- `[X]` marks the revised global implementation and completed checks. T019/T025 remain open for the full interactive native-log/custom-component smoke matrix; see `quickstart.md` for automated evidence and limitations. Preserve the uncommitted working tree; do not commit.
- Test tasks precede the corresponding implementation. An expected initial failure while implementing the new API is not acceptance evidence. Tests mutating `ConstellationSdk.debuggable` must restore it in `finally` or teardown.

## Phase 1: Setup

**Goal**: Keep the core module free of a dedicated JVM test dependency; verify the shared logging policy through the existing engine and platform tests.

- [X] T001 Remove the standalone core JVM test dependency from `core/build.gradle.kts`; no separate core logging test target is needed.

## Phase 2: Foundational Work

**Goal**: Provide the one global debug value and shared Log gate required by every story, removing the configuration flag without building another logger layer.

- [X] T002 Remove the standalone `core/src/jvmTest/kotlin/com/pega/constellation/sdk/kmp/core/LogTest.kt` per user direction; remaining automated log-policy coverage is in the iOS simulator handler test, while Android native behavior is a manual smoke check.
- [X] T003 Implement the one `@Volatile` default-`false` backing field, central severity decision, lazy message entry points and platform-output hook in `core/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/core/Log.kt`; preserve existing `Log.i/w/e(tag, message)` signatures and formatting, skip evaluation of suppressed routine lambdas, and always emit warnings/errors.
- [X] T004 Expose a mutable companion `ConstellationSdk.debuggable` delegating to **only** that backing field in `core/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/core/ConstellationSdk.kt`, then remove `debuggable` and its KDoc from `core/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/core/ConstellationSdkConfig.kt`; do not set/reset the flag in `ConstellationSdk.create` or `ConstellationSdkImpl`.
- [X] T005 Migrate the old `ConstellationSdkConfig(..., debuggable = true)` fixture in `test/src/commonTest/kotlin/com/pega/constellation/sdk/kmp/test/ConstellationSdkBaseTest.kt` to the new config shape; explicitly set and restore the companion property only if that test actually needs debugging, so cross-module tests compile without leaking global state.

## Phase 3: User Story 1 – Hide routine SDK output (P1)

**Goal**: Both mobile platforms suppress SDK-owned and forwarded routine native output through the same `core.Log` policy, while preserving warnings/errors and platform output details.

**Independent test**: With one SDK engine on Android and iOS, emit all supported forwarded levels, a custom-component message, SDK-owned native routine output and direct Android Logcat messages under both flag values. Confirm original tags/priorities, error source/throwable details, iOS formatting, and warning/error visibility in **native platform logs**.

- [X] T006 [P] [US1] Omit `test/src/androidDeviceTest/kotlin/com/pega/constellation/sdk/kmp/test/SdkConsoleLoggingTest.kt` per user direction; Android native logging and direct-error behavior are not covered by a retained automated device test and remain part of manual T019/T025 verification.
- [X] T007 [P] [US1] Rewrite `engine-webview/src/iosTest/kotlin/com/pega/constellation/sdk/kmp/engine/webview/ios/ConsoleHandlerTest.kt` to require a no-argument handler, levels 1/2/3/4 mapped to error/warn/info/info with `JS:` and existing formatting, malformed-payload errors, and default-off/after-toggle output through the shared core gate; restore the flag in teardown.
- [X] T008 [US1] Replace the per-engine factory in `engine-webview/src/androidMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/android/internal/AndroidEngineLogger.kt` with a stateless Android logging adapter (rename the file if appropriate) whose verbose/debug/info/warn/error calls use the central `core.Log` gate and the existing Android native priorities/tags; preserve throwable stack traces without storing another debug value.
- [X] T009 [P] [US1] Route `SdkWebChromeClient`'s forwarded levels through the T008 adapter in `engine-webview/src/androidMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/android/internal/SdkWebChromeClient.kt`; keep TIP/LOG=verbose, DEBUG=debug, WARNING=warn, ERROR=error, the `SdkWebViewConsole` tag, console error-source suffix, and `onConsoleMessage` returning `true`.
- [X] T010 [P] [US1] Remove logger injection from `engine-webview/src/androidMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/android/interceptor/WebViewAssetInterceptor.kt`; use T008 for lazy verbose interception output **and** its nested resource-URI error, preserving the existing tag, behavior and resource handling.
- [X] T011 [P] [US1] Route the SDK-owned direct `android.util.Log.e` error and throwable through T008 in `engine-webview/src/androidMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/android/interceptor/WebViewNetworkInterceptor.kt`; preserve its original tag, priority, stack trace, synthetic HTTP error response and request flow.
- [X] T012 [US1] Remove engine-owned logger construction, injection and per-site flag guards in `engine-webview/src/androidMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/android/AndroidWebViewEngine.kt`; send native routine and direct warnings through T008, keep lazy messages, capture the companion value at `configure` solely for `setWebContentsDebuggingEnabled` and later `EngineConfiguration.debuggable`, and leave navigation/lifecycle unchanged.
- [X] T013 [P] [US1] Remove `ConsoleHandler(showDebugLogs: Boolean)` and the injected per-engine logger from `engine-webview/src/iosMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/ios/ConsoleHandler.kt`; use `core.Log` to preserve `JS:` prefix, levels 1/2/3/4, malformed-input errors, WebKit registration delegate behavior, and native filtering without a local Boolean.
- [X] T014 [P] [US1] Remove injected logger state from `engine-webview/src/iosMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/ios/ResourceHandler.kt`; route all native routine task/start/finish/cancel messages through lazy `core.Log` calls, preserving its public constructor, cancellation paths and warning.
- [X] T015 [P] [US1] Remove injected logger state from `engine-webview/src/iosMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/ios/ScriptInjector.kt`; route script-loading routine output through lazy `core.Log` calls while preserving public constructor, script handling and missing-script warning.
- [X] T016 [P] [US1] Remove injected logger state from `engine-webview/src/iosMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/ios/providers/DefaultProvider.kt`; route built-in request routine output through lazy `core.Log` without changing its public constructor, URL text or network routing.
- [X] T017 [US1] Remove redundant propagation of the T016 logger in `engine-webview/src/iosMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/ios/ResourceProviderManager.kt`; retain public constructor, built-in routing and unconditional warning, leaving the app-supplied `ResourceProvider` untouched.
- [X] T018 [US1] Remove engine-owned logger/helper injection and per-message guards in `engine-webview/src/iosMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/ios/WKWebViewBasedEngine.kt`; register one no-argument `ConsoleHandler`, send native diagnostics via lazy `core.Log`, capture the companion flag at `configure` for both `EngineConfiguration.debuggable` and `setInspectable` at action startup, and preserve WebKit registration and lifecycle.
- [ ] T019 [US1] Execute the single-engine Android/iOS native-log and custom-component matrix in `specs/002-fix-console-logging/quickstart.md`; the Android device regression was removed per user direction, so record manual native output and unavailable platform checks rather than treating compilation as equivalent evidence.

## Phase 4: User Story 2 – Change logging for all SDK instances (P1)

**Goal**: A single off/on/off assignment sequence changes the next native message from **both** existing SDK instances; creating another instance does not reset it. Logging remains live even though inspection and embedded debug configuration are initialization snapshots.

**Independent test**: Keep two Android and two iOS engines alive, emit their routine and warning/error messages before and after each toggle, then configure another engine and repeat. Verify all instances follow the same global logging value while inspection/configuration snapshots retain their respective initialization values.

- [X] T020 [P] [US2] Omit the simulated two-call-site `SharedLoggingTest.kt` per user direction; shared engine behavior must be checked manually on Android and iOS as part of T025.
- [X] T021 [P] [US2] Omit the redundant two-handler test `engine-webview/src/iosTest/kotlin/com/pega/constellation/sdk/kmp/engine/webview/ios/ConsoleHandlerGlobalTest.kt` per user direction; iOS live-level filtering remains covered by `ConsoleHandlerTest.kt`, while multi-engine behavior remains a manual T025 check.
- [X] T022 [P] [US2] Omit the iOS engine snapshot/global-toggle test `WKWebViewBasedEngineLoggingTest.kt` per user direction; retain the configure-time snapshot contract and verify it through the outstanding iOS native smoke matrix in T025.
- [X] T023 [US2] Omit the two-engine Android device regression in `test/src/androidDeviceTest/kotlin/com/pega/constellation/sdk/kmp/test/SdkConsoleLoggingTest.kt` per user direction; retain two-engine Android live toggles and inspection behavior in the manual T025 smoke matrix.
- [X] T024 [US2] Delete superseded per-instance policy and unused factories after T009–T023 have migrated their consumers: `engine-webview/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/common/InstanceLogger.kt`, `engine-webview/src/androidMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/android/internal/AndroidEngineLogger.kt` (only if T008 renamed it), `engine-webview/src/iosMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/ios/IosEngineLogger.kt`, and `engine-webview/src/jvmTest/kotlin/com/pega/constellation/sdk/kmp/engine/webview/common/InstanceLoggerTest.kt`; do not retain low-value replacement isolation/snapshot tests omitted in T020–T022.
- [ ] T025 [US2] Execute the two-engine Android/iOS native-log off/on/off and inspection-snapshot matrix in `specs/002-fix-console-logging/quickstart.md`; document results and unavailable platform/custom-component checks explicitly rather than treating unit tests or builds as native-log evidence.

## Phase 5: User Story 3 – Migrate and understand the new API (P2)

**Goal**: Kotlin and Swift callers remove the config/handler debug arguments, can use one documented SDK-level flag, and understand that logging is live while inspection is captured at configuration.

**Independent test**: Compile each affected Kotlin and Swift sample/test call site against the new public API, follow the published Kotlin/Swift migration guidance, verify the generated Swift companion accessor, and check the docs' default, shared scope, supported levels, and inspection/browser/host boundaries.

- [X] T026 [P] [US3] Replace the obsolete config debug argument with an explicit `ConstellationSdk.debuggable` assignment before SDK creation in `samples/android-compose-app/src/main/java/com/pega/constellation/sdk/kmp/samples/androidcomposeapp/AndroidComposeActivity.kt`; leave its app-owned Android Logcat calls independent.
- [X] T027 [P] [US3] Migrate the old config debug argument to intentional SDK-level assignment in `samples/base-cmp-app/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/samples/basecmpapp/ui/screens/pega/PegaViewModel.kt`; do not add per-instance logging flags or change independent sample business behavior.
- [X] T028 [P] [US3] Migrate config construction and any test-specific global-flag setup/teardown in `samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/ComposeTest.kt`; avoid leaking the flag to other instrumented tests.
- [X] T029 [P] [US3] Remove the config debug argument in `samples/swiftui-components-app/swiftui-components-app/ViewController.swift` and set the generated SDK companion property from `SDKConfiguration.debuggable` before SDK creation; verify the actual exported setter during T037 rather than assuming the Swift symbol spelling.
- [X] T030 [P] [US3] Migrate config/debug setup in `samples/swiftui-components-app/UITest/Mocked Application/ContentView.swift` to the one generated SDK companion property; retain the existing mock test's intended inspection setting and validate the accessor with T037.
- [X] T031 [P] [US3] Replace per-config/per-engine logging guidance in `core/README.md` with SDK companion default-off behavior, Kotlin migration for the intentional source/binary break, inspection timing, global-risk warning and visibility of warnings/errors.
- [X] T032 [P] [US3] Replace the obsolete per-engine console section in `engine-webview/README.md` with supported forwarded levels, custom-component effect, global toggles, WebKit/browser-console boundary, and Android's process-wide inspection caveat.
- [X] T033 [P] [US3] Update `docs/how-to-integrate-android-compose.md` with the new Kotlin setup example, removed `ConstellationSdkConfig.debuggable` argument, migration/break note, Logcat filtering, global runtime behavior and inspection-at-initialization caveat.
- [X] T034 [P] [US3] Update `docs/how-to-integrate-compose-multiplatform.md` with Kotlin/Swift migration guidance, generated Swift companion setter verified by T037, global default/live logging behavior, native-versus-browser boundary, and inspection snapshot timing.
- [X] T035 [P] [US3] Migrate the consumer-facing configuration example in `docs/ai/skills/cmp-app-integration/SKILL.md` away from the removed config debug argument; describe the one SDK companion setting and setting it before engine configuration for inspection.
- [X] T036 [US3] Compile the migrated local-dependency Kotlin sample and instrumented-test sources using `./gradlew :samples:base-cmp-app:compileKotlinJvm :samples:android-cmp-app:assembleDebug :samples:android-cmp-app:compileDebugAndroidTestKotlinAndroid --quiet`; `samples/android-compose-app/build.gradle.kts` resolves published Maven SDK artifacts, so compile that sample only against matching locally published new artifacts and report if unavailable.
- [X] T037 [US3] Rebuild the iOS framework using `./gradlew :engine-webview:assembleConstellationSdkDebugXCFramework --quiet`, then compile both `samples/swiftui-components-app/swiftui-components-app.xcodeproj` with `xcodebuild -project samples/swiftui-components-app/swiftui-components-app.xcodeproj -scheme swiftui-components-app -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' CODE_SIGNING_ALLOWED=NO build` and `samples/swiftui-components-app/UITest/UITest.xcodeproj` with `xcodebuild -project samples/swiftui-components-app/UITest/UITest.xcodeproj -scheme UITest -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' CODE_SIGNING_ALLOWED=NO build`; verify the real exported Swift companion setter in `ViewController.swift` and `UITest/Mocked Application/ContentView.swift`, reporting unavailable Xcode/framework tooling rather than guessing syntax.

## Phase 6: Polish & Cross-Cutting Validation

- [X] T038 Run `./gradlew :engine-webview:jvmTest :engine-webview:iosSimulatorArm64Test :engine-webview:compileAndroidMain :engine-webview:compileKotlinIosSimulatorArm64 :ui-renderer-cmp:jvmTest :ui-renderer-cmp:compileAndroidMain :ui-renderer-cmp:compileKotlinIosSimulatorArm64 --quiet` from the repository root; record exact results and separate blocked native-platform smoke checks from successful compilation.
- [X] T039 Run `git diff --check`, `git status --short`, and targeted repository searches, then audit `core/`, `engine-webview/`, `test/`, `samples/`, and `docs/` against `specs/002-fix-console-logging/spec.md` and `contracts/sdk-console-logging.md`: no stale config arguments, handler Boolean, per-instance loggers, individual debug guards, or SDK-owned Android Logcat bypass; preserve tags/levels/throwables, warning/errors, lazy suppression, no new sensitive payloads, host logging, and unchanged JavaScript. Do not commit; report T019/T025/T037 limitations.

## Phase 7: Approved Common-Facade Simplification (2026-11-02)

These tasks supersede the Android adapter, injected test output and iOS info/info mapping in T003/T007–T013, not the accepted global state or initialization snapshot contract.

- [X] T040 Update existing spec/research/plan/data-model/contract/quickstart for the common facade, explicit debug mapping and host-build sample initialization.
- [X] T041 Add focused real-output tests in `engine-webview/src/jvmTest/.../LogTest.kt`; rewrite `engine-webview/src/iosTest/.../ConsoleHandlerTest.kt` to capture stdout instead of injecting output. Cover all routine levels, warning/error preservation, lazy suppression, malformed input and live shared toggles.
- [X] T042 Implement `core/src/commonMain/.../Log.kt` with `v/d/i/w/e`, private filter and internal writer; add `core/src/{androidMain,iosMain,jvmMain}/.../Log.*.kt`. Preserve legacy String methods and Android throwable traces; keep routine lambdas only.
- [X] T043 Remove `engine-webview/src/androidMain/.../internal/SdkLog.kt`, migrate Android callers to common `Log`, simplify WebChromeClient dispatch and iOS handler mapping, and rename both engines' snapshot to `debuggableAtInitialization`.
- [X] T044 Remove unconditional shared ViewModel enablement; initialize Android samples from app `BuildConfig.DEBUG`, SwiftUI from the Swift host build setting at launch, and iOS CMP from that build setting at root-controller setup. Enable app BuildConfig generation if needed.
- [X] T045 Update core/engine READMEs, integration guides and `docs/ai/skills/cmp-app-integration/SKILL.md` for common output, debug-build initialization and unchanged global/inspection/migration boundaries.
- [X] T046 Run focused Gradle checks, affected sample debug/release compilation where available, diff/source audits and document exact limitations. JVM/iOS tests, temporary native Android smoke, both Android samples' Debug/Release compilation and all three Swift consumers' Debug/Release builds passed; see `quickstart.md`. T019/T025's full interactive matrix remains open. Draft replies to the ten current non-outdated Marek threads without posting or committing.

Dependencies: T040 precedes all implementation; T041 precedes T042/T043, T043 depends on T042, T044 depends on T043's common API, T045 follows T044's concrete initialization examples, and T046 follows T041–T045. T019/T025 remain native smoke checks rather than proxies satisfied by compilation.

## Phase 8: Direct Companion Reads (2026-11-02)

This user-directed change supersedes the snapshot requirements in earlier tasks,
including T012/T018/T022/T025/T043. Those completed entries describe previous work;
the current behavior is defined by this phase and the updated spec/plan.

- [X] T047 Remove engine-local debug state from `AndroidWebViewEngine.kt` and `WKWebViewBasedEngine.kt`; read `ConstellationSdk.debuggable` directly at the existing inspection and embedded configuration sites. Update public docs and design artifacts to recommend setting the flag before SDK creation and leaving it unchanged mid-flow. Both engines compiled and existing logger/handler tests passed; the source audit confirms only direct companion reads at the four existing use sites. No commit.

## Phase 9: Review Feedback (2026-11-02)

This phase supersedes T041's JVM logger test and T044's sample build-mode changes.

- [X] T048 Shorten `ConstellationSdk.debuggable` KDoc, remove `engine-webview/src/jvmTest/.../LogTest.kt`, restore previous sample debug settings and remove their added build-mode plumbing. Align sample documentation and existing design artifacts.
- [X] T049 Run the remaining engine tests and affected sample compilation; record results and limitations. Remaining JVM/iOS tests, both Android samples' Debug/Release compilation, shared CMP JVM/iOS compilation and all three Swift consumers' Debug builds passed; see `quickstart.md`. Swift Release builds and the full interactive matrix were not repeated. Changes remain uncommitted.

## Phase 10: Second Review Round (2026-11-02)

T050 supersedes the earlier `TIP`/`LOG` mapping in T009.

- [X] T050 Map Android WebView `LOG` to `Log.i` in `SdkWebChromeClient.kt`; keep `TIP` verbose. WebView may report multiple JavaScript console methods as `LOG`; all remain gated by `ConstellationSdk.debuggable`. Update the spec, contract, plan and engine README mapping text.
- [X] T051 Remove the `ConstellationSdk.debuggable` save/set/restore from `samples/android-cmp-app/src/androidInstrumentedTest/.../ComposeTest.kt`; tests don't rely on logs or inspection.
- [X] T052 Remove breaking-change/migration text from both how-to guides and keep a single canonical `debuggable` explanation in `core/README.md`; other docs link to it. The PR description and commit history record the breaking change; the next `docs/releases/vX.Y.Z.md` (release-new-version skill) records it under Breaking changes/Migration.
- [X] T053 Verify Android compilation and targeted emulator checks, and audit the docs for duplicated text; see `quickstart.md` for commands and limitations. Draft replies to Marek's four new threads; post only after approval.

## Dependencies & Execution Order

- **Setup/foundation**: T001 removes the unnecessary standalone core test dependency and T002 removes its dedicated test file per user direction. T003 implements `core.Log`; T004 exposes the sole companion property and removes the config field. T005 migrates the test fixture after T004. T003/T004 block all story code and tests using the new API.
- **US1**: T006/T007 are test-first and independent. T008 precedes T009–T012. T009–T011 touch different Android files and can proceed together; T012 wires their adapter and captures inspection state. T013–T016 touch distinct iOS files and can proceed together, then T017 follows T016, and T018 wires the handler/helpers and snapshot after T013–T017. T019 requires the single-engine implementation and platform access, but its unavailable manual checks must not prevent US2/US3 work.
- **US2**: T020–T023's separate simulated JVM, iOS engine, and Android device tests are omitted per user direction. T025 is required to smoke-test live multi-engine behavior and inspection snapshots on both platforms. T024 removes obsolete code only after T009–T023 remove all references.
- **US3**: Public migration depends on T004; T026–T035 edit distinct sample/doc files and are parallelizable. T036 depends on T026–T028; T037 depends on T029/T030 and a compatible generated framework. Documentation must describe the design in US1/US2 even if it is edited alongside their code.
- **Finish**: T038/T039 follow all feasible story code, tests and documentation. Do not mark previously completed per-engine tests, incomplete iOS native-log smoke checks, or unsupported Swift builds as evidence for this revision.

## Parallel Execution Examples

- **US1**: After T008, adapt `SdkWebChromeClient.kt`, `WebViewAssetInterceptor.kt`, and `WebViewNetworkInterceptor.kt` independently (T009–T011) while updating separate iOS files (T013–T016); wire engines once those changes land (T012/T017/T018).
- **US2**: No separate simulated JVM, two-handler, iOS engine snapshot, or Android device logging tests are retained (T020–T023); iOS console-level toggles remain in T007, and multi-engine behavior plus engine snapshots remain in the manual T025 matrix.
- **US3**: Migrate Android, CMP, and Swift callers (T026–T030) and update the five separate documentation surfaces (T031–T035); run their compile checks only after all applicable callers are updated.

## Implementation Strategy

**Suggested MVP**: T001–T019 establish one global core policy and both platforms' single-engine behavior without the old logger injection, preserving native output. US2 then proves live shared behavior with two running instances (T020–T025), and US3 migrates public consumers and guidance (T026–T037); T038–T039 are final checks. The old per-engine implementation and `[X]` task history are starting context, **not** completed tasks for this design. Review this breakdown before `/speckit-implement`; implementation and commits are not part of this command.
