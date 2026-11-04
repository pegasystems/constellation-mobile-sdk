# Tasks: Data Reference Single Record Regression

**Input**: [spec.md](spec.md), [plan.md](plan.md), and [research.md](research.md)

## Phase 1: Setup

- [x] T001 Confirm Pega 26.1 and A4 Table selection in `specs/002-data-reference-single-record/research.md`; inspect the supplied HAR and existing test conventions.
- [x] T002 Check `test/src/commonMain/composeResources/files/responses/cdn/26.1/` and an Android device before runtime verification.

## Phase 2: Foundational Work

- [x] T003 Extract recorded response bodies into `test/src/commonMain/composeResources/files/responses/dx/26.1/{cases,assignments,data_views}/`, normalizing operators to the checked-in bootstrap identity and preserving scenario filename conventions.

## Phase 3: User Story 1 - Select a car across six presentations

**Goal**: Exercise all six presentations and verify every requested selection and submitted identifier.
**Independent test**: Run `com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26.DataReferenceSingleRecordTest`.

- [x] T004 [P] [US1] Register the recorded case type and GET actions/summary responses in `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/pega26/DxCases26Handler.kt`, with GET delegation in `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/{DxCasesHandler,VersionedDxHandler}.kt`.
- [x] T005 [P] [US1] Register exact assignment/actions and complete expected payload checks in `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/pega26/DxAssignments26Handler.kt`.
- [x] T006 [P] [US1] Register Pega 26.1 D_CarList projection-specific responses in `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/DxDataViewsHandler.kt`.
- [x] T007 [US1] Add six-step rendering/selection/detail assertions and all five captured-body checks in `samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/pega26/DataReferenceSingleRecordTest.kt`.

## Phase 4: Documentation and Validation

- [x] T008 Update `samples/android-cmp-app/README.md` and `test/src/commonMain/composeResources/files/responses/README.md` with the focused test command, recording provenance, and GET routing.
- [x] T009 Run `./gradlew :samples:android-cmp-app:connectedDebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26.DataReferenceSingleRecordTest`; record actual test counts/results in `specs/002-data-reference-single-record/quickstart.md`.
- [x] T010 Review `git diff --check` and the complete diff; verify extracted JSON bodies, identity replacement, routes, and scope.

## Dependencies and Parallel Work

T001 -> T003 -> T004/T005/T006 -> T007 -> T009. T002 precedes T009. T004, T005, and T006 touch separate files and can proceed independently after T003. T008 is independent of test implementation. T010 follows all edits and verification.

## Implementation Strategy

One story is the MVP: first preserve the recording, then wire isolated mocks, implement the complete Android journey, and exercise it on the connected emulator. Keep runtime verification incomplete unless a non-empty scenario selection passes.
