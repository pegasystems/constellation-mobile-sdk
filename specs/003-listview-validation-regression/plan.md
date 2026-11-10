# Implementation Plan: ListView Validation and Data Reference Regression

**Branch**: `bugfix/pelcm/BUG-listview-validatemessage` | **Date**: 2026-11-02 | **Spec**: [spec.md](spec.md)

## Summary

Retrospectively document the branch's selectable-table validation, required and
disabled state, typed alert messages, reference fixes, and versioned regression
infrastructure. Existing feature specifications remain authoritative for their
own scope; this plan records the branch-specific integration and outstanding checks.

## Technical Context

**Language/Version**: Kotlin Multiplatform, JavaScript ES modules, Swift; Gradle 9.4.0, Kotlin 2.4.0
**Primary Dependencies**: Compose Multiplatform, Material 3, Pega Constellation WebView bridge
**Storage**: Checked-in versioned JSON response fixtures and local CDN assets
**Testing**: Gradle JVM compilation; Android device SDK and CMP instrumented scenarios
**Target Platform**: Android and iOS SDK; JVM Compose compilation; SwiftUI sample banner
**Project Type**: Multiplatform SDK and samples
**Performance Goals**: Validation-only updates do not trigger a table data reload
**Constraints**: Preserve source-set boundaries, existing supported versions and fixture isolation
**Scale/Scope**: Branch diff from `master` through `137e831f`, including test infrastructure

## Constitution Check

- Specification and design are being created retrospectively; implementation preceded
  this documentation. Record this deviation rather than claiming prior approval.
- Shared logic remains in existing KMP and WebView source sets; SwiftUI uses its own renderer.
- Public `AlertBannerComponent.messages`, `Table`, and `Label` signatures require migration
  documentation and recompilation as applicable.
- Existing scenario tests verify test infrastructure; do not create tests of test helpers.
- Android selection/validation runtime coverage, iOS behavior, and final documentation
  checks remain open until actually run and recorded.
- No new credentials, customer data, dependencies, or GitHub Actions changes are required.

**Post-design gate**: Design preserves module boundaries. Verification and public API
documentation are open work, not assumed complete.

## Repository Analysis

### Relevant Existing Files

- `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/templates/`:
  ListView and SimpleTableSelect bridge.
- `core/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/core/components/`:
  ListView and typed AlertBanner state.
- `ui-components-cmp/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/ui/components/cmp/controls/form/`:
  table, label, and helper presentation.
- `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/`:
  versioned dispatch and recorded fixtures.

### Current Behavior

Branch implementations are present. The selection controls use Material disabled
colors; the table label itself is explicitly passed `disabled = false`. Earlier
single-record regression verification does not establish verification of later edits.

## Proposed Design

Resolve flags and validation in the bridge, publish observable ListView state, and
forward it to the Compose table. Gate both row and control interactions when disabled.
Preserve message text with an explicit field classification through Kotlin and both
existing banner renderers. Reuse version-specific handlers and recorded scenarios.

## API and Compatibility

- `AlertBannerComponent.messages` now contains typed messages rather than strings.
- `Table` requires new flags and validation text; `Label` accepts an optional font weight.
- Consumers must update affected calls as applicable and rebuild compiled libraries.
  Relevant integration and release documentation still needs updating.

## Test Strategy

| Scenario | Type | Location or command | Expected result |
| --- | --- | --- | --- |
| Table state and interaction | Android UI and visual | `pega26/DataReferenceTableConfigTest`, using the supplied Pega 26.1 HAR | Recorded row selection, required indicators, inline validation, and submissions match; other control and visual checks remain open |
| Recorded references | Android UI | Pega `v26_1`, `dx/26.1/`, `pega26/` delegates and sample tests in [quickstart.md](quickstart.md) | Nonzero passing runs and matching recorded selections/submissions |
| Banner and version routing | Android SDK | `ConstellationSdk24Test` and `ConstellationSdk25Test` in [quickstart.md](quickstart.md) | Nonzero passing runs; extend coverage for missing cases |
| Shared code | JVM compile | Gradle commands in [quickstart.md](quickstart.md) | Successful compilation; not UI acceptance |
| CMP table and SwiftUI banner | iOS simulator | Applicable sample and confirmed fixtures | Verify behavior independently of Android |

Sample Compose retries recreate the environment; the SDK rule also resets its SDK
lifecycle between attempts. Follow the versioned fixture guide for CDN prerequisites.

## Documentation Plan

- Document changed public APIs and migration in module documentation.
- Record compatibility and release impact in the appropriate release documentation.
- Record exact scenario commands, test counts, platform, and unavailable checks.

## Risks and Alternatives

- **Risk**: Missing confirmed fixtures for disabled tables or HTTP banner messages
  prevent acceptance coverage. A Pega 26.1 disabled-table recording is now available;
  HTTP banner coverage still requires suitable evidence.
- **Alternative considered**: Compile-only verification was rejected because it
  cannot demonstrate UI interaction or message origin.

## Project Structure

### Documentation

```text
specs/003-listview-validation-regression/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── contracts/branch-contracts.md
├── quickstart.md
├── tasks.md
└── checklists/requirements.md
```

### Source Code

```text
engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/
core/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/core/components/
ui-components-cmp/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/ui/components/cmp/controls/form/
ui-renderer-cmp/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/ui/renderer/cmp/containers/
test/src/commonMain/                          # fixtures and versioned handlers
test/src/androidDeviceTest/                   # SDK/WebView scenarios
samples/android-cmp-app/src/androidInstrumentedTest/
samples/swiftui-components-app/               # SwiftUI banner adaptation
```

**Structure Decision**: Reuse the existing modules, test infrastructure, and
feature specifications; avoid creating new component or mock frameworks.

## Complexity Tracking

| Deviation | Why documented | Required follow-up |
|-----------|----------------|--------------------|
| Specification written after implementation | User requested artifacts for existing branch work | Review spec against actual intent and finish unchecked verification tasks |
