# Feature Specification: ENHANCEMENT-6263 ObjectReference Support

**Feature Branch**: `feature/mloct/ENHANCEMENT-6263-data-reference` (existing branch at specification creation)
**Feature Directory**: `specs/ENHANCEMENT-6263-object-reference`
**Created**: 2026-10-12
**Status**: Draft — specification quality validation complete; ready for planning
**Input**: The agreed ObjectReference implementation proposal and user clarifications, preserved in [specify-input.md](specify-input.md).

## Summary

Enable mobile users to select and display references to existing Pega data records or cases through ObjectReference. The primary outcome is a repeatable, working demonstration in both Android and iOS CMP sample apps, including correct selection, submission, parameter-dependent options, and persisted read-only results.

The Android native Jetpack Compose sample must also work with the delivered SDK. Native SwiftUI support is deliberately limited to the ObjectReference wrapper and presentations renderable using that sample's existing child components; this feature does not expand its component library.

## Scope

### In Scope

- ObjectReference support based on current `master`, using PR #48 commit `ddd58848a9d9d63861c33e9b7979884a41b1b8bc` as a draft reference.
- Selection and display of existing case and data references.
- Single-record Autocomplete, Dropdown, Cards, and Table/SimpleTable presentations, and multiple-record Combobox/multi-select, Checkbox Group, Cards, and Table/SimpleTable presentations where the platform supplies valid metadata for those combinations.
- Read-only and display-only presentations, including preservation of configured read-only Cards and tables.
- Required validation, visibility, disabled/read-only behavior, preselected values, parameter-dependent options, selection identity, and refresh of dependent values where required.
- Android CMP and iOS CMP as the primary supported and demo platforms; Android native Jetpack Compose integration verification.
- Native SwiftUI wrapper integration and a minimal editable Dropdown example using existing views, with explicit documentation of unsupported child presentations.
- Representative sanitized test responses, documented provenance, regression verification, and a reproducible demo guide.
- Pega 24, 25, and 26 compatibility, with feature availability assessed separately for each version.

### Out of Scope

- Adding missing native SwiftUI child components, including Autocomplete, Multiselect, reference Cards, concrete table renderers, or SemanticLink.
- Advanced Search and Select, creating referenced records, interactive reference navigation/detail screens, Map, and Embedded Insight Table.
- Editing and immediately persisting a reference in case review mode outside normal assignment submission.
- New case-picker functionality, unrelated component refactoring, dependency upgrades, and GitHub Actions changes.

## User Scenarios & Testing

### User Story 1 – Select and submit one referenced record (Priority: P1)

As a mobile user, I can choose an existing record or case from an ObjectReference field and submit the form with the correct reference saved.

**Why this priority**: A working single-reference form provides the smallest useful and demo-able capability.

**Independent Test**: Open a recorded single-reference example, choose or replace a record, submit it, and verify the saved reference matches the selected record. Repeat the demonstration in both primary sample apps.

**Acceptance Scenarios**:

1. **Given** an editable single-reference Autocomplete or Dropdown with valid options, **When** the user chooses a record, **Then** the field shows its display label and submission saves that record's identity to the configured relationship.
2. **Given** a preselected reference, **When** the form opens and the user replaces it, **Then** the initial selection is shown and submission saves only the replacement for that relationship.
3. **Given** a required reference with no selection, **When** the user submits, **Then** the existing validation experience identifies the missing selection; choosing a valid option allows submission.
4. **Given** a record identified by multiple key fields or a reference inside a nested relationship, **When** the user selects and submits it, **Then** all required identity fields are saved to the intended relationship and unrelated fields are unchanged.
5. **Given** a reference to a case rather than a data record, **When** the user selects and submits it, **Then** the case identity and display information remain distinct and correct.

### User Story 2 – Select and submit multiple referenced records (Priority: P1)

As a mobile user, I can add and remove referenced records through a configured multiple-selection presentation without losing or duplicating selections.

**Why this priority**: Multiple-record selection is a central ObjectReference use case and completes the primary demo vertical slice.

**Independent Test**: Open a recorded Combobox example, select two records, remove one, add another, submit, and compare the persisted relationship with the final selected set.

**Acceptance Scenarios**:

1. **Given** an editable multiple-reference Combobox, **When** the user selects two records and removes one, **Then** the displayed selection and submitted relationship contain exactly the remaining record.
2. **Given** existing selections, **When** the user adds or removes records, **Then** unchanged records are retained, additions and removals are saved correctly, and no duplicate records are created.
3. **Given** a required multiple reference, **When** the final selection is empty and the user submits, **Then** validation rejects the empty selection; a nonempty valid selection satisfies the requirement.

### User Story 3 – Refresh dependent choices safely (Priority: P1)

As a mobile user, I receive the current choices when a field affecting an ObjectReference datasource changes, and can continue using the form if option loading fails.

**Why this priority**: Parameter-dependent loading must be reliable for an end-to-end demo and must not save a selection to the wrong context.

**Independent Test**: Change a driving field twice, complete option requests in reverse order, and verify that only the newest choices appear. Exercise a failed request followed by a successful subsequent load.

**Acceptance Scenarios**:

1. **Given** options filtered by another field, **When** that field changes, **Then** available choices reflect the new parameters and any selection change follows the platform's supplied rules.
2. **Given** two overlapping loads, **When** the older load finishes last, **Then** it does not overwrite the newer choices.
3. **Given** failed option loading, **When** the failure is handled, **Then** unrelated form fields remain usable, stale choices are not presented as current, and a subsequent supported reload can display recovered choices.
4. **Given** dependent fields whose values change after selection, **When** the user changes the reference, **Then** those fields refresh where required without duplicate refresh loops.
5. **Given** an outstanding request, **When** the user leaves the form or the relationship context changes, **Then** its completion does not restore removed fields or replace choices in the new context.

### User Story 4 – Use the authored presentation and read-only state (Priority: P2)

As a mobile user, I can use reference Cards, Checkbox Groups, or tables and view persisted references in the presentation configured by the application author.

**Why this priority**: These presentations extend the useful selector demo without introducing new component families.

**Independent Test**: Open recorded Cards, Checkbox Group, and table examples with editable and read-only configurations; verify displayed records, allowed interactions, and saved selections.

**Acceptance Scenarios**:

1. **Given** valid single or multiple reference Cards or Table/SimpleTable metadata, **When** the user selects records and submits, **Then** the configured presentation is shown and the selected identities are saved correctly.
2. **Given** an editable multiple-reference Checkbox Group, **When** the user toggles items and submits, **Then** the saved relationship matches the checked records.
3. **Given** a read-only multiple-reference Cards or table configuration, **When** the form opens, **Then** the configured presentation displays persisted records without selection controls that can modify them.
4. **Given** a text-only display configuration, **When** the form opens, **Then** selected record labels are readable, empty selections are handled consistently with existing fields, and long or multiple labels remain usable on narrow screens.
5. **Given** a hidden required reference, **When** the user submits, **Then** it is neither displayed nor validated as an active field; when made visible again, it displays the current relationship state.
6. **Given** a disabled or read-only reference, **When** the user attempts to change it, **Then** the persisted selection remains unchanged.

### User Story 5 – Demonstrate and integrate the delivered capability (Priority: P2)

As an integrator or demonstrator, I can reproduce the feature in the existing sample apps and understand the supported presentations for each platform and Pega version.

**Why this priority**: The primary goal is a working CMP demo, while secondary samples need accurate integration and support boundaries.

**Independent Test**: Follow the demo guide on Android and iOS, then validate the Android native sample and the limited SwiftUI Dropdown example without undocumented renderer additions.

**Acceptance Scenarios**:

1. **Given** the documented demo case and configuration, **When** a demonstrator uses either CMP sample app's existing case selection entry point, **Then** they can complete single selection, multiple selection, parameter refresh, submission, and inspection of persisted read-only selections.
2. **Given** the newly delivered SDK artifacts, **When** the Android native Jetpack Compose sample runs the demo, **Then** supported ObjectReference presentations work without a custom ObjectReference renderer supplied by the app.
3. **Given** the native SwiftUI sample and valid editable Dropdown ObjectReference metadata, **When** the form opens and a record is selected and submitted, **Then** the wrapper renders through existing views and the correct reference is saved.
4. **Given** a SwiftUI reference requiring a child view absent from that sample, **When** it is rendered, **Then** the sample's existing unsupported-renderer behavior remains explicit and the support guide identifies the limitation.
5. **Given** Pega 24, 25, or 26, **When** the support matrix is reviewed, **Then** it distinguishes verified ObjectReference combinations, verified existing-component regressions, and unavailable or unverified feature combinations.

### Edge Cases

- Empty datasource results and empty persisted relationships must not crash the form or show fabricated selections.
- Records with the same display label but different identities must remain independently selectable.
- Annotated property paths, nested relationships, and indexed contexts must preserve the intended destination and identity.
- Visibility changes, presentation changes, and form navigation must not leave stale children, duplicate selections, or validation for removed fields.
- Unsupported or malformed configurations must not be silently converted from multiple selection to single selection or treated as an empty successful field.
- Review-persistence settings and other excluded capabilities must not expose a working-looking interaction whose changes cannot be saved.
- Missing display labels and optional metadata must follow documented existing-field conventions without inventing record identities.
- Light/dark appearance, long labels, narrow screens, and the on-screen keyboard must leave primary CMP selection and submission usable.

## Functional Requirements

- **FR-001**: The SDK MUST recognize supported ObjectReference metadata and present the corresponding reference field rather than treating the wrapper itself as unsupported.
- **FR-002**: The primary sample apps MUST support the valid presentation combinations listed in scope, using representative platform-supplied examples to establish each supported combination.
- **FR-003**: Single and multiple selection MUST retain their configured cardinality and save the exact selected identities to the intended relationship, including nested relationships and composite identities.
- **FR-004**: Labels, preselected values, required state, disabled state, visibility, read-only state, and display-only state MUST follow the authored configuration and existing field conventions.
- **FR-005**: Hidden references MUST not participate as active required fields, and disabled/read-only references MUST not permit selection changes.
- **FR-006**: Read-only Cards and tables MUST preserve their requested presentation; text-only presentation MUST be used only when the configuration calls for it.
- **FR-007**: Parameter-dependent options MUST reflect the latest active parameters and relationship context. Older or abandoned loads MUST NOT replace current choices or restore removed fields.
- **FR-008**: Loading and configuration failures MUST use established error or diagnostic behavior, keep unrelated form fields usable where possible, and avoid representing an unsupported configuration as successfully supported.
- **FR-009**: Reference changes MUST refresh dependent content where required by the platform, without duplicate refresh loops or unintended updates to unrelated relationships.
- **FR-010**: The Android native sample MUST consume the delivered capability through its existing integration. Native SwiftUI MUST support the wrapper and an editable Dropdown example using existing child views, without adding missing child component types.
- **FR-011**: Unsupported presentation or excluded feature handling MUST be documented and MUST NOT silently alter selection cardinality or permit edits that cannot be persisted through the supported assignment workflow.
- **FR-012**: A reproducible demo guide MUST cover prerequisites, case configuration, launch steps, single/multiple selection, parameter refresh, submission, persisted results, and platform/version limitations.
- **FR-013**: Verification MUST use sanitized representative responses with recorded provenance and assert saved reference values, not merely visual rendering or successful compilation.
- **FR-014**: Existing supported components, including DataReference and any selection controls reused by this feature, MUST retain their supported behavior.

## Non-Functional Requirements

- **NFR-001 Compatibility**: Support is additive. Existing integrator contracts remain compatible; any new public component capability and unsupported platform/version combinations must be documented. Pega 24/25/26 feature availability and regression compatibility are separate claims.
- **NFR-002 Security**: Demo instructions and fixtures contain no credentials or customer data. Diagnostics do not include record contents, tokens, or sensitive parameter values. Existing authentication and request-isolation behavior is preserved.
- **NFR-003 Reliability**: Repeated updates, parameter changes, and leaving/reopening forms produce no duplicate active reference fields or obsolete selections. Failure and recovery scenarios are verified deterministically.
- **NFR-004 Platforms**: Shared behavior serves Android and iOS CMP and Android native Jetpack Compose. Native SwiftUI has the limited support described above; shared module responsibilities and platform boundaries remain intact.
- **NFR-005 Usability**: Primary CMP presentations remain usable in light/dark appearance, with long labels, on narrow screens, and during keyboard input. Text-only multiple selections are not clipped into an unreadable single line.

## Affected Areas

- Modules: `core`, `engine-webview`, `ui-renderer-cmp`, shared test resources, and sample integrations. `ui-components-cmp` changes are conditional on demonstrated gaps in existing controls; no new UI primitive is assumed.
- Source sets: shared component behavior and rendering in `commonMain`; Android instrumented acceptance coverage; existing Android/iOS sample and framework integration paths.
- Public APIs or resources: additive ObjectReference component support, default registration and rendering, bundled component resources, and a SwiftUI wrapper view. Exact contracts and paths belong in the implementation plan.

## Success Criteria

- **SC-001**: A demonstrator following the guide completes all five primary steps—single selection, multiple selection, parameter refresh, submission, and inspection of persisted read-only results—in both Android and iOS CMP apps without custom feature code or undocumented workarounds.
- **SC-002**: Every supported presentation in the agreed matrix has at least one representative acceptance example, and all tested submissions match the final selected identities and intended relationship.
- **SC-003**: All defined stale-load, hidden-required, disabled/read-only, and option-load failure/recovery scenarios complete without an incorrect saved selection or an obsolete field becoming active.
- **SC-004**: The Android native sample completes the supported selector demo using the delivered artifacts, and native SwiftUI completes its Dropdown example without adding missing child controls.
- **SC-005**: The support guide accounts for each of Pega 24, 25, and 26 and all four mobile sample variants, clearly distinguishing verified support from unavailable or unverified combinations.
- **SC-006**: Relevant existing reference/selector regression scenarios pass, and another developer can reproduce the demo using the documented setup and expected results.

## Assumptions and Open Questions

- The agreed proposal in `specify-input.md` is the specify input. Detailed design and ordered implementation tasks will be produced by later SpecKit stages.
- The baseline is current `master`; the existing checkout branch is recorded for traceability and is not a decision to complete PR #48. No branch switch is part of this specification.
- Representative ObjectReference cases/responses are not currently supplied. Obtaining them is a prerequisite task, not a reason to infer a server contract from DataReference alone.
- The existing CMP case picker can launch the demo case once it is advertised by the configured environment; no new picker is required.
- The initial delivery excludes review-mode persistence and other advanced capabilities listed out of scope, following the accepted CMP-first proposal. Normal assignment selection/submission remains in scope.
- ObjectReference metadata availability may differ across Pega 24/25/26. Availability must be established from supplied examples before claiming version-specific support; existing components remain regression-protected on supported runtimes.
- Native SwiftUI support is intentionally narrower than CMP support. An unsupported generated child does not imply the wrapper itself is unrecognized, and adding missing views is not required by this feature.
- No unresolved product-scope clarification remains. Metadata examples, supported combinations by version, and exact failure/fallback contracts must be established during research and planning before implementation.
