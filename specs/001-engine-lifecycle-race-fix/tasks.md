# Tasks: Engine Lifecycle Race Fix

**Input**: `specs/001-engine-lifecycle-race-fix/spec.md` and `plan.md`

## Format

`[ID] [P?] [Story] Description`

- `[P]` means the task can run in parallel with other tasks in the same phase.
- `[Story]` identifies the user story, for example `[US1]`.
- Every task includes an exact repository path or command.

## Dependencies

```text
T001 -> T002 -> T003
T003 -> T004, T005, T006
T004 -> T007
T005 -> T008
T006 -> T009
T007, T008, T009 -> T010
```

User story order: US1 (P1) establishes terminal teardown and is the MVP; US2 (P1) hardens platform callbacks in parallel after the shared lifecycle approach; US3 (P2) verifies preservation of normal behavior.

## Parallel Execution Examples

- After T003, T004 (Android) and T005 (iOS) can proceed in parallel because they modify separate platform source sets.
- After the corresponding implementation tasks, T007 (Android tests), T008 (iOS tests), and T009 (common regression tests) can proceed in parallel.

## Phase 1: Setup

- [ ] T001 [P] Confirm the lifecycle contract and affected source sets in `specs/001-engine-lifecycle-race-fix/plan.md` and `specs/001-engine-lifecycle-race-fix/contracts/engine-lifecycle.md`.
- [ ] T002 [P] Inspect existing Gradle test targets and choose the narrowest runnable commands in `engine-webview/build.gradle.kts`, `test/build.gradle.kts`, and `gradlew`.

## Phase 2: Foundational Work

- [ ] T003 Define the internal active-to-destroyed lifecycle guard and callback invalidation approach in `core/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/core/internal/ConstellationSdkImpl.kt` and the affected engine implementations, without adding a new public API.

## Phase 3: User Story 1 – Destroy During Initialization

**Goal**: Destruction is terminal and delayed initialization cannot emit events or access cleared resources.

**Independent Test**: Destroy an engine while initialization is pending, release pending callbacks, and observe no post-destroy event or crash.

- [ ] T004 [US1] Make Android initialization and event-delivery paths stop after destruction in `engine-webview/src/androidMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/android/AndroidWebViewEngine.kt`, including engine-owned cancellation for queued component events.
- [ ] T005 [US1] Make iOS initialization and event-stream collection stop after destruction in `engine-webview/src/iosMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/ios/WKWebViewBasedEngine.kt`.
- [ ] T006 [P] [US1] Add a deterministic common regression test for destruction during pending engine initialization in `test/src/commonTest/kotlin/com/pega/constellation/sdk/kmp/test/ConstellationSdkBaseTest.kt` or a focused common test fixture.

## Phase 4: User Story 2 – Late Platform Callback Safety

**Goal**: Late Android page-load/bridge callbacks and iOS form/script messages are safe no-ops after teardown.

**Independent Test**: Invoke representative late callbacks after teardown and verify no exception, state recreation, or event delivery.

- [ ] T007 [US2] Clear and guard the Android page-load callback route in `engine-webview/src/androidMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/android/internal/SdkWebViewClient.kt` and `engine-webview/src/androidMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/android/AndroidWebViewEngine.kt`.
- [ ] T008 [US2] Replace unsafe post-teardown non-null assertions with safe late-message handling in `engine-webview/src/iosMain/kotlin/com/pega/constellation/sdk/kmp/engine/webview/ios/FormHandler.kt`, while preserving active message validation.
- [ ] T009 [P] [US2] Add focused callback regression coverage in `engine-webview/src/jvmTest` where behavior can be isolated, and platform-specific test coverage in the applicable Android/iOS test source sets for late callbacks.

## Phase 5: User Story 3 – Preserve Normal Lifecycle Behavior

**Goal**: Existing active initialization, bridge setup, and event delivery remain unchanged.

**Independent Test**: Run the existing SDK integration suite without destroying during the active flow and verify the existing states and component behavior.

- [ ] T010 [US3] Extend or preserve active lifecycle assertions in `test/src/commonTest/kotlin/com/pega/constellation/sdk/kmp/test/ConstellationSdkBaseTest.kt`, including normal initialization, ready state, component events, repeated destroy safety, and no post-destroy state changes.

## Phase 6: Documentation and Validation

- [ ] T011 [P] Update lifecycle guidance in `core/README.md` or `engine-webview/README.md` to state that `ConstellationSdkEngine.destroy()` is terminal and late callbacks are ignored safely.
- [ ] T012 Run `./gradlew :test:allTests :engine-webview:jvmTest` and the available platform-specific engine tests; record any unavailable Android/iOS checks.
- [ ] T013 Review the complete diff for scope, source-set boundaries, compatibility, secrets, and generated files with `git diff --check` and `git status --short`.

## Implementation Strategy

1. MVP: complete T003, T004, T005, and T006 so destruction during initialization is terminal and tested.
2. Harden platform callback edges with T007–T009.
3. Confirm normal behavior and documentation with T010–T013.
