# Tasks: ENHANCEMENT-6263 ObjectReference Support

**Input**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/object-reference.md](contracts/object-reference.md), and [quickstart.md](quickstart.md).
**Created**: 2026-10-12
**Status**: Generated and reviewed; all implementation tasks remain open.

## Format and Execution Rules

**Updated testing constraint**: At the user's request, the standalone JS test file was removed. Do not introduce a JS runner, harness, or other new test type. The earlier JS-test portions of T004, T011, T018, T020, T026, T032, T035, and T052 and their parallel/dependency examples are superseded: use existing Android instrumented/Kotlin/resource test infrastructure and JavaScript syntax checks. Earlier checked JS-test entries record historical work, not retained test coverage.

`- [ ] Tnnn [P?] [USn?] Description with exact repository path or command`

- `[P]` identifies independent work within the stated phase, after its dependencies are satisfied. It does not authorize concurrent edits to the same file.
- `[US1]`–`[US5]` map directly to specification stories. Setup, foundational, and final tasks have no story label.
- Tasks include tests because the specification explicitly requires behavioral and platform verification. Contract tests may start failing before implementation; do not mark a story complete until its acceptance checks pass.
- Preserve module/source-set boundaries and the current master baseline. No whole-draft cherry-pick, missing SwiftUI child implementation, advanced feature expansion, dependency upgrade, or GitHub workflow change.
- Record exact verification commands/results and limitations in `specs/ENHANCEMENT-6263-object-reference/verification.md` (new). A checked task means completed work, not intention; unavailable platform verification remains open with a blocker.
- Each metadata-dependent branch requires captured evidence or a justified isolated contract test. Metadata acquisition is external work: if authorized environment access or responses are unavailable, ask for them and leave the evidence gate open. Do not invent DX responses or case identifiers.

## Phase 1: Setup

**Goal**: Establish trustworthy input data and the smallest test infrastructure, without feature implementation.

- [ ] T001 Acquire or author an authorized ObjectReference demo case and capture the first single Dropdown/Autocomplete, multiple Combobox, dependent parameter, submit, and persisted-display responses; initial US1 examples must include data and case targets, a nested relationship, a composite-key identity, preselected replacement, and required-empty validation, with expected submitted identity and destination for each; record case ID, Pega/CoreJS version, availability, and acquisition blockers in `specs/ENHANCEMENT-6263-object-reference/research.md` (no credentials or customer records).
- [ ] T002 Sanitize and save the T001 responses in `test/src/commonMain/composeResources/files/responses/`, preserving identity consistency; record exact captured filenames, origin, sanitization, and expected request/selection mappings in `test/src/commonMain/composeResources/files/responses/README.md`. Derive filenames from the captured case rather than assuming a new case-class name.
- [ ] T003 Reconcile captured metadata with `specs/ENHANCEMENT-6263-object-reference/contracts/object-reference.md` and `specs/ENHANCEMENT-6263-object-reference/data-model.md`; resolve exact paths, key assignments, flag precedence, allowed modes and refresh semantics before metadata-sensitive implementation, updating `spec.md` only if evidence requires clarified scope.
- [x] T004 [P] Create the minimal dependency-free JS helper test in `engine-webview/src/jsTest/object-reference.test.mjs` using Node 24 built-in test/assert modules; keep it outside Compose resources and avoid npm dependencies or production package-scope changes. Full manager/PConnect/PCore race harness remains unnecessary until representative metadata requires it.
- [x] T005 [P] Initialize `specs/ENHANCEMENT-6263-object-reference/verification.md` with scenario-to-fixture mapping, per-platform/Pega 24/25/26 evidence statuses, commands/tool versions, public API checks, and explicit unverified entries; do not treat available CDN profiles as feature support.
- [x] T006 [P] Write the initial setup guide in `docs/object-reference.md` (new): captured case prerequisites, local configuration, existing case-picker launch entry point, intended demo steps, and narrow SwiftUI scope; final demonstrated results belong to T049 and test-running/provenance instructions to T052; supply no invented server setup values.

**Gate**: T001–T003 complete for the initial selector slice. T004–T006 can run together after the captured inputs/contracts are available. T001–T003 are not prerequisites for writing a generic mock harness, but they are prerequisites for presenting it as a platform contract.

US1 server-contract acceptance requires captured examples for its identity scenarios. If an example is unavailable, record the blocker and leave the corresponding acceptance task open; isolated helper tests do not establish server compatibility. T002 must preserve the initial examples' identities/destinations and T003 must confirm their mappings.

## Phase 2: Foundational Work

**Goal**: Establish registration, wrapper state, and fixture routing used by all story slices.

- [x] T007 Implement `ObjectReferenceComponent : ContainerComponent, HideableComponent` in `core/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/core/components/containers/ObjectReference.kt` and register the additive type/producer in `core/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/core/components/ComponentTypes.kt` and `core/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/core/components/ComponentRegistry.kt`; preserve observable `visible: Boolean = true`, `label: String = ""`, `isDisplayOnly: Boolean = false`, private setters, inherited metadata, and existing container adoption.
- [ ] T008 [P] Add props/default-reset, registry, and parent/child adoption tests in `core/src/commonTest/kotlin/com/pega/constellation/sdk/kmp/core/components/containers/ObjectReferenceTest.kt`; stage expectations from the bridge contract and require T007 before evaluating passing results.
- [x] T009 Implement the adapter lifecycle scaffold in `../../engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/object-reference.component.js` and import/register it in `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/mappings/sdk-pega-component-map.js`; use existing context resubscription/reconciliation conventions, explicit props snapshots, one wrapper registration, and no duplicate native selection state or new wrapper event.
- [ ] T010 Register captured initial case/data/assignment responses in `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/DxCasesHandler.kt`, `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/DxDataViewsHandler.kt`, and `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/DxAssignmentsHandler.kt`; assert saved destination/identities and preserve existing routes.

**Gate**: Shared registration and fixture routes exist. T007/T009/T010 touch separate files and may proceed concurrently after T003; T008 test authoring may proceed alongside T007. No story is complete based on this scaffold alone.

## Phase 3: User Story 1 — Select and Submit One Record (P1)

**Goal**: Deliver the smallest useful CMP reference selector.
**Independent test**: Select/replace a preselected record, validate required empty selection, submit, and verify exact persisted identity on Android and iOS CMP. Include data/case targets and nested/composite identities in recorded acceptance examples.

### Tests

- [x] T011 [P] [US1] Add the available single-route/key/property helper tests to `engine-webview/src/jsTest/object-reference.test.mjs`: Combobox normalization, annotated paths, relationship context, configured value preservation and datasource columns. Metadata-dependent resolved/inherited props, mapped case IDs, nested/indexed context, descriptor assignments, duplicate labels and valid falsy keys remain pending representative fixtures.
- [ ] T012 [P] [US1] Add real-WebView acceptance tests in `samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/cases/ObjectReferenceTest.kt` for Dropdown/Autocomplete selection, preselected replacement, required validation, data/case and nested/composite identities, asserting exact saved content through T010 routes and the saved single reference's display label after submission.

### Implementation and Acceptance

- [x] T013 [US1] Implement single-reference column/datasource/path helpers in `../../engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/object-reference-utils.js`; preserve annotated composite-key/descriptors for selector consumers, leaf keys only for record lookup, indexed context and the actual configured value/key destination without guessed `pyGUID` or substring-based identity matching.
- [x] T014 [US1] Implement single Dropdown/AutoComplete and single Combobox routing plus minimal single-reference text-only/read-only routing using existing display primitives in `../../engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/object-reference.component.js`; preserve configured cardinality, target Case/Data, required/visibility/disabled, parameter metadata, current value and optional label/hideLabel conventions, leaving selection actions owned by the child and adding no navigation.
- [x] T015 [US1] Implement explicit unknown/invalid/excluded-mode and child-construction failure handling in `../../engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/object-reference.component.js` using the existing Unsupported lifecycle exactly once; prohibit empty-success/Autocomplete fallback and review editing without persistence, while allowing ordinary assignment editing with unused advanced authoring flags.
- [x] T016 [US1] Add the default delegating visible CMP renderer in `ui-renderer-cmp/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/ui/renderer/cmp/containers/ObjectReferenceRenderer.kt` and register it in `ui-renderer-cmp/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/ui/renderer/cmp/ComponentRenderers.kt`; reuse existing controls, avoid duplicate labels, and keep default overrides compatible.
- [x] T017 [US1] Extend `engine-webview/src/jvmTest/kotlin/com/pega/constellation/sdk/kmp/engine/webview/WebViewResourcesTest.kt` to prove adapter/helper/map resources are packaged at the canonical paths and imports resolve; do not introduce staging tasks or symlinks.
- [x] T018 [US1] Run the available adapter/helper `node --check` commands from `specs/ENHANCEMENT-6263-object-reference/quickstart.md`, the dependency-free helper tests in `engine-webview/src/jsTest/object-reference.test.mjs`, and `./gradlew :core:compileKotlinJvm :core:jvmTest :engine-webview:jvmTest :ui-renderer-cmp:compileKotlinJvm`; record results in `specs/ENHANCEMENT-6263-object-reference/verification.md`. Full manager/PConnect/PCore race coverage remains pending representative metadata.
- [ ] T019 [US1] Run `./gradlew :samples:android-cmp-app:assembleDebug` and `./gradlew :samples:android-cmp-app:pixelDebugAndroidTest`, then build/launch `samples/ios-cmp-app/iosApp.xcodeproj` through its discovered scheme and available simulator; demonstrate single selection/replacement/submission and verify the saved single reference's read-only display label on both CMP apps; record expected/actual identities and screenshots in `specs/ENHANCEMENT-6263-object-reference/verification.md`.

**Checkpoint/MVP**: A single-reference CMP case works and persists the correct identity on both primary platforms. Unsupported metadata is explicit. US2–US4 are not needed to demonstrate this slice.

## Phase 4: User Story 2 — Select and Submit Multiple Records (P1)

**Goal**: Add multiple Combobox selection without duplicate/wrong list operations.
**Independent test**: Start with preselected records, add two, remove one, submit, and assert final records plus unchanged selections; verify required-empty behavior.

- [ ] T020 [P] [US2] Add multi Combobox/Multiselect metadata and list-instruction contract tests to `engine-webview/src/jsTest/object-reference.test.mjs`, preserving “Single replacement does not become a list append” and “Multi insert/delete instructions remain child-owned and retain unchanged selections.”
- [ ] T021 [P] [US2] Extend `samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/cases/ObjectReferenceTest.kt` for preselected multi add/remove, duplicate prevention and required-empty validation, asserting final submitted selection and page instructions.
- [x] T022 [US2] Implement multi Combobox/Multiselect routing and correct selection-list/reference context in `../../engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/object-reference.component.js` and `../../engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/object-reference-utils.js`, preserving full identities and existing list-action ownership without wrapping multiple values into a single selector.
- [ ] T023 [US2] Extend captured multi response routing/assertions in `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/DxAssignmentsHandler.kt` and corresponding files under `test/src/commonMain/composeResources/files/responses/`; record exact filenames and expected insert/delete behavior in `test/src/commonMain/composeResources/files/responses/README.md`.
- [x] T024 [US2] Implement initial persisted multi text-display children in `../../engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/object-reference.component.js` and wrapping display layout in `ui-renderer-cmp/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/ui/renderer/cmp/containers/ObjectReferenceRenderer.kt`; use stable identities/correct indexed context and no record-content diagnostics.
- [ ] T025 [US2] Run `node --experimental-detect-module --test engine-webview/src/jsTest/object-reference.test.mjs` and `./gradlew :samples:android-cmp-app:pixelDebugAndroidTest`; reproduce multi add/remove/submission and persisted text display on both CMP apps and record results in `specs/ENHANCEMENT-6263-object-reference/verification.md`.

**Checkpoint**: Single and multi selectors are demo-able, but the parameter-dependent demo still requires US3.

## Phase 5: User Story 3 — Refresh Dependent Choices Safely (P1)

**Goal**: Prevent stale options, wrong-context updates, failures that terminate forms, and duplicate refresh loops.
**Independent test**: Change parameters twice, finish loads in reverse order, fail and reload, and leave/change context while loading; verify latest options and correct submission without obsolete children.

- [ ] T026 [P] [US3] Add controlled-promise tests in `engine-webview/src/jsTest/object-reference.test.mjs` for deduplication, reverse completion order, failure recovery, invalid response shape, hide/destroy/context/loader-mode changes and refresh invocation counts; enforce “Completion requires alive/visible/matching generation and context” and “Failure clears published current options and does not trigger automatic retries.” Prove failure clears options, unchanged notifications issue zero additional requests, changed datasource/parameters/context or hide→show starts a new request, and successful recovery publishes only the current response.
- [ ] T027 [P] [US3] Add parameter-change/failure/recovery and dependent-refresh UI tests in `samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/cases/ObjectReferenceTest.kt` using captured parameterized responses and deterministic scheduling; verify unrelated fields remain usable and saved identities match current selections.
- [ ] T028 [US3] Capture missing parameterized Checkbox/refresh/error examples and extend `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/DxDataViewsHandler.kt` and `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/DxAssignmentsHandler.kt`; record exact files/provenance in `test/src/commonMain/composeResources/files/responses/README.md` before claiming server behavior.
- [ ] T029 [US3] Implement wrapper-owned parameterized CheckboxGroup options and the minimal editable Checkbox child route in `../../engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/object-reference.component.js`, with context/request generation, signature deduplication, obsolete-option clearing and identity-safe normalization; after failure retain failed state for that signature and publish empty options, never retry on unchanged notifications, and reload only on datasource/parameter change, context change, or hide→show; keep ordinary selector loaders child-owned and add no retry UI.
- [ ] T030 [US3] Complete context-resubscription, cache invalidation, hide/route-change/destroy and child-reconciliation guards in `../../engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/object-reference.component.js`; preserve “No duplicate native selection state or new wrapper selection event” and no late updates after teardown.
- [ ] T031 [US3] Trace selector/collection refresh ownership and implement evidence-required optional callbacks in `../../engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/object-reference.component.js` and, only if needed, `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/fields/multiselect.component.js`, `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/fields/check-box.component.js`, `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/templates/selectable-card.component.js`, and `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/templates/listview/list-view.component.js`; invoke after successful child actions, honor implicit refresh and active view/context, and never duplicate instructions.
- [ ] T032 [US3] Add optional-callback/default-behavior and sanitized-diagnostic assertions in `engine-webview/src/jsTest/object-reference.test.mjs`, including no record data, parameter values or arbitrary error bodies in logs; verify existing DataReference callback paths when changed.
- [ ] T033 [US3] Run `node --experimental-detect-module --test engine-webview/src/jsTest/object-reference.test.mjs` and `./gradlew :samples:android-cmp-app:pixelDebugAndroidTest`, demonstrate current parameter/dependent content on iOS CMP, and record race/recovery/context/refresh results in `specs/ENHANCEMENT-6263-object-reference/verification.md`.

**Checkpoint/primary selector demo**: US1+US2+US3 provide single selection, multiple selection, parameter refresh, submission and persisted text results. Advanced presentations remain US4.

## Phase 6: User Story 4 — Authored Presentation and Read-Only State (P2)

**Goal**: Correct Cards/Checkbox/table presentations and their interactivity, without replacing them with blanket read-only text.
**Independent test**: Render recorded editable/read-only presentations, change allowed selections, submit and verify persisted records; hidden, disabled and read-only states cannot mutate or incorrectly validate.

- [ ] T034 [US4] Capture and sanitize the remaining single/multi Cards, Checkbox Group, editable/read-only Table/SimpleTable, empty display, hidden/disabled and presentation-change examples under `test/src/commonMain/composeResources/files/responses/`, updating `test/src/commonMain/composeResources/files/responses/README.md` and request routing in `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/DxAssignmentsHandler.kt` and `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/DxDataViewsHandler.kt`.
- [ ] T035 [P] [US4] Add route/read-only/unsupported/preset/index-event tests in `engine-webview/src/jsTest/object-reference.test.mjs`, covering read-only Cards/tables before text, required promoted-filter fallback, invalid index rejection, collection event ownership, review nonediting, empty valid selections and no duplicate registration.
- [ ] T036 [P] [US4] Extend `samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/cases/ObjectReferenceTest.kt` with Cards/Checkbox/table saved selection, read-only presentation, hidden-required submission and hide/show reconstruction, disabled no-change, long/empty/missing display values and presentation replacement assertions.
- [ ] T037 [US4] Implement full Cards/Checkbox/Table/SimpleTable routing and extend the previously implemented single/multiple text display with read-only Cards/tables and presentation-specific routing in `../../engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/object-reference.component.js` and `../../engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/object-reference-utils.js`; preserve presets/secondary fields/images, selected-record source, actual selection identity and no interactive SemanticLink promise.
- [ ] T038 [US4] Apply necessary collection event/index/interactivity guards in `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/fields/check-box.component.js` and `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/templates/selectable-card.component.js`; adjust `ui-renderer-cmp/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/ui/renderer/cmp/fields/CheckboxRenderer.kt` so multi display is not boolean Yes/No and read-only/disabled state cannot change selection.
- [ ] T039 [US4] Carry optional disabled/readOnly state through `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/components/containers/templates/listview/list-view.component.js`, `core/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/core/components/containers/ListViewComponent.kt`, `ui-renderer-cmp/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/ui/renderer/cmp/containers/ListViewRenderer.kt`, and `ui-components-cmp/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/ui/components/cmp/controls/form/Table.kt` only as required by acceptance; flags default false and enabled defaults true, suppress noneditable selection, preserve original public signature via overload if changed, and add state/default tests in `core/src/commonTest/kotlin/com/pega/constellation/sdk/kmp/core/components/containers/ListViewComponentTest.kt`.
- [ ] T040 [US4] Complete visibility/text wrapping/label handling in `ui-renderer-cmp/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/ui/renderer/cmp/containers/ObjectReferenceRenderer.kt`; verify no clipping/duplicate headings and correct empty-value conventions, retaining delegating child rendering for visual Cards/tables.
- [ ] T041 [US4] Run `node --experimental-detect-module --test engine-webview/src/jsTest/object-reference.test.mjs`, `./gradlew :core:jvmTest :engine-webview:jvmTest :ui-renderer-cmp:compileKotlinJvm`, `./gradlew :test:pixelAndroidDeviceTest`, and `./gradlew :samples:android-cmp-app:pixelDebugAndroidTest`; record new acceptance and existing DataReference/Cards/Autocomplete/parameter regression results in `specs/ENHANCEMENT-6263-object-reference/verification.md`.
- [ ] T042 [US4] Verify read-only Cards/tables, text wrapping, hidden-required, disabled/read-only, empty records, long labels, narrow screens, keyboard and light/dark appearance on Android/iOS CMP using `samples/android-cmp-app/` and `samples/ios-cmp-app/iosApp.xcodeproj`; record actual identities, screenshots and any limitations in `specs/ENHANCEMENT-6263-object-reference/verification.md`.

**Checkpoint**: All captured in-scope primary presentations satisfy selection and display semantics, with shared-control regressions verified.

## Phase 7: User Story 5 — Demonstrate and Integrate (P2)

**Goal**: Reproduce the complete CMP demo and validate secondary integrations with honest support claims.
**Independent test**: Another developer follows the guide on both CMP apps; Android native uses freshly published artifacts; native SwiftUI saves a Dropdown reference using existing child views and explicitly reports unsupported children.

- [ ] T043 [P] [US5] Add `samples/swiftui-components-app/UITest/UI Tests/TestObjectReference.swift` for captured editable Dropdown selection/submission, disabled no-change and absent-child unsupported behavior; use the existing mocked app conventions and do not add missing child controls.
- [ ] T044 [US5] Add `samples/swiftui-components-app/swiftui-components-app/SDKSupport/UI/Containers/ObjectReferenceComponentView.swift` with observable wrapper state, visibility/heading/delegated children, and dispatch it before generic Container in `samples/swiftui-components-app/swiftui-components-app/SDKSupport/UI/Renderer.swift`; enforce delegated disabled/read-only interaction by a scoped wrapper or existing `Fields/DropdownComponentView.swift` correction if necessary, preserving other field behavior.
- [ ] T045 [US5] Register captured Dropdown case/data/submission routes and exact saved-identity assertions in `samples/swiftui-components-app/UITest/Mocked Application/Network/MockedNetworkPostProvider.swift`, `samples/swiftui-components-app/UITest/Mocked Application/Network/MockedNetworkPatchProvider.swift`, and `samples/swiftui-components-app/UITest/Mocked Application/Network/MockedNetworkGenericProvider.swift`; ensure new view/test/fixtures are included by `samples/swiftui-components-app/UITest/UITest.xcodeproj/project.pbxproj` and `samples/swiftui-components-app/swiftui-components-app.xcodeproj/project.pbxproj` using existing source-membership conventions.
- [x] T046 [US5] Verify and correct the blocking factory API usage in `samples/android-compose-app/src/main/java/com/pega/constellation/sdk/kmp/samples/androidcomposeapp/AndroidComposeActivity.kt` from removed `defaultHttpClient()` to the existing `defaultCallFactory()` contract; retain published dependencies in `samples/android-compose-app/build.gradle.kts` and local authentication configuration conventions.
- [ ] T047 [US5] Run `./gradlew publishToMavenLocal` then `./gradlew :samples:android-compose-app:assembleDebug`, confirm the sample resolves newly published module/resource versions, and complete selector/submission device smoke acceptance; record artifact versions and expected/actual identities in `specs/ENHANCEMENT-6263-object-reference/verification.md`.
- [ ] T048 [US5] Run `./gradlew :engine-webview:assembleConstellationSdkDebugXCFramework` and `./gradlew :engine-webview:assembleConstellationSdkReleaseXCFramework`; discover schemes for `samples/ios-cmp-app/iosApp.xcodeproj` and `samples/swiftui-components-app/swiftui-components-app.xcodeproj`, build both through Xcode framework phases, and run `samples/swiftui-components-app/UITest/UITest.xcodeproj` scheme `UITest` with an actual available simulator as documented in `specs/ENHANCEMENT-6263-object-reference/quickstart.md`; record limited SwiftUI and existing test results in `verification.md`.
- [ ] T049 [US5] Complete and independently reproduce all five primary demo steps in both CMP apps through the existing `Create` picker; finalize the initial T006 guide with demonstrated launch/setup steps, expected persisted results, and reproducibility evidence in `docs/object-reference.md`, `docs/configure-sample-mobile-apps.md`, and `docs/setup-sample-pega-app.md`, recording outcomes in `specs/ENHANCEMENT-6263-object-reference/verification.md` without committing local environment secrets; leave test-runner/provenance documentation to T052.
- [ ] T050 [US5] Populate the per-presentation/platform Pega 24/25/26 support matrix in `docs/object-reference.md` and `specs/ENHANCEMENT-6263-object-reference/verification.md`; on each version where corresponding metadata is available run single selection/replacement/submission, multi add/remove/submission, parameter refresh, and persisted read-only display. Mark Verified only after successful execution on the recorded version/platform with saved identities checked; mark Unavailable only with recorded environment/authoring evidence that the configuration cannot be supplied; otherwise mark Unverified for missing access/capture/execution/prerequisites. Keep platform results and existing-component regressions separate and leave unmet acceptance checks open; this full compatibility gate does not delay the initial CMP demo milestone.
- [ ] T051 [US5] Update support/demo links and limitations in `README.md`, `core/README.md`, `ui-renderer-cmp/README.md`, `samples/base-cmp-app/README.md`, `samples/android-cmp-app/README.md`, `samples/ios-cmp-app/README.md`, `samples/android-compose-app/README.md`, and `samples/swiftui-components-app/README.md`; explicitly distinguish wrapper recognition from missing SwiftUI child support.

**Checkpoint**: Primary demo reproducible; Android native artifact integration and limited native SwiftUI verified; support claims match recorded evidence.

## Phase 8: Documentation and Final Validation

- [ ] T052 [P] Finalize test-running/provenance documentation in `engine-webview/README.md` and `test/src/commonMain/composeResources/files/responses/README.md`: Node/Gradle commands, fixture/CDN prerequisites, and provenance instructions; align command references and actual captured identifiers in `specs/ENHANCEMENT-6263-object-reference/quickstart.md` without rewriting T049's demonstrated walkthrough or introducing npm dependencies/automated CDN refresh changes.
- [ ] T053 [P] Add a release-note draft to `specs/ENHANCEMENT-6263-object-reference/release-notes.md` covering additive component APIs/resources, supported modes/platform/version evidence, excluded capabilities and any existing-control/signature corrections; link it from `docs/object-reference.md` and move/merge it into `docs/releases/` only after maintainers select the release version.
- [ ] T054 Run `./gradlew build` after required local publication and `git diff --check`; resolve feature-related failures and record exact results/environment blockers in `specs/ENHANCEMENT-6263-object-reference/verification.md`, repeating narrow checks only when new edits or unresolved failures justify them.
- [ ] T055 Review source and docs against FR-001–FR-014, NFR-001–NFR-005 and SC-001–SC-006, record final traceability in `specs/ENHANCEMENT-6263-object-reference/verification.md`, and synchronize `spec.md`, `plan.md`, `data-model.md`, and `contracts/object-reference.md` with proven behavior; unverified support must not be reported as complete.
- [ ] T056 Review `git status --short` and `git diff` including new files for intended scope, public compatibility, unchanged authentication boundaries, sensitive fixture/diagnostic contents, generated output and accidental workflow/dependency changes; record the final review in `specs/ENHANCEMENT-6263-object-reference/verification.md` without committing unless explicitly requested.

## Dependencies and Execution Order

```text
T001 capture → T002 sanitize → T003 confirm contracts
                             ├─ T004 harness
                             ├─ T005 evidence log
                             └─ T006 demo guide
        ↓
Foundation T007–T010 (core, JS scaffold, fixtures)
        ↓
US1 T011–T019 → usable single-reference MVP
        ↓
US2 T020–T025 → multi selection + persisted text
        ↓
US3 T026–T033 → reliable primary selector demo
        ↓
US4 T034–T042 → remaining presentations/read-only states
        ↓
US5 T043–T051 → all sample integrations + demo evidence
        ↓
Final T052–T056
```

- Per-phase implementation follows test authoring, then source changes, then passing verification. Writing tests before fixtures/routes complete is allowed, but running server-contract acceptance depends on their captured routes.
- US1 needs T007–T010; T013 precedes T014; T014–T017 precede T018/T019. T011 and T012 touch different suites and can be authored together.
- US2 reuses US1 wrapper/helpers. T022–T024/T023 must complete before T025; T020/T021 can be authored independently after US1.
- US3 reuses selector/list behavior. T028 precedes metadata-sensitive T029. T029 is a minimal Checkbox path needed for loader tests; US4 adds full presentation/interactivity coverage. T029–T031 precede T032/T033; do not edit adapter concurrently.
- US4 needs loader/lifecycle guards from US3. T034 precedes acceptance execution; T035/T036 can be authored in parallel. T037–T040 precede T041/T042; T038/T039 touch separate controls but coordinate any event callback changes with T031.
- SwiftUI T043–T045 can begin once US1/recorded Dropdown inputs exist, without blocking CMP work. Android native T046/T047 can begin after the primary selector slice; the task phase ordering keeps the user's demo priority visible. T048–T051 final integration claims depend on the primary acceptance slices and platform evidence.
- T044 precedes T045 target-membership verification and T048 test execution; T046 precedes T047 publication/smoke validation. T049/T050 precede T051 accurate support docs.
- T052 and T053 are independent documentation tasks after story evidence. T054 precedes final requirements review T055/T056. Do not parallelize Gradle/Xcode builds sharing the same Kotlin outputs without verifying build isolation.

## Parallel Execution Examples

| Phase/story | Safe parallel opportunity | Join/checkpoint |
| --- | --- | --- |
| Setup | T004 Node harness, T005 evidence structure, T006 demo guide after contract inputs | Foundation begins with known metadata mappings. |
| Foundation | T007 core model, T009 JS scaffold, T010 mocked response routing; T008 test authoring can accompany T007 | Wrapper/registrations/routes exist. |
| US1 | T011 JS contracts and T012 Android test authoring | T018/T019 pass after implementation. |
| US2 | T020 JS list contracts and T021 Android multi cases | T025 final saved set matches selection. |
| US3 | T026 controlled async tests and T027 Android behavior tests | T033 proves current options, recovery and refresh counts. |
| US4 | T035 JS routing/event tests and T036 Android presentation tests | T041/T042 verify saved rows/cards and immutability. |
| US5 | T043 SwiftUI tests and T046 Android sample factory correction; T044 SwiftUI source and T047 Android smoke can proceed on separate platform paths once inputs are ready | T048–T051 report complete platform evidence. |
| Final | T052 engine/fixture docs and T053 release-note draft (avoid concurrent edits to shared docs) | T054–T056 final validation/review. |

Parallel opportunities are scheduling options, not a requirement to spawn agents. Same-file story suites/adapter edits remain sequential.

## Requirements Coverage

| Requirements | Tasks |
| --- | --- |
| FR-001 recognition/registration | T007–T009, T014–T017, T044 |
| FR-002 presentations | T001–T003, T022, T029, T034–T042 |
| FR-003 identity/cardinality | T010–T014, T020–T025, T034–T037 |
| FR-004 flags/preselection | T007/T008, T011/T012, T014, T024, T035–T040 |
| FR-005 hidden/noneditable | T026/T030, T036/T038–T042, T043/T044 |
| FR-006 read-only Cards/tables | T034–T037, T039–T042 |
| FR-007 current parameters/context | T026–T030, T033 |
| FR-008 controlled failure | T015, T026–T030, T032/T033 |
| FR-009 dependent refresh | T027/T028, T031–T033 |
| FR-010 sample scope | T043–T048, T051 |
| FR-011 unsupported/excluded handling | T015, T035/T037, T043/T044, T050/T051 |
| FR-012 reproducible demo | T006, T019/T025/T033/T042, T049/T051/T052 |
| FR-013 trustworthy fixtures/submissions | T001–T003, T005/T010, story acceptance tasks, T045/T050 |
| FR-014 regressions | T031/T032, T038/T039, T041/T048/T054 |
| NFR-001 compatibility | T003, T007/T009/T016, T039, T047/T048/T050/T053/T056 |
| NFR-002 security | T001/T002, T015/T032, T049/T056 |
| NFR-003 reliability | T026–T033, T035–T041 |
| NFR-004 platform boundaries | T007/T009/T016, T043–T048, T056 |
| NFR-005 usability | T024/T040/T042 |
| SC-001/SC-006 repeatable primary demo | T019/T025/T033/T042/T049/T055 |
| SC-002 correct presentations/submissions | T012/T021/T027/T036/T050/T055 |
| SC-003 failure/state scenarios | T026–T033/T036/T041/T055 |
| SC-004 secondary apps | T043–T048/T055 |
| SC-005 evidence matrix | T005/T050/T051/T055 |

## Implementation Strategy

1. **MVP first**: Complete acquisition/foundation and US1. Demonstrate one correct single-reference case on Android and iOS CMP before expanding modes.
2. **Primary demo next**: US2 + US3 add multi selection and reliable parameters with saved read-only text results. This is the user's preferred early demo milestone.
3. **Presentation completion**: US4 fills Cards/Checkbox/tables and verifies existing-control corrections.
4. **Secondary integrations**: Native SwiftUI remains wrapper/Dropdown-only; Android native consumes real published artifacts. Early independent work is permitted but cannot postpone the primary demo.
5. **Evidence before support claims**: US5/final review distinguish verified/unavailable/unverified versions. Missing access/fixtures or a failed acceptance check stays a reported blocker rather than a checked task.

## Task Generation Validation

- 56 sequential tasks: Setup 6; Foundation 4; US1 9; US2 6; US3 8; US4 9; US5 9; Final 5.
- All tasks use unchecked boxes, unique sequential IDs, phase-appropriate story labels, and exact repository paths or commands. Fixture directories are exact; filenames are deliberately determined by captured case provenance in T002/T034 rather than invented metadata.
- All five stories have independently observable acceptance checkpoints; implementation dependencies reuse shared infrastructure rather than imply other presentations must exist to test a selector.
- Metadata gate, platform checks, failure cases, compatibility and documentation map to the approved spec/plan. No implementation task is marked completed by generation.
- No extension hooks are configured in this checkout. Next stage: `/speckit-analyze` for consistency review or `/speckit-implement` after prerequisite inputs are available.
