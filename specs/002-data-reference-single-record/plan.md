# Implementation Plan: Data Reference Single Record Regression

**Branch**: `feature/pelcm/T-50902-data-case-ref-tests-26-1` | **Date**: 2026-10-27 | **Spec**: [spec.md](spec.md)

## Technical Context

- **Language/runtime**: Kotlin 2.4.0, JavaScript where applicable, JDK 17+
- **Build**: Gradle 9.4.0 via `./gradlew`
- **Architecture**: Kotlin Multiplatform with `commonMain`, Android, iOS, and JVM targets
- **Affected modules**: `test/commonMain`, `samples/android-cmp-app/androidInstrumentedTest`
- **Testing**: One connected Android Compose scenario, fixture provenance and payload checks
- **Dependencies**: None; existing Pega 26.1 CDN assets and bootstrap

## Constitution Check

- [x] Specification scenarios are independently testable as one complete journey.
- [x] Module and source-set boundaries are preserved.
- [x] No production API changes.
- [x] Android scenario and malformed submission paths are covered by explicit assertions/errors.
- [x] Extract response bodies only; normalize operator identity; do not copy credentials.
- [x] Document fixture provenance and execution; no published behavior changes or release notes needed.

## Repository Analysis

### Relevant Existing Files

- `samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/ComposeTest.kt`: setup, retries, and captured request bodies.
- Adjacent `pega24/DataReferenceSingleRecordTest.kt` and `pega25/DataReferenceCardsTest.kt`: prior UI assertions.
- `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/pega26/`: version delegates.
- `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/DxDataViewsHandler.kt`: data-page routing.

### Current Behavior

PegaVersion.v26_1 already maps to dx/26.1 and cdn/26.1. No single-record six-presentation regression exists for that profile. Table and SimpleTable share native table rendering; selection uses toggleable rows. Cards use selected radio-button containers.

## Proposed Design

Extract the creation, refresh, submission, and D_CarList response bodies from the HAR with bootstrap operator replacement. Keep filenames under dx/26.1 with the requested class/scenario/step convention. Register the recorded case type and exact assignment/action routes in pega26 delegates. Validate complete submission JSON before returning the next fixture. Route D_CarList by version and recorded requested field projection so dropdown and table datasets stay faithful.

Add DataReferenceSingleRecordTest in test.pega26, using @PegaCase and runAndroidTest. Scope dropdown assertions to the clickable field and popup; scope table selection and values to row layout positions because DataTable exposes sibling cells with measurement-only copies. Scroll all columns and selected cells into view. Scope card details to radio-button containers. Assert the complete request body after every Next, in addition to validating it in the handler. Reuse shared Compose waits, retries, and asset helpers.

The recording also requires case GET requests for available actions and post-submission summaries. Add a default-null GET hook to the internal version delegate and keep dispatch shared. Pega 26.1 serves the recorded case's actions and replays its five summary responses in trace order using an instance-local queue; a fresh interceptor resets this queue for each test attempt. Extra summary requests fail explicitly.

## API and Compatibility

- Public API changes: None.
- Behavior changes: Test routes only; other versions retain missing-response errors for the new scenario.
- Migration or release notes: None.

## Test Strategy

Inspect the retained tests before naming suites or commands. For versioned mock scenarios,
record the exact `PegaVersion`, fixture directory, handler delegate, and test package/class.
Distinguish sample Compose lifecycle retries from SDK rule body retries and Android coverage
from iOS acceptance. Honor feature-specific restrictions on new test harnesses.

| Scenario | Test type | Location or command | Expected result |
| --- | --- | --- | --- |
| Six-step car selection | Android sample | `./gradlew :samples:android-cmp-app:connectedDebugAndroidTest -Pandroid.testInstrumentationRunnerArguments.class=com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26.DataReferenceSingleRecordTest` | At least one scenario executed and passed |
| Compilation if device unavailable | Android compile | `./gradlew :samples:android-cmp-app:compileDebugAndroidTestKotlinAndroid` | Test and mock changes compile |
| Recorded fixture integrity | Local inspection | Compare extracted bodies with HAR after identity normalization | Correct current titles, projections, and reference GUIDs |

## Documentation Plan

- Update the sample test README with the focused scenario command and fixture provenance.
- Keep execution instructions in quickstart.md.
- No production integration examples or release changes required.

## Risks and Alternatives

- **Risk**: Horizontal table scrolling and duplicate text require row-scoped unmerged semantics.
- **Risk**: Formatting must follow actual renderer behavior rather than raw numeric/date strings; inspect formatting code and exercise the device scenario.
- **Alternative considered**: Production changes and invented selection data are excluded; trace contradictions were clarified with the user.
