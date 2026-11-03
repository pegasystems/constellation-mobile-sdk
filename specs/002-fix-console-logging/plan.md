# Implementation Plan: Shared SDK Console Logging

**Branch**: `bugfix/mloct/BUG-1028166-pr` | **Updated**: 2026-11-02 | **Spec**: [spec.md](spec.md)

## Summary

Keep the accepted process-wide mutable `ConstellationSdk.debuggable` contract and the breaking removal of the config flag. Simplify the implementation to one `core.Log` facade with a private severity decision and internal `expect/actual` platform output. Delete the Android engine logging adapter and the public output-callback entry point. Preserve the samples' previous explicit debug settings.

## Technical Context

- **Language/runtime**: Kotlin Multiplatform 2.4.0, Android/JVM/iOS, Swift and Compose.
- **Build/dependencies**: Existing Gradle Wrapper, JDK 17+, Android SDK and Xcode; no new dependencies.
- **Storage**: No persistence. One volatile Boolean in `core.Log`.
- **Performance**: Suppressed routine lambdas are not evaluated. No per-message flag checks outside the common logger.
- **Scope**: `core`, `engine-webview`, mobile sample initialization, focused existing-module tests and related documentation.
- **Constraints**: No JavaScript or GitHub Actions changes; no commit. No logger injection, mutable sink registry, automatic SDK-library build-variant detection or live inspection synchronization.

## Constitution Check

- [x] Existing specification updated before implementation; global behavior, preserved sample settings and intentional severity/output corrections are explicit.
- [x] Common policy stays in `core/commonMain`; Android/iOS/JVM APIs stay in their respective source sets.
- [x] Retain pre-PR String `Log.i/w/e` signatures and the `Log` name. The previously accepted config/handler API breaks remain documented.
- [x] Retain iOS production-output tests and native Android smoke evidence; remove the JVM `LogTest` per user feedback. Compile affected samples and distinguish native smoke limitations.
- [x] No new diagnostic payloads or credentials; host-owned logging and request behavior remain unchanged.
- [x] Update module/integration docs and migration guidance; add release notes only when a release version is selected.

## Design and Source Layout

1. `core/src/commonMain/.../Log.kt`: one volatile backing field, `v/d/i/w/e`, private `emit`, internal severity and `expect` writer. Keep String `i/w/e`; use String/lazy overloads for `v/d/i`. Warning/error messages are unconditional and need no lazy overloads.
2. `core/src/{androidMain,iosMain,jvmMain}/.../Log.*.kt`: Android writes native priorities/tags and throwable stack traces; iOS/JVM retain formatted stdout. No output callback is public or passed by an engine.
3. `engine-webview/src/androidMain/...`: remove `internal/SdkLog.kt`, call common methods everywhere, and map WebView TIP→verbose, LOG→info, DEBUG→debug, WARNING→warn, ERROR→error directly.
4. `engine-webview/src/iosMain/.../ConsoleHandler.kt`: no injected output. Map wire levels 1/2/3/4 directly to `e/w/i/d`, preserving the existing unknown-numeric-level fallback, malformed-input error and `JS:` prefix. Native tests capture stdout rather than replace the logger.
5. Both engines: read `ConstellationSdk.debuggable` directly for inspection and `EngineConfiguration.debuggable`, without retaining an engine-local Boolean. Keep Android inspection at `configure`, Android embedded configuration at page load, and iOS inspection/embedded configuration at action startup. Set the flag before SDK creation and leave it unchanged during flows; no runtime synchronization is needed.
6. Samples: restore hardcoded enablement in the Android Compose activity, shared CMP ViewModel and mocked SwiftUI flow. Restore the SwiftUI plist lookup and assignment before SDK creation. Remove the added BuildConfig generation, application-startup assignments and iOS CMP Boolean parameter.

## Research and Compatibility

No unresolved design choices remain. [research.md](research.md) records why `expect/actual` output replaces the adapter. One common facade does not mean losing Logcat priorities. Android calls previously printed through common stdout intentionally gain their correct native severity/tag; iOS JavaScript debug messages intentionally change from `I:` to `D:`.

The public `Log` name and legacy String methods remain. `Level` and output routing become internal implementation details; `emit` is private. These replace APIs introduced only in this unmerged PR. Logging and inspection/configuration operations read the same companion property directly. Mid-flow changes are not a supported integration pattern; restoring the per-instance config flag would contradict the approved scope.

## Test Strategy

- Remove `engine-webview/src/jvmTest/.../LogTest.kt` per user feedback; retain the unrelated existing JVM tests and iOS handler coverage.
- Rewrite iOS `ConsoleHandlerTest` to capture real stdout for the no-argument production handler. Assert exact error/warn/info/debug labels, malformed input, global toggles and two handlers sharing the same policy.
- Run `./gradlew :engine-webview:jvmTest :engine-webview:iosSimulatorArm64Test :engine-webview:compileAndroidMain --quiet` first.
- Compile mobile sample debug/release paths and iOS framework/sample consumers where tooling permits. The standalone Android Compose sample uses published artifacts: validate against matching local artifacts without permanently changing dependency resolution.
- Run `git diff --check` and audit for stale `SdkLog`, `Log.emit`, public `Log.Level`, old config flags, injected sinks and bypassing Android platform calls. Confirm sample settings match their previous behavior.
- Verify neither engine retains a local debug flag and all existing inspection/embedded-config uses read the companion directly. Run Android/iOS compilation and the remaining engine/handler tests.
- Keep the full native two-engine/custom-component/inspection matrix in [quickstart.md](quickstart.md) distinct from stdout tests and compilation.

## Documentation and Release Impact

Keep the shared debug-setting explanation in the core README and link to or reference it from the engine README, integration guides and skill. Retain platform-specific setup examples and console mappings, and recommend setting the flag before SDK creation without promising synchronized runtime reconfiguration. Record the breaking Kotlin/Swift migration in the PR and commit history, then in the next release notes; do not add migration notes to the how-to guides, edit historical release notes or invent a version.

## Post-Design Constitution Check

All six gates pass with the source-set boundaries and compatibility notes above. No new dependency, logger hierarchy, mutable test sink, JavaScript change or unresolved clarification is needed. Implementation is authorized by the user's request; leave all changes uncommitted.
