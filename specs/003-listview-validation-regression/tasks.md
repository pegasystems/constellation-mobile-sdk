# Tasks: ListView Validation and Data Reference Regression

**Input**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md),
[data-model.md](data-model.md), and [branch contracts](contracts/branch-contracts.md)

These are retrospective tasks. Checked items describe work present in the branch,
not proof that its acceptance tests have passed. Unchecked items are remaining
verification or documentation work, not authorization to change production behavior.

## Phase 1: Setup

- [x] T001 Identify branch scope and existing feature artifacts in `.github/current_context.md` and `specs/002-data-reference-single-record/spec.md`.
- [x] T002 Record branch requirements and compatibility boundaries in `specs/003-listview-validation-regression/spec.md` and `specs/003-listview-validation-regression/contracts/branch-contracts.md`.

## Phase 2: Foundational Work

- [x] T003 Preserve version-specific fixture routing and shared legacy handling in `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/`.
- [x] T004 Share property-error clearing behavior between fields and ListView in `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/base.component.js`.

## Phase 3: User Story 1 - Understand and correct table validation

**Goal**: Show required state and inline validation without losing unrelated errors.
**Independent test**: Submit an empty enabled required table, select a row, and
exercise validation-only updates with a suitable fixture.

- [x] T005 [US1] Pass validation messages to the ListView payload in `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/templates/simple-table-select.component.js`.
- [x] T006 [US1] Forward validation and avoid data reloads for validation-only updates in `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/templates/listview/list-view.component.js`.
- [x] T007 [US1] Parse validation and required state in `core/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/core/components/containers/ListViewComponent.kt`.
- [x] T008 [US1] Forward the properties and display the required label and helper text in `ui-renderer-cmp/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/ui/renderer/cmp/containers/ListViewRenderer.kt` and `ui-components-cmp/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/ui/components/cmp/controls/form/Table.kt`.
- [ ] T009 [US1] Add or extend a suitable existing Android scenario to verify required indication, inline errors, error clearing, and validation-only updates using `samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/`; use recorded or confirmed fixture data.
- [ ] T010 [US1] Run the focused scenario and record nonzero test counts and results in `specs/003-listview-validation-regression/quickstart.md`.

## Phase 4: User Story 2 - Recognize disabled table selection

**Goal**: Disable row and control selection and show disabled controls.
**Independent test**: Attempt row and control interaction in enabled and disabled
single- and multi-select tables, checking state and disabled appearance.

- [x] T011 [US2] Forward boolean required/disabled config in `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/templates/listview/list-view.component.js` and `core/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/core/components/containers/ListViewComponent.kt`.
- [x] T012 [US2] Disable row toggles and Material radio buttons/checkboxes in `ui-components-cmp/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/ui/components/cmp/controls/form/Table.kt`.
- [ ] T013 [US2] Add or extend a suitable existing Android scenario to verify disabled and enabled row/control interactions for both selection modes in `samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/`; use recorded or confirmed fixture data.
- [ ] T014 [US2] Run the focused scenario and visually inspect disabled controls; record platform, fixture, test count, and results in `specs/003-listview-validation-regression/quickstart.md`.

## Phase 5: User Story 3 - Distinguish banner message origins

**Goal**: Expose classified messages without hiding their text.
**Independent test**: Inspect and render field, page, and HTTP messages.

- [x] T015 [P] [US3] Emit classified messages from `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/flow-container.component.js` and `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/modal-view-container.component.js`.
- [x] T016 [US3] Parse typed messages in `core/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/core/components/widgets/AlertBanner.kt`.
- [x] T017 [P] [US3] Display message text in `ui-renderer-cmp/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/ui/renderer/cmp/containers/AlertBannerRenderer.kt` and `samples/swiftui-components-app/swiftui-components-app/SDKSupport/UI/AlertBannerView.swift`.
- [x] T018 [US3] Assert a field-message classification in `test/src/androidDeviceTest/kotlin/com/pega/constellation/sdk/kmp/test/ConstellationSdk25Test.kt`.
- [ ] T019 [US3] Verify field, page, and HTTP message classifications and visible text with suitable existing scenarios or confirmed fixtures in `test/src/androidDeviceTest/kotlin/com/pega/constellation/sdk/kmp/test/` and record results in `specs/003-listview-validation-regression/quickstart.md`.

## Phase 6: User Story 4 - Preserve data-reference behavior and regression coverage

**Goal**: Maintain reference selection and isolated versioned regression scenarios.
**Independent test**: Run the recorded Pega 26.1 single- and list-of-records journeys
and check that version-specific routes do not fall back across versions.

- [x] T020 [P] [US4] Preserve nested display paths, composite keys, and supported reference handling in `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/object-reference-utils.js` and `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/object-reference.component.js`.
- [x] T021 [P] [US4] Remove the immediate list update after multiselect insertion in `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/fields/multiselect.component.js`.
- [x] T022 [US4] Cover the recorded single-record and list-of-records journeys in `samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/pega26/`.
- [x] T023 [US4] Organize SDK scenarios by version in `test/src/androidDeviceTest/kotlin/com/pega/constellation/sdk/kmp/test/` and sample scenarios in `samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/`.
- [ ] T024 [US4] Run both Pega 26.1 scenarios and the Pega 24/25 SDK classes using `specs/003-listview-validation-regression/quickstart.md`; record counts and results there.
- [ ] T025 [US4] Verify incompatible-version fixture requests fail explicitly using existing SDK or sample scenarios under `test/src/androidDeviceTest/` or `samples/android-cmp-app/src/androidInstrumentedTest/`; record the evidence in `specs/003-listview-validation-regression/quickstart.md`.

## Phase 7: Polish and Cross-Cutting Concerns

- [ ] T026 Document `Table`, `Label`, and typed banner API compatibility and migration in `ui-components-cmp/README.md`, `core/README.md`, and the appropriate `docs/releases/` page.
- [ ] T027 Re-run JVM compilation against the current tree and record the command and result in `specs/003-listview-validation-regression/quickstart.md`.
- [ ] T028 Verify applicable iOS CMP table and SwiftUI banner behavior or record the precise limitation in `specs/003-listview-validation-regression/quickstart.md`.
- [ ] T029 Review the completed artifacts and `git diff --check` against `specs/003-listview-validation-regression/spec.md`, preserving the existing support matrix.
- [x] T030 [US1] [US2] Add the recorded Pega 26.1 required/disabled table journey in `samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/pega26/DataReferenceTableConfigTest.kt` with versioned fixtures and request validation.
- [x] T031 [US1] [US2] Run the recorded journey and related data-reference scenarios; record results and remaining coverage gaps in `specs/003-listview-validation-regression/quickstart.md`.

## Dependencies and Parallel Work

T001 and T002 establish the retrospective scope. T003 and T004 are independent.
US1 depends on T004; US2 shares ListView props with US1 but its UI checks are
independently executable. US3 is independent of the table stories. US4 depends on
T003. Once fixtures are available, US1, US2, US3, and US4 verification can run in
parallel on separate devices or in separate test runs. T026 can proceed independently;
T029 follows documentation and recorded verification.

## Implementation Strategy

The smallest useful increment is US1's required-table validation. US2 adds selection
protection, US3 covers typed banner messages, and US4 preserves earlier branch-wide
regressions. Do not mark scenario or platform verification complete from compilation,
an empty test selection, or historic results alone.
