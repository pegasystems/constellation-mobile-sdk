# Implementation Plan: Engine Lifecycle Race Fix

**Branch**: `001-engine-lifecycle-race-fix` | **Date**: 2026-10-15 | **Spec**: `specs/001-engine-lifecycle-race-fix/spec.md`

## Technical Context

- **Language/runtime**: Kotlin 2.4.0, JavaScript where applicable, JDK 17+
- **Build**: Gradle 9.4.0 via `./gradlew`
- **Architecture**: Kotlin Multiplatform with `commonMain`, Android, iOS, and JVM targets
- **Affected modules**: `core`, `engine-webview`, and existing integration tests
- **Testing**: common SDK regression tests, Android lifecycle/callback tests where supported, iOS callback tests where supported, and targeted Gradle verification
- **Dependencies**: None

## Constitution Check

- [x] Specification scenarios are independently testable.
- [x] Module and source-set boundaries are preserved.
- [x] Public API and compatibility impact are documented.
- [x] Verification covers affected platforms and failure paths.
- [x] Authentication, secrets, and diagnostic data remain safe.
- [x] Documentation and release impact are addressed.

## Repository Analysis

### Relevant Existing Files

- `core/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/core/ConstellationSdkEngine.kt`: Existing public terminal `destroy()` contract.
- `core/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/core/internal/ConstellationSdkImpl.kt`: Shared SDK event bridge; currently has no lifecycle invalidation of its engine callback.
- `engine-webview/src/androidMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/android/AndroidWebViewEngine.kt`: Android WebView ownership, asynchronous initialization, bridge callbacks, and externally scoped event delivery.
- `engine-webview/src/androidMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/android/internal/SdkWebViewClient.kt`: Stores the page-load callback that can fire after destruction.
- `engine-webview/src/iosMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/ios/WKWebViewBasedEngine.kt`: iOS scope cancellation and delegate teardown.
- `engine-webview/src/iosMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/ios/FormHandler.kt`: iOS script-message handling with nullable teardown state and unsafe non-null assertions.
- `test/src/commonTest/kotlin/com/pega/constellation/sdk/kmp/test/ConstellationSdkBaseTest.kt`: Existing end-to-end engine destroy coverage and common test conventions.
- `engine-webview/src/jvmTest/...`: Existing engine-module test source set; useful for pure callback/guard logic that can be isolated from platform UI objects.

### Current Behavior

`destroy()` clears platform resources, but asynchronous callbacks retain paths into the engine. Android retains a page-load callback in `SdkWebViewClient`, uses `requireNotNull(webView)` in delayed initialization and event delivery, and launches event delivery in a caller-owned scope that is not cancelled by teardown. iOS cancels its main scope and clears handlers/managers, but `FormHandler` uses `requireNotNull` after those values can be cleared. The shared SDK callback also remains attached to the engine after teardown.

## Proposed Design

Introduce an internal active/destroyed lifecycle guard at each asynchronous boundary, without adding a new public API. Mark the engine inactive before beginning teardown, clear Android page-load and bridge callback routes, close/cancel owned asynchronous resources, and make delayed Android work re-check activity before touching the WebView or handler. Use a lifecycle-aware child job for Android event delivery so queued work can be cancelled by `destroy()` while retaining the caller-provided scope as the parent. Make iOS `FormHandler` treat absent `eventHandler` or `componentManager` as a late callback and return safely; also ensure iOS delegate callbacks check the active state before injecting or emitting.

In `ConstellationSdkImpl`, invalidate its event callback on destruction only if the shared SDK lifecycle is explicitly extended by the existing engine contract; otherwise keep the change limited to engine-owned paths and ensure the engine cannot emit after teardown. Avoid broad exception catches and preserve existing error events for active initialization failures.

## API and Compatibility

- Public API changes: None.
- Behavior changes: `destroy()` becomes terminal and late callbacks become safe no-ops.
- Migration or release notes: Document the strengthened lifecycle guarantee in the relevant engine README or release notes if the repository’s release process requires it.

## Test Strategy

| Scenario | Test type | Location or command | Expected result |
| --- | --- | --- | --- |
| Destroy during common SDK initialization | common unit/integration | `test/src/commonTest/.../ConstellationSdkBaseTest.kt` or focused fake-engine test | No post-destroy event or crash |
| Android page-load/evaluate callback after destroy | Android unit/device or focused callback test | `engine-webview/src/android...` and targeted Gradle task | Callback exits without WebView access |
| Android queued component event after destroy | Android coroutine test | `engine-webview/src/android...` | No JavaScript evaluation after teardown |
| iOS script/form callback after destroy | iOS native test or focused handler test | `engine-webview/src/ios...` | Late message is ignored without exception |
| Existing active lifecycle | existing common/integration suite | `./gradlew :test:allTests` or module-equivalent task | Existing initialization and event behavior remains green |

## Documentation Plan

- [x] Update the relevant engine lifecycle documentation if the strengthened terminal guarantee is not already stated.
- [ ] Add or update an integration example if public behavior changes.
- [ ] Add release documentation when the change affects a published artifact.

## Risks and Alternatives

- **Risk**: Platform callbacks may race with the destroyed flag on different threads. Mitigation: perform state checks at every callback boundary and keep teardown on the documented main thread where required.
- **Risk**: Cancelling caller-owned Android scopes would break host lifecycle ownership. Mitigation: use an engine-owned child job instead of cancelling the supplied scope.
- **Alternative considered**: Add `destroy()` to `ConstellationSdk`. Not selected because issue #155 asks to make the existing engine lifecycle terminal and adding a second public lifecycle boundary expands compatibility scope.
- **Alternative considered**: Catch `IllegalStateException` around `requireNotNull`. Not selected because it hides invalid lifecycle paths rather than preventing them.
