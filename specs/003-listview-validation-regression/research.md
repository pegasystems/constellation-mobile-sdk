# Research: ListView Validation and Data Reference Regression

## Retrospective scope

**Decision**: Capture all branch changes at feature level while linking existing
ObjectReference and single-record specifications for their detailed coverage.
**Rationale**: The branch includes both BUG-1033404 and earlier T-50902 commits.
**Alternatives considered**: Describing only the latest two commits would omit
branch work; duplicating older specs would create conflicting sources of truth.

## Validation and disabled controls

**Decision**: Forward the configuration flags and validation text to the table;
disable both row interaction and Material selection controls.
**Rationale**: Disabling only one interaction path leaves the other selectable.
**Alternatives considered**: Dimming the complete table; this branch dims selection
controls through Material defaults and does not change table cell colors.

## Banner messages

**Decision**: Carry message text with an `isFieldMessage` flag; existing banner
renderers display the text without filtering.
**Rationale**: Consumers can identify field messages while preserving visible feedback.
**Alternatives considered**: Keeping strings alone cannot convey classification.

## Recorded test isolation

**Decision**: Delegate versioned cases, assignments, and data views to matching
handlers while retaining explicitly shared legacy routes.
**Rationale**: A different version's recorded response must not mask a missing fixture.
**Alternatives considered**: Cross-version fallback was rejected because it can
produce a false-positive regression run.

## Verification limitations

**Decision**: Treat previously executed Node forwarding checks and JVM compiles as
partial evidence, not proof of disabled UI or all branch scenarios.
**Rationale**: UI and WebView behavior require scenario execution and visual inspection.
**Alternatives considered**: Inferring runtime behavior from compilation alone is insufficient.
