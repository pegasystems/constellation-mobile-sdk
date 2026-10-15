# Research Notes: ENHANCEMENT-6263 ObjectReference

**Feature**: [spec.md](spec.md) | **Date**: 2026-10-12

## Questions

Resolve adapter ownership, draft reuse, paths/identity contracts, read-only routing, unsupported behavior, async/event lifecycle, test infrastructure, and sample scope. Product scope has been clarified in the conversation and specification.

## Findings and Decisions

### R1 — Adapt metadata using existing children

**Evidence**: Angular ObjectReference and helpers at `aeec6ab9236b98600dc7c85fe86b8d05bc9d1576`; React counterparts at `44a8f4d3f5e1e436a7ab88c5e7c37d22107eac69`, pinned paths in [specify-input.md](specify-input.md). Both create existing selectors/templates; the application repositories consume component packages.

**Decision**: A JS container adapter, lightweight shared Kotlin container, and delegating CMP renderer. No new reference UI primitive or missing SwiftUI child library.

**Rationale**: Fits existing DataReference architecture and user's CMP demo priority.

**Alternatives rejected**: Standalone selection logic/native reference controls duplicate action and instruction semantics. Full upstream parity exceeds approved scope.

### R2 — Reuse draft selectively on current master

**Evidence**: Draft `ddd58848a9d9d63861c33e9b7979884a41b1b8bc`; current `engine-webview/README.md` defines canonical resources. `base.component.js` has context resubscription; current selector loaders have request-generation protection.

**Decision**: Port the adapter/model/renderer shape, correct routing/key/lifecycle gaps, and reference pinned source provenance. Do not cherry-pick unrelated PR changes or restore old `scripts/` paths.

**Rationale**: Draft syntax/compilation status does not prove native readiness; current fixes must remain intact.

**Alternatives rejected**: Whole-commit application introduces obsolete paths/assumptions and lacks acceptance coverage.

### R3 — Preserve path and composite-key representations

**Evidence**: `select_utils.js` consumes annotated composite-key references using `isSelfReferencedProperty` and property extraction. Draft helpers instead return leaf names and retain `config.value` even when the selected key changes. Angular/React helper algorithms also differ. Child Multiselect/Checkbox/Card logic owns selection instructions.

**Decision**: Separate annotated property references, normalized relative lookup paths, indexed context paths, and leaf record keys. Preserve full annotated composite-key references for selectors and leaf keys only where list/table APIs require them. Mapped case ID resolution follows existing namespace/environment utilities.

**Rationale**: Leaf strings cannot substitute for relative assignment paths; display labels cannot substitute for identity.

**Alternatives rejected**: Guessed `pyGUID`, fuzzy substring key matching, or dropping bracket context without consumer-specific evidence.

### R4 — Read-only routing must preserve the authored visual presentation

**Evidence**: Draft routes every `readonly-multi` to text before Cards/tables. Existing `SimpleTableSelect` chooses a read-only SimpleTable path for multiple selection; Cards source selected values when read-only. `SemanticLink` only displays text in CMP and is absent in native SwiftUI.

**Decision**: Separate cardinality, interactivity, and presentation. Route read-only Cards/tables before text-only display; only text configuration gets text children. No navigation action is added. Use stable generated display names/context and a wrapping CMP layout.

**Rationale**: Avoids losing columns/secondary fields and meets FR-006 without introducing components.

**Alternatives rejected**: Always use SemanticLink, or implement full web reference-detail screens.

### R5 — Explicit unsupported behavior instead of cardinality-changing fallback

**Evidence**: Existing `widgets/unsupported.component.js` and mapping provide a native-visible unsupported path; its `init/updateSelf` perform registration. Draft catches child construction failure and returns no child, or falls back to Autocomplete.

**Decision**: Create an explicit Unsupported child through the existing manager/construction convention for unknown/excluded/invalid branches. Do not add it twice. Empty valid selections remain valid empty display. Review-mode persistence settings do not enable editable review interactions.

**Rationale**: Makes unsupported behavior honest and avoids silent data loss. Normal assignment modes are unaffected by merely unused advanced authoring flags.

**Alternatives rejected**: Empty child tree as success, single-selector fallback for multi selection, editable review without a persistence transaction.

### R6 — Lifecycle and async loading

**Evidence**: `BaseComponent.updatePConnAndResubscribeIfContextChanged`, container visibility teardown, current `SelectBaseComponent.latestOptionsRequestId`. Draft Checkbox loader compares request signatures but not response generation and does not send cleared options on failure.

**Decision**: Context-local signature/generation for wrapper-owned Checkbox loads; invalidate on params/context/hide/destroy/loader-mode changes. Matching in-flight requests are deduplicated. Publish empty current options on failure and retain failed state for that signature. Unchanged store notifications do not retry; reload only on datasource/parameter change, relationship-context change, or hidden→visible transition. No retry UI is added. Child-owned loaders remain child-owned.

**Rationale**: Signatures alone cannot prevent an old completion overwriting newer data or a new form context.

**Alternatives rejected**: Request-key-only cache; unguarded fire-and-forget; implicit endless retry.

### R7 — Narrow existing-child corrections

**Evidence**: Autocomplete/Dropdown use `onRecordChange` via SelectBase, but collection child implementations do not uniformly consume it. ListView's core/renderer lacks disabled/readOnly state. SwiftUI `FieldViewWrapper` uses opacity for disabled, not an interaction guard. Cards/Checkbox collection events can propagate to non-owning controls.

**Decision**: Optional callback plumbing only for evidence-backed dependent refresh, after successful child actions; index/interactivity guards at event owner. Carry defaults-preserving table interaction state and suppress selection when needed. Enforce disabled existing SwiftUI Dropdown interactions within the limited wrapper/example.

**Rationale**: Reusing children does not establish correct state/event behavior automatically.

**Alternatives rejected**: Duplicating instructions in wrapper, treating visual dimming as disabling, broad unrelated control refactor.

### R8 — Standalone Node built-in harness

**Superseded by user instruction**: The standalone JS test file has been removed. Do not implement this harness; retain existing test types and syntax checks instead. The following records the original planning rationale only.

**Evidence**: No repository Node package/test runner. `engine-webview/build.gradle.kts` has Kotlin targets/tests; JS is bundled as browser ES modules. Focused research with Node v24.11.1 successfully imported BaseComponent/ContainerBaseComponent/ReferenceComponent/Utils and ran a built-in smoke test with syntax detection. These dependencies do not require PCore during module evaluation; invoked utility methods can require it.

**Decision**: New `engine-webview/src/jsTest/object-reference.test.mjs`, built-in `node:test`/assert, mocked manager/PConnect/PCore, command `node --experimental-detect-module --test engine-webview/src/jsTest/object-reference.test.mjs`. Keep suite outside Compose resources and leave production package scope unchanged. Use dynamic imports if mocks must exist before module evaluation; serialize shared-global tests and restore globals.

**Rationale**: Tests production source without npm dependencies, custom loaders, or packaging changes. Node 24 is a test-only prerequisite.

**Alternatives rejected**: New npm framework, tests under production resources, copied source, unsupported `--experimental-default-type=module` on the inspected Node runtime.

**Limit**: Mocked Node tests do not prove PCore annotation semantics, WebView integration, server persistence, or platform/version compatibility.

### R9 — Sample readiness and validation strategy

**Evidence**: Android/iOS CMP use shared base app; Android native calls CMP `Render()` but uses Maven dependencies. Existing CMP `Create` picker is in `ui/screens/createcase`. SwiftUI renderer and `UITest` share source directories; Swift mocked network routes enumerate case IDs independently. Existing workflows document Android device tasks and SwiftUI UITest invocation.

**Decision**: Automate shared behavior through Android WebView fixtures; explicitly build and demonstrate iOS CMP. Publish before Android native smoke validation; correct stale factory API usage if blocking. Add only SwiftUI wrapper/Dropdown acceptance and matching mock routes. No workflows are changed.

**Rationale**: Neither Android success nor framework compilation proves iOS CMP functionality; JSON capture alone does not make the Swift mocked app understand the new case.

**Alternatives rejected**: Claim full SwiftUI parity, bypass published-artifact integration, infer iOS demonstration from common code.

## External Evidence Gate

No product/design question remains unresolved for planning. Before metadata-sensitive implementation, acquire and record:

1. Real/sanitized ObjectReference case configurations and expected submission identities/paths, including parameters, nested and composite-key cases.
2. Actual availability by Pega 24/25/26 and matching existing CDN/runtime profiles; distinguish unavailable from unverified.
3. The demo case identifier and setup/authoring instructions, without committing credentials or customer-specific data.

These are explicitly required inputs, not inferred answers. If evidence reveals a new unsupported mode or scope conflict, update this document/contracts and clarify before adding that behavior. Design planning is complete; live/runtime verification has not run.
