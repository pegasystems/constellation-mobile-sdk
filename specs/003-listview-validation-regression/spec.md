# Feature Specification: ListView Validation and Data Reference Regression

**Feature Branch**: `bugfix/pelcm/BUG-listview-validatemessage`
**Created**: 2026-11-02
**Status**: Retrospective specification; implementation present, verification incomplete
**Input**: Document the changes on this branch against `master`, including the ListView
validation and disabled-state changes and the earlier data-reference regression work.

## Summary

Make selectable-table validation and disabled state understandable to users, expose
banner message classification to integrators, and retain version-isolated regression
coverage for recorded data-reference journeys.

## Scope

### In Scope

- Selectable-table validation, required and disabled states, and banner classification.
- Branch-specific data-reference fixes, versioned fixtures, and regression scenarios.
- Public API compatibility, recorded verification, and links to earlier specifications.

### Out of Scope

- Expanding the published Pega or platform support matrix, introducing new reference
  presentations, or changing unrelated components.
- Treating test infrastructure as a separately tested product or adding CI workflows.

## User Scenarios & Testing

### User Story 1 - Understand and correct table validation (Priority: P1)

A user completing a form can identify a required selectable table, see its validation
message, and change an enabled selection without losing unrelated validation feedback.

**Why this priority**: Required selection must be understandable and correctable.

**Independent Test**: Exercise an enabled required table with an empty selection,
submit it, select a row, and observe the inline message and subsequent validation.

**Acceptance Scenarios**:

1. **Given** a required table, **When** it is displayed, **Then** its label shows a required indicator.
2. **Given** an enabled table with a validation message, **When** it is displayed,
   **Then** the message appears below the label.
3. **Given** a selection change, **When** the platform still supplies a validation
   message for the property, **Then** the selection change does not clear that error.
4. **Given** a selection change with no validation message, **When** the selection
   is updated, **Then** property errors may be cleared through the existing mechanism.
5. **Given** a validation-only update, **When** its message changes, **Then** the
   existing table data is not reloaded solely because of that change.
6. **Given** the Pega 26.1 recorded configuration case, **When** the user submits
   an empty single- or multi-select table and then selects Golf, **Then** the
   required indicator and errors appear and the inline error clears.

### User Story 2 - Recognize disabled table selection (Priority: P1)

A user sees that a disabled table cannot be edited and cannot change its selection
through either a row or its selection control.

**Why this priority**: Disabled form controls must not permit unintended changes.

**Independent Test**: Attempt selection by row and control in disabled single- and
multiple-selection tables, then repeat with enabled tables.

**Acceptance Scenarios**:

1. **Given** a disabled single-selection table, **When** the user attempts to select
   a row or its radio button, **Then** selection does not change and the radio button
   has a disabled appearance.
2. **Given** a disabled multiple-selection table, **When** the user attempts to
   toggle a row or checkbox, **Then** selection does not change and the checkbox
   has a disabled appearance.
3. **Given** an enabled table, **When** a row or selection control is activated,
   **Then** its existing single- or multiple-selection behavior is preserved.
4. **Given** a disabled table with a validation message, **When** it is displayed,
   **Then** the validation helper is suppressed under the existing helper-text rules.
5. **Given** the recorded disabled tables, **When** the user tries to change their
   selections, **Then** Golf remains selected and previously unselected rows remain unselected.

### User Story 3 - Distinguish banner message origins (Priority: P2)

An SDK integrator can distinguish field-validation messages from page and HTTP
messages while users continue to see the banner messages.

**Why this priority**: Consumers need message classification without losing feedback.

**Independent Test**: Inspect a banner containing field and non-field messages and
verify both their classifications and displayed text.

**Acceptance Scenarios**:

1. **Given** a field-validation message, **When** it is exposed to a consumer,
   **Then** it is identified as a field message.
2. **Given** a page or HTTP message, **When** it is exposed to a consumer,
   **Then** it is identified as a non-field message.
3. **Given** either kind of message, **When** an existing banner is rendered,
   **Then** its message text remains visible without filtering by classification.

### User Story 4 - Preserve data-reference behavior and regression coverage (Priority: P2)

A maintainer can exercise recorded data-reference journeys against the correct
Pega version and detect incorrect selections or submitted identities.

**Why this priority**: The branch includes recorded regression coverage and reference fixes.

**Independent Test**: Run the recorded single-record and list-of-records scenarios
and check that version-specific responses are served only for their matching version.

**Acceptance Scenarios**:

1. **Given** the recorded single-record journey, **When** a user proceeds through
   its six presentations, **Then** the recorded selections and submissions match.
2. **Given** the recorded list-of-records journey, **When** selections are added or
   removed, **Then** the recorded selections and submission bodies match the scenario.
3. **Given** a version-specific fixture, **When** a request belongs to a different
   version, **Then** it is not silently served that fixture.
4. **Given** supported reference metadata, **When** a reference is selected or
   displayed, **Then** its configured identity and display fields are respected.

### Edge Cases

- Missing or null validation text becomes empty; missing required or disabled
  configuration defaults to false at the bridge.
- A disabled selected row remains selected but cannot be changed through the UI.
- Composite-key references and nested display paths retain their existing handling.
- Shared legacy mock routes remain available; version-specific routes do not fall
  back across versions.
- The recorded list-of-records test defers the Discount assertion until Percentage
  rendering is supported and stops after readonly cards.
- In the recorded configuration scenario, the inline error clears after selection,
  while the field-error banner can remain visible; clearing the banner is not asserted.

## Requirements

### Functional Requirements

- **FR-001**: Show the required indicator and the current validation message for an
  enabled selectable table when supplied.
- **FR-002**: Preserve selection and data-loading behavior when validation alone changes.
- **FR-003**: Clear property errors after selection only when no validation message is supplied.
- **FR-004**: Prevent row and control selection changes while disabled for both selection modes.
- **FR-005**: Visually identify disabled radio buttons and checkboxes.
- **FR-006**: Classify field-validation messages separately from page and HTTP messages
  while retaining their displayed text.
- **FR-007**: Preserve recorded reference selection, display, and submitted identity behavior
  for the branch's supported scenarios.
- **FR-008**: Isolate version-specific mock scenarios and retain shared legacy routes.
- **FR-009**: Cover the six-presentation single-record and recorded list-of-records journeys
  with repeatable scenario checks; report incomplete platform verification explicitly.

## Non-Functional Requirements

- **NFR-001 Compatibility**: Document the changed banner, Table, and Label contracts
  and migration requirements; retain supported version boundaries.
- **NFR-002 Security**: Keep credentials, sensitive customer data, and tokens out
  of fixtures, diagnostics, and documentation.
- **NFR-003 Performance**: Validation-only updates do not reload table data.
- **NFR-004 Platforms**: Preserve shared and platform source-set boundaries; distinguish
  Android scenario coverage from iOS acceptance.

## Affected Areas

- Modules: `core`, `engine-webview`, `ui-components-cmp`, `ui-renderer-cmp`, `test`,
  Android CMP and SwiftUI samples.
- Source sets: shared `commonMain`, Android device/instrumented tests, SwiftUI sample.
- Public APIs: banner message element type, Compose `Table` arguments, and optional
  `Label` font weight; versioned recorded resources.

### Key Entities

- **Selectable table**: Label, required and disabled states, validation message,
  selection mode, rows, and current selection.
- **Banner message**: Display text and field/non-field classification.
- **Reference selection**: Selected record identity and configured display values.
- **Versioned scenario**: Pega version, recorded request/response, and expected selection.

## Success Criteria

### Measurable Outcomes

- **SC-001**: All five validation acceptance scenarios and all four disabled-table
  scenarios pass when exercised.
- **SC-002**: All three banner classification and display scenarios pass.
- **SC-003**: The recorded single-record scenario reaches all six presentations and
  validates its five submissions.
- **SC-004**: The list-of-records scenario verifies each recorded editable presentation
  and reaches readonly cards, with its documented Percentage assertion excluded.
- **SC-005**: Each version-specific request tested against an incompatible version
  fails explicitly rather than receiving another version's fixture.

## Assumptions and Open Questions

- This is a retrospective description of the branch, not authorization to expand support.
- Existing ObjectReference and single-record specs retain their original scope; see
  `specs/ENHANCEMENT-6263-object-reference/` and `specs/002-data-reference-single-record/`.
- The existing Pega support matrix and platform-specific limitations in `README.md` apply.
- Available recorded fixtures, compatible CDN assets, and an Android device are needed
  for WebView-backed scenario execution; no iOS acceptance result is implied.
