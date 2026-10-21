# Feature Specification: Engine Lifecycle Race Fix

**Feature Branch**: `001-engine-lifecycle-race-fix`
**Created**: 2026-10-15
**Status**: Draft
**Input**: BUG-1009978 and GitHub issue #155, “ConstellationSdkEngine lifecycle management (vol 2)”

## Summary

Make SDK engine teardown terminal and safe across asynchronous initialization and WebView callbacks. Applications must be able to destroy an engine while initialization is still pending without receiving stale events, continuing initialization, or crashing because teardown cleared state used by a late callback.

## Scope

### In Scope

- Invalidate pending initialization work when an engine is destroyed.
- Prevent Android callbacks and externally scoped event-delivery work from operating after destruction.
- Ignore late iOS script messages and form callbacks after teardown instead of dereferencing cleared state.
- Preserve existing successful initialization and event-delivery behavior before destruction.
- Add focused regression coverage for destruction during initialization and late callback delivery.

### Out of Scope

- Adding new pause, resume, or WebView state persistence APIs.
- Changing the public lifecycle model of `ConstellationSdk` beyond the existing engine `destroy()` contract.
- Refactoring unrelated WebView loading, bridge, or component behavior.

## User Scenarios & Testing

### User Story 1 – Destroy during initialization (Priority: P1)

As an application integrator, I can destroy an engine while its initial page or bridge setup is still loading so that the old engine stops work deterministically and cannot emit events after teardown.

**Why this priority**: This is the failure path reported by BUG-1009978 and issue #155 and can cause crashes, stale UI updates, or leaked work.

**Independent Test**: Start initialization with a delayed page load, destroy the engine before completion, then release the delayed callback and verify no initialization step, event, or crash occurs.

**Acceptance Scenarios**:

1. **Given** an engine has started initialization, **when** `destroy()` is called before initialization completes, **then** subsequent initialization callbacks are ignored and no engine event is emitted.
2. **Given** an Android page-load callback arrives after `destroy()`, **when** the callback attempts to continue initialization, **then** it exits safely without accessing a cleared WebView.
3. **Given** an event-delivery coroutine was queued before `destroy()`, **when** it runs after `destroy()`, **then** it does not deliver an event from the destroyed engine.

### User Story 2 – Late platform callback safety (Priority: P1)

As an application integrator, I can tear down an engine while platform callbacks are in flight so that late Android or iOS callbacks do not crash the application.

**Why this priority**: Platform callback timing cannot always be controlled by the application, so teardown must remain safe under ordinary lifecycle races.

**Independent Test**: Deliver representative late Android and iOS callbacks after teardown and verify they are ignored without exceptions.

**Acceptance Scenarios**:

1. **Given** an iOS engine has removed its event handler or component manager during destruction, **when** a stale form or script message arrives, **then** the message is ignored safely.
2. **Given** an engine has already been destroyed, **when** any supported late callback arrives, **then** no state is recreated and no callback is forwarded to application code.

### User Story 3 – Preserve normal lifecycle behavior (Priority: P2)

As an application integrator, I can continue using the engine normally before destruction, with initialization and component events behaving as they did previously.

**Why this priority**: The fix must not regress valid initialization or event flows.

**Independent Test**: Run existing engine initialization and event tests, plus targeted platform tests, without invoking destruction during the normal flow.

**Acceptance Scenarios**:

1. **Given** an engine is active, **when** initialization completes normally, **then** the engine remains usable and delivers expected events.
2. **Given** an active engine receives a component event before destruction, **when** the event is handled, **then** existing event behavior is preserved.

## Functional Requirements

- **FR-001**: Destruction MUST be terminal for the engine instance; no initialization or event-delivery path may resume work after destruction.
- **FR-002**: Pending asynchronous callbacks MUST verify that the engine is still active before accessing mutable engine or WebView state.
- **FR-003**: Android late page-load callbacks and queued event-delivery work MUST exit safely after destruction.
- **FR-004**: iOS late script and form callbacks MUST exit safely when teardown has cleared their handlers or managers.
- **FR-005**: The change MUST preserve initialization, bridge setup, and event behavior when destruction has not occurred.
- **FR-006**: Regression tests MUST cover destruction during initialization, late platform callbacks, and prevention of post-destroy event delivery.
- **FR-007**: Failures MUST not be hidden by broad exception handling or success-shaped fallback behavior.

## Non-Functional Requirements

- **NFR-001 Compatibility**: Existing public engine APIs and successful lifecycle behavior remain source- and binary-compatible unless the implementation requires no public API change.
- **NFR-002 Security**: No authentication tokens, customer data, or callback payloads may be added to logs or test fixtures.
- **NFR-003 Performance**: Lifecycle guards must be constant-time checks and must not add blocking work to callback paths.
- **NFR-004 Platforms**: Shared lifecycle state remains in the appropriate common code; Android and iOS callback safeguards remain in their platform source sets.

## Affected Areas

- Modules: `core`, `engine-webview`, and existing test sources.
- Source sets: `core/commonMain`, `engine-webview/androidMain`, `engine-webview/iosMain`, and corresponding test source sets.
- Public APIs or resources: Existing `ConstellationSdkEngine.destroy()` behavior is strengthened; no new public API is required by this specification.

## Success Criteria

- **SC-001**: 100% of targeted destruction-during-initialization tests complete without crashes and produce zero post-destroy engine events.
- **SC-002**: Late Android and iOS callback regression tests demonstrate safe no-op behavior after teardown.
- **SC-003**: Existing relevant engine and SDK tests pass without changes to normal active-engine behavior.
- **SC-004**: The implementation does not require callers to coordinate or cancel platform callbacks manually.

## Assumptions and Open Questions

- BUG-1009978 refers to the lifecycle race described in GitHub issue #155; the Agile Studio data lookup returned no matching record.
- The existing `destroy()` methods remain the lifecycle boundary; adding `ConstellationSdk.destroy()` is outside this fix.
- Tests may use deterministic fake or mocked callbacks rather than timing-sensitive sleeps.
