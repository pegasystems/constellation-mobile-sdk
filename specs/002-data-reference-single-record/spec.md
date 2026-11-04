# Feature Specification: Data Reference Single Record Regression

**Feature Branch**: `feature/pelcm/T-50902-data-case-ref-tests-26-1`
**Created**: 2026-10-27
**Status**: Implemented and verified on Android
**Input**: Add the user-provided six-step single-record data-reference scenario using the supplied HAR and Spec Kit.

## Summary

Protect single-record car selection across all six recorded presentations so maintainers can detect rendering and selection regressions.

## Scope

### In Scope

- One Android sample regression scenario for the confirmed Pega 26.1 recording.
- Recorded options, table columns and rows, selected row/card details, transitions, and submitted selections.
- Deterministic recorded responses with operator identity normalized to the existing test identity.

### Out of Scope

- Production rendering changes, other Pega versions, new runtime dependencies, and iOS acceptance coverage.

## User Scenarios & Testing

### User Story 1 - Select a car across six presentations (Priority: P1)

A user starts New Service and chooses cars through Combobox, Dropdown, Table, Simple Table, Cards, and Readonly.

**Why this priority**: This is the complete requested regression journey.

**Independent Test**: Run the single scenario against recorded responses, without a live Pega environment.

**Acceptance Scenarios**:

1. **Given** New Service, **When** opening Combobox, **Then** all five recorded models are offered and C-Class can be selected.
2. **Given** Dropdown, **When** inspecting the field, **Then** its label and C-Class are displayed; all five models are offered and A4 can be selected.
3. **Given** Table, **When** inspecting the selection, **Then** A4 is initially selected, all recorded columns/models exist, and selecting 3 Series exposes its recorded details.
4. **Given** Simple Table, **When** inspecting the selection, **Then** 3 Series is selected, all recorded columns/models exist, and selecting Golf exposes its recorded details.
5. **Given** Cards, **When** inspecting the cards, **Then** all five models exist, Golf is selected, and selecting Camry exposes its recorded card details.
6. **Given** Readonly, **When** inspecting the field, **Then** Data reference single record displays Camry.
7. **Given** any creation/submission, **When** the response arrives, **Then** the current step title is verified; every submitted selection matches the recording.

## Functional Requirements

- **FR-001**: Verify all six titles and all five recorded model options at each applicable presentation.
- **FR-002**: Verify selections before and after each requested change, not just model text presence.
- **FR-003**: Verify every recorded column and selected row/card field, scoped to the selected item where necessary.
- **FR-004**: Reject incorrect selection payloads for all five submissions and the recorded dropdown refresh requests.
- **FR-005**: Serve scenario responses only for their recorded version, case type, assignment, and action.
- **FR-006**: Source assertions and responses from the supplied recording; do not invent missing data.

## Non-Functional Requirements

- **NFR-001 Compatibility**: Reuse the existing 26.1 profile and preserve other fixtures and routes.
- **NFR-002 Security**: Do not retain HAR credentials or headers; normalize operator names to the checked-in bootstrap identity.
- **NFR-003 Performance**: Reuse existing bounded Compose waits and retry lifecycle.
- **NFR-004 Platforms**: UI coverage is Android-only; mock routing remains in the shared test source set.

## Affected Areas

- Modules: Android CMP sample and shared test infrastructure.
- Source sets: `androidInstrumentedTest` and `commonMain`.
- Public APIs: None. New recorded mock resources only.

## Success Criteria

- **SC-001**: The scenario reaches all six steps with the specified choices and final Camry display.
- **SC-002**: All five submission payloads match the recorded car identifiers and empty page instructions.
- **SC-003**: Every applicable option, column, selected row, and card detail has an explicit assertion.
- **SC-004**: The selected Android scenario passes with at least one test executed; unavailable device execution is reported as incomplete verification.

## Assumptions and Open Questions

- User confirmed 26.1, correcting the initial 16.1.
- User confirmed A4, not C-Class, as the initial Table selection after Dropdown submits A4.
- Existing Pega 26.1 bootstrap and CDN profile are reused; this does not introduce a major or minor version.
- The supplied `data_reference_single_record_test_2.har` is the authoritative recording.
