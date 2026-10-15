# Implementation Plan: ENHANCEMENT-6263 ObjectReference Support

**Feature**: `ENHANCEMENT-6263-object-reference` | **Date**: 2026-10-12 | **Spec**: [spec.md](spec.md)
**Checkout branch**: `feature/mloct/ENHANCEMENT-6263-data-reference`
**Baseline inspected**: `ce7673a2df94f954d091d036d9d61359c1372e05` (current master baseline used for research).
**Status**: Design complete; metadata acquisition is the first implementation gate. No feature code or runtime support is claimed by this document.

## Technical Context

- **Language/runtime**: Kotlin 2.4.0, ES-module JavaScript, Swift/SwiftUI through the existing Xcode projects; JDK 17+ for Gradle. Node 24 for standalone mocked JS tests.
- **Build**: Gradle 9.4.0 via `./gradlew`; AGP 8.13.2, Compose Multiplatform 1.10.3, Material3 1.9.0. Android min SDK 26. Keep existing dependency versions.
- **Architecture**: `core` component model and `engine-webview` business integration are shared; CMP rendering is shared by Android CMP, iOS CMP, and Android native Jetpack Compose. Native SwiftUI uses its own renderer with the engine's exported core framework.
- **Affected modules**: `core`, `engine-webview`, `ui-renderer-cmp`, shared `test`, relevant `samples`; `ui-components-cmp` only for required interaction-state corrections to existing controls.
- **Testing**: Node built-in mocked tests; Kotlin props/registry tests; real Android WebView mocked-response acceptance tests; iOS CMP manual/live acceptance; native SwiftUI Dropdown UI test; Android native published-artifact smoke test; packaged-resource checks.
- **Dependencies**: No new production or npm dependencies. Use existing Kotlin test dependencies and Node built-in `node:test`/`node:assert/strict`.
- **External dependency**: A representative Pega ObjectReference demo case and sanitized responses must be supplied/captured before implementation claims metadata compatibility. No server-side field names or case-class identifiers are assumed here.

## Constitution Check

Design gate evaluated before and after design; all six principles are satisfied by the proposed boundaries and verification obligations. These checked items concern the plan, not completed implementation.

- [x] Specification scenarios are independently testable: selector vertical slices are P1; additional presentations and integrations are P2.
- [x] Module/source-set boundaries are preserved: shared JS/Kotlin/CMP behavior in existing common locations; SwiftUI stays in sample UI; no sample dependency enters core.
- [x] Public API and compatibility impact are documented in this plan and [contracts/object-reference.md](contracts/object-reference.md).
- [x] Verification covers affected platforms and failures, with recorded metadata required and unverified combinations explicitly identified.
- [x] Authentication, secrets, and diagnostic data remain safe; no new authentication/network boundary is introduced.
- [x] Documentation/release impact is included; no GitHub workflow changes or unsolicited dependency upgrades are planned.

**No exception required.** Missing metadata is an explicit prerequisite, not a hidden assumption. If captured metadata contradicts these contracts, update the research/contracts and obtain clarification for scope changes before coding that branch.

## Repository Analysis

### Relevant Existing Files

Paths below are relative to the repository. Abbreviations used in later sections:

- `JS` = `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents`
- `CORE` = `core/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/core`
- `CMP` = `ui-renderer-cmp/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/ui/renderer/cmp`
- `UI` = `ui-components-cmp/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/ui/components/cmp`
- `ANDROID_TEST` = `samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test`
- `SWIFT_UI` = `samples/swiftui-components-app/swiftui-components-app/SDKSupport/UI`

| Path | Role |
| --- | --- |
| `JS/components/base.component.js` | Context-key detection and PConnect replacement/resubscription. |
| `JS/components/containers/container-base.component.js` | Child reconciliation, reuse, visibility teardown, lifecycle, event forwarding. |
| `JS/components/containers/templates/data-reference.component.js` | Closest adapter precedent, read-only display, dependent refresh, review behavior to avoid importing out-of-scope. |
| `JS/components/fields/select-base.component.js`, `select_utils.js` | Datasource metadata, annotated composite keys/descriptors, selection callback, stale request guards. |
| `JS/components/fields/multiselect.component.js`, `check-box.component.js` | Existing list instructions/selection path contracts. |
| `JS/components/containers/templates/selectable-card.component.js` | Card record identities, secondary field children, selection instructions. |
| `JS/components/containers/templates/simple-table-select.component.js`, `listview/list-view.component.js` | Table routing, composite-key setup, ListView selection; promoted filters are a separate unsupported path. |
| `JS/components/widgets/unsupported.component.js` | Established explicit unsupported presentation and registration behavior. |
| `CORE/components/ComponentTypes.kt`, `ComponentRegistry.kt` | Additive type and producer registration. |
| `CORE/components/containers/DataReference.kt`, `Container.kt`, `ListViewComponent.kt` | Container precedent and current table model. |
| `CMP/ComponentRenderers.kt`, `containers/DataReferenceRenderer.kt`, `containers/ListViewRenderer.kt` | Default registry, delegation/layout precedent, table interaction. |
| `UI/controls/form/Table.kt`, `CMP/fields/CheckboxRenderer.kt` | Existing table API and Checkbox interaction/read-only gaps to correct only as necessary. |
| `samples/base-cmp-app/.../ui/screens/createcase/CreateCaseViewModel.kt` | Existing demo case picker; no replacement required. |
| `samples/android-compose-app/build.gradle.kts`, `.../AndroidComposeActivity.kt` | Published Maven dependencies; current `defaultHttpClient()` usage must match the engine API. |
| `SWIFT_UI/Renderer.swift`, `Containers/Container.swift`, `Fields/DropdownComponentView.swift`, `Fields/FieldViewWrapper.swift` | Independent SwiftUI dispatch and existing Dropdown; disabled rendering is currently opacity-only. |
| `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/` | Case/assignment/data-view routing and request-body assertions. |
| `samples/swiftui-components-app/UITest/Mocked Application/Network/` | Separate Swift test routing; shared JSON alone does not register a new case. |

### Current Behavior

ObjectReference is absent from the current registries. The draft registers a JS adapter, Kotlin container, and CMP renderer, but predates the canonical resource location and current lifecycle fixes. Its blanket `readonly-multi` text routing makes read-only Cards/tables unreachable; key normalization and async guards also need correction. Full evidence and pinned upstream references are in [research.md](research.md).

CMP already has the generated child controls. Native SwiftUI lacks several of them; wrapper recognition must not be confused with full child support. Android native uses the CMP renderer but consumes Maven artifacts, so a project-module build alone cannot validate it.

## Proposed Design

### 1. Metadata acquisition and support matrix — prerequisite

Obtain a Pega case and record case-create, option-load, selection/refresh, submit, and persisted-display responses. Use synthetic/sanitized identities with referential consistency. Add provenance to `test/src/commonMain/composeResources/files/responses/README.md`; use fixture names derived from the captured case rather than inventing case-class identifiers now.

Capture single Dropdown/Autocomplete, multiple Combobox, persisted display, and a parameter change first, including the US1 identity examples below. Extend presentation coverage to Cards, Checkbox Group, and editable/read-only tables. Include case and data targets. For each Pega version mark a combination as captured/verified, unavailable, or unverified. A CDN profile alone proves neither availability nor support.

The initial US1 evidence gate includes data and case targets, a nested relationship, a composite-key identity, preselected replacement, and required-empty validation, with expected submitted identities/destinations. US1 server-contract acceptance requires those captured examples; missing examples remain explicit blockers, and helper tests alone do not establish compatibility. Later captures extend presentation coverage rather than defer US1 identity prerequisites.

Gate: no metadata-sensitive implementation branch is accepted without a corresponding captured example or an explicitly justified contract-level test. Never transform DataReference JSON into purported platform-produced ObjectReference fixtures.

### 2. Adapter and registries — US1/US2 vertical slices

Add `JS/components/fields/object-reference.component.js` extending `ContainerBaseComponent`, plus `object-reference-utils.js`. Import/register it in `JS/mappings/sdk-pega-component-map.js`. Follow current method/lifecycle conventions; adapt useful draft portions, not its whole commit or unrelated PR changes.

Flow: raw metadata + resolved/inherited props → normalized configuration → child metadata → `pConn.createComponent(...)` → `reconcileChildren(...)` → wrapper props → shared native model → default/native renderer.

Keep property representations explicit: annotated references for children that expect annotations; normalized relative paths only for lookup/relationship APIs; leaf names only for record-field access. Preserve indexed page context and mapped case IDs. Do not replace a configured primary key with guessed `pyGUID` or truncate composite keys. Preserve descriptors and all associated-key assignments. Selection remains owned by child actions/list instructions, not duplicated by the wrapper.

Add `CORE/components/containers/ObjectReference.kt`: `ObjectReferenceComponent : ContainerComponent, HideableComponent`. Store `visible`, `label`, and `isDisplayOnly` in mutable state, using existing `applyProps` helpers. Default to visible, empty label, and non-display-only. Add `ComponentTypes.ObjectReference` and alphabetically ordered registration in `ComponentRegistry`/`DefaultRenderers`.

### 3. Routing, read-only behavior, and unsupported states

Routing details are normative in [contracts/object-reference.md](contracts/object-reference.md). Normalize Combobox by selection cardinality. Editable selection uses existing children; read-only Cards/tables retain their child route and selected-record source. Text-only multiple references generate stable display children with the correct indexed context.

Single text-only display uses existing display primitives; no interactive navigation is promised. `hideLabel` controls the wrapper heading and child labels to prevent duplicates. The CMP renderer delegates visual children and uses a wrapping arrangement for multiple text values rather than the draft's unbounded `Row`.

Minimal single-reference text-only/read-only routing and saved-label acceptance belong to US1; multiple text display belongs to US2. US4 extends those existing display paths with read-only Cards/tables. The US1–US3 demo can therefore inspect saved results for both cardinalities.

Excluded/unknown modes and malformed required identity/path metadata produce an explicit existing `Unsupported` child and sanitized diagnostic, not Autocomplete fallback or empty success. Follow the existing Unsupported constructor/manager lifecycle to avoid duplicate added notifications. A valid empty selection produces an empty display, not an unsupported state.

Do not forward review-persistence authoring flags into an editable review control. In review/display-only contexts render the noneditable supported reference representation; if that representation requires an excluded capability, show Unsupported. Ordinary assignment editing remains available even if unused advanced authoring settings are present.

### 4. Dynamic loading, event ownership, and guards — US3

For selectable children use their current datasource loader/stale-response guards. Parameterized CheckboxGroup requires wrapper-owned loading: track a generation plus context/reference/parameter signature; repeated notifications do not issue duplicate in-flight requests. On new parameters clear obsolete options; on completion require alive/visible state, matching generation, and matching context. Accept only array-shaped records, preserving valid falsy keys such as zero. After failure publish empty current options and retain failed state for that signature. Ordinary notifications with unchanged datasource, parameters, context, and visibility do not retry. Start a new request only when datasource/parameters change, relationship context changes, or the field becomes visible after being hidden. No retry button or automatic rejection retry loop is introduced.

Invalidate outstanding generations on hiding, changing context, changing loader mode, and destruction. Reuse `updatePConnAndResubscribeIfContextChanged` and reset context-local caches. Avoid sensitive parameter values in logs.

Trace selection actions first: Autocomplete/Dropdown use existing `onRecordChange`; Multiselect, Checkbox, Cards, and ListView do not all consume that callback today. Where captured examples require wrapper-dependent refresh, add optional callback support after successful child actions without replacing existing instruction logic or causing duplicate refresh. Guard refresh by valid view/context and existing implicit-refresh behavior. Prove invocation count and submitted identity.

Consume collection `ClickItem` at its owning boundary where the draft fix is necessary; do not broadcast a card index to nested field controls. Validate index bounds and disabled/read-only state before mutations. Regression-test existing DataReference cards/checkboxes.

### 5. Necessary existing-control corrections — US4

All control changes are limited to satisfying reference semantics:

- Checkbox Group: enforce disabled/read-only UI and event guards; do not render multi-record display through boolean Yes/No labels.
- Tables: current `ListViewComponent` has no interaction-state props and `Table` has no disabling contract. Carry optional `disabled`/`readOnly` props (default false) through the JS ListView/core/renderer and add a default-enabled Table parameter if needed. Suppress selection controls/callbacks for noneditable states. Keep existing editable behavior and preserve source compatibility with defaults; document any public composable signature change.
- No promoted-filter renderer is added. Metadata that requires that separate unsupported path is explicitly unsupported; ordinary tables remain supported.
- Preserve Cards presets/secondary fields and selected-record read-only source; no Map/Insight implementation is introduced.

### 6. Samples and platform boundaries — US5

- **Android/iOS CMP**: use default registration and existing `Create` picker. Change demo configuration only through documented local environment setup. Exercise light/dark, narrow screen, keyboard, and hide/show transitions. Android mocked device acceptance is automated; iOS CMP must be demonstrated through its real WKWebView/framework path, not inferred from Android.
- **Android native Jetpack Compose**: publish the four SDK modules using existing publication and build the sample against the local version. Correct stale `defaultHttpClient()` usage to `defaultCallFactory()` if confirmed by build; keep its sample authentication conventions. Do not change dependencies to project modules merely to make smoke checks pass.
- **Native SwiftUI**: add `SWIFT_UI/Containers/ObjectReferenceComponentView.swift` using `ObservableComponent`, wrapper visibility, display heading, and delegated children. Dispatch before generic `ContainerComponent`. Disable delegated interaction when existing child metadata says disabled/read-only; an optional scoped fix to the existing Dropdown/wrapper is permitted, not a new child type. Preserve explicit unsupported rendering for absent child views. Extend existing Swift POST/PATCH/generic mock routing only for the captured Dropdown case, with submission assertions. Build the real sample and the mocked `UITest` target that shares UI sources.

### 7. Implementation ordering and handoff

1. Acquire/validate demo metadata and fixture provenance; register request routes/assertions.
2. Implement single selector adapter + model + CMP registry/renderer and US1 tests.
3. Implement multiple Combobox contract and US2 tests; prove submissions.
4. Implement parameter/race/context/refresh guards and US3 tests.
5. Complete Cards/Checkbox/tables/read-only paths and necessary control corrections with US4/regression tests.
6. Verify primary Android/iOS CMP demo, then published Android native and limited SwiftUI paths.
7. Complete support matrix, release documentation, and reproducibility evidence.

Each step has an independent acceptance slice. `/speckit-tasks` will expand this into ordered path-specific tasks; this planning run does not create `tasks.md` or implement source changes.

## API and Compatibility

- Additive public `ComponentTypes.ObjectReference`, `ObjectReferenceComponent`, default producer, and `ObjectReferenceRenderer`. Existing integration entry points are unchanged.
- Wrapper events are not new public events; child events remain the source of selection operations. No PCore endpoint or bridge protocol is invented.
- New resource files are ordinary bundled Compose resources; no symlinks/staging tasks or alternative `scripts/` tree.
- Conditional ListView/Table interaction props default to current editable behavior. Public composable parameters need defaults and release documentation; no selection-mode enum expansion is planned.
- Default arguments preserve Kotlin source compatibility, not necessarily binary compatibility. Retain the original public Table signature via a delegating overload if the implementation changes its signature; verify rebuilt consumer artifacts/framework exports before release.
- New SwiftUI wrapper is sample-only, not a new packaged SwiftUI component library. Full CMP presentation support is not advertised for native SwiftUI.
- Release notes describe support/limitations and resource/API additions in the version selected by maintainers; do not assign a release version or upgrade dependencies during this feature.

## Test Strategy

**User revision**: Standalone JS tests have been discarded. The Node test-suite proposal below is superseded; use existing Android instrumented/Kotlin/resource tests and JS syntax checks without introducing new test types.

| Scenario | Test type | Location/command | Expected result |
| --- | --- | --- | --- |
| Normalization, key/path contracts, routing and props | Mocked JS | `engine-webview/src/jsTest/object-reference.test.mjs`; Node command in quickstart | Exact child configs/props; annotation and cardinality preserved. |
| Context changes, hide/destroy, option races and failures | Controlled async JS | Same Node suite | Obsolete completions ignored; subscription changes once; no duplicate in-flight loads; later load recovers. |
| Core props/default registry/children | Kotlin JVM | `core/src/commonTest/.../components/containers/ObjectReferenceTest.kt` (new); `:core:jvmTest` | Observable wrapper state/defaults and child hierarchy correct. |
| Packaged JS and imports | JVM/resources | Extend `engine-webview/src/jvmTest/.../WebViewResourcesTest.kt`; `:engine-webview:jvmTest` | Adapter/helper/import mapping are bundled under canonical paths. |
| US1–US4 selection/submission/validation | Real Android WebView with mocks | `ANDROID_TEST/cases/ObjectReferenceTest.kt` (new), shared response handlers; managed test command | Exact content/page instructions, field state, rows/cards, persisted records. |
| Existing reference/selector behavior | Android regressions | Existing DataReference/Autocomplete/parameter tests via managed suite | No regression for changed shared paths. |
| Primary iOS CMP demo | Xcode build + live/manual | `samples/ios-cmp-app/iosApp.xcodeproj` and quickstart | All five P1 demo steps; recorded screenshots/results including read-only output. |
| Published Android native | Build + device smoke | Local publish then `:samples:android-compose-app:assembleDebug` | Newly built artifacts consumed; correct selected reference persisted. |
| Limited native SwiftUI | Existing UI test + sample build | `samples/swiftui-components-app/UITest/UITest.xcodeproj`, `UITest` scheme | Dropdown wrapper renders/saves; absent child remains explicitly unsupported. |
| Pega version claims | Captured/live acceptance | Per-version support matrix, fixture provenance | Verified/unavailable/unverified separated; old components regression-protected. |

For each version supplying corresponding metadata, minimum compatibility acceptance includes single selection/replacement/submission, multi add/remove/submission, parameter refresh, and persisted read-only display. Verified requires successful scenario execution on the recorded Pega/CoreJS version and platform with saved identities checked. Unavailable requires recorded environment/authoring evidence that the configuration cannot be supplied; missing access/capture/execution is Unverified. Keep platform entries separate and do not infer feature support from regressions. Full compatibility acceptance is a later integration gate, not a prerequisite for the first CMP demo.

Node test setup uses `.mjs` outside production resources and `node --experimental-detect-module --test engine-webview/src/jsTest/object-reference.test.mjs`. Mocks cover manager, PConnect, and PCore only; they do not prove real annotation/server semantics. No npm package scope change is needed.

Full commands/prerequisites and expected outcomes are in [quickstart.md](quickstart.md). Device/CDN/Xcode constraints are reported, not waived. Do not run builds merely to validate this documentation-only planning stage.

## Documentation Plan

- [ ] Update root supported-component list with precise modes and native SwiftUI limitations.
- [ ] Add `docs/object-reference.md` with support matrix, sample/demo setup, fallback and known limitations; link from module and sample READMEs.
- [ ] Update `docs/configure-sample-mobile-apps.md`/`docs/setup-sample-pega-app.md` with captured demo authoring/setup instructions without customer environment values.
- [ ] Update `engine-webview/README.md` with the standalone Node test command and `test/.../responses/README.md` with fixture provenance.
- [ ] Update SwiftUI README with limited wrapper/Dropdown support, unsupported children, and framework/sample verification steps.
- [ ] Correct affected Android integration examples if the stale client factory call blocks this feature's native sample build.
- [ ] Add release documentation for the maintainer-selected version, including additive public surface and conditional interaction-state corrections.

## Risks and Alternatives

- **Unknown server metadata**: acquire first; no fabricated fixture contract. An unavailable version combination stays unverified/unavailable, not silently dropped or claimed supported.
- **Upstream differences**: use pinned Angular/React sources as evidence and captured data as the deciding contract; do not copy advanced capabilities or blanket fallback behavior.
- **Shared child event/validation gaps**: make optional defaults-preserving corrections only where ObjectReference requires them and prove old DataReference behavior.
- **Native SwiftUI expectations**: dedicated wrapper improves recognition but does not supply missing views; support guide and an explicit unsupported test prevent parity claims.
- **Artifact freshness**: Android native Maven dependency verification follows publish, with version checked; building project-linked CMP alone is insufficient.
- **Alternative rejected—cherry-pick whole draft**: old paths, unrelated PR scope, unreachable read-only branches, incomplete persistence and races.
- **Alternative rejected—new standalone reference UI**: duplicates existing controls and expands scope, especially SwiftUI.
- **Alternative rejected—single Autocomplete fallback**: changes multiple-reference cardinality and risks wrong submission.

## Planning Validation

Post-design constitution check: PASS with no exceptions. Product scope and design decisions are resolved in research/contracts. Remaining external evidence is tracked as the first implementation gate, not as assumed metadata. Exact fixture names and case IDs are to be recorded upon capture.
