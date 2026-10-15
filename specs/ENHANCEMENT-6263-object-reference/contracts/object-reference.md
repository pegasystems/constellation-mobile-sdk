# ObjectReference Contracts

**Status**: Proposed additive SDK design; examples below are bridge-only synthetic examples, not captured DX metadata. Actual Pega metadata must be acquired before fixture implementation.

## Producers and Consumers

1. Platform PConnect raw/resolved/inherited configuration → JS ObjectReference adapter.
2. Adapter-generated child metadata → existing PCore `createComponent` and SDK child manager.
3. Adapter bridge snapshot → shared `ObjectReferenceComponent`.
4. Native model → default CMP renderer or limited sample SwiftUI wrapper.
5. Existing child UI events → child business actions/list instructions → existing assignment submission. Optional child callback refreshes dependent content; wrapper does not duplicate selection updates.

## Input Invariants

- Raw configuration includes mode/presentation and reference relationship metadata; resolved/inherited props provide current authoring flags, label, visibility, parameters, etc. Precedence follows existing component conventions; preserve raw property annotations when generating child metadata.
- `Combobox` + single means AutoComplete; `Combobox` + multi means Multiselect. No other unknown type is guessed.
- Mode and boolean normalization use established SDK conventions. Missing required mode/identity metadata is invalid unless captured platform evidence demonstrates a documented default.
- Preserve full selection-list/context/value paths, bracket indices, composite keys, descriptors, namespace/mapped case IDs, and target reference type. Callers that need leaf fields receive leaf fields; others retain annotated references.
- Case/data target differences affect metadata and identity; display label never becomes the key.

## Child Routing Matrix

| Metadata presentation/state | Child route | Contract |
| --- | --- | --- |
| Single editable Dropdown/AutoComplete (including single Combobox) | Existing corresponding selector | Current value/key path, descriptor/composite assignments, resolved datasource metadata, reference type/class, required/visibility/disabled, optional refresh callback. |
| Multi editable Combobox/Multiselect | Multiselect | Annotated/raw identity metadata retained; selection list normalized only for list-action API; preselected list/context and multi mode retained. |
| Multi editable Checkbox Group | Checkbox in multi mode | Correct selected list/key/display source; parameterized options normalized to `{key,value,text}` only after identity-safe lookup. |
| Cards single/multi, including read-only Cards | RadioButtons/Checkbox with card variant | Preserve proper presets region shape/secondary fields/images; read-only uses selected records and prohibits mutations. |
| Table/SimpleTable editable single/multi | SimpleTableSelect → existing table route | Preserve columns/presets, selection relationship, parameters, reference type; no promoted-filter implementation. |
| Read-only multiple Table/SimpleTable | Existing read-only SimpleTable route | Persisted records, requested columns, no selectable behavior. |
| Single text-only/read-only field | Existing SemanticLink or TextInput display primitive as configured | Display label/value, no navigation or selection; hide duplicate labels. |
| Multi text-only display | Stable existing display children | One child per persisted record; correct indexed context; wrapping layout; no record contents logged. |
| Review configuration requiring immediate persistence | Supported noneditable representation; otherwise Unsupported | Never expose edits whose save workflow is excluded. |
| SearchAndSelect/Map/EmbeddedInsightTable, required promoted filters, unknown/invalid route | Existing Unsupported child | Preserve explicit type/reason diagnostic; no Autocomplete fallback or empty success. |

Read-only and text-only are separate routing concepts. The adapter must not route all `readonly-multi` to text before evaluating presentation. Valid combinations are verified against captured version-specific metadata, not inferred solely from this design matrix.

## Bridge Output

Public type: `ComponentTypes.ObjectReference = ComponentType("ObjectReference")`.

Wrapper snapshot (illustrative synthetic child IDs):

```json
{
  "children": [{ "id": 101, "type": "Dropdown" }],
  "visible": true,
  "label": "Customer",
  "isDisplayOnly": false
}
```

Use existing ID/type serialization. The example does not define server responses or require an ID allocation scheme. Wrapper props are a complete current-state snapshot. Optional/missing fields have model defaults: visible true, empty label, display-only false. Current inherited metadata, parent relationships, and alternate design-system configuration stay in existing base contracts.

HideLabel is reflected in the effective wrapper/child labels; no new wrapper event protocol. `isDisplayOnly` means text-layout mode, not every noneditable Cards/table branch.

## Events and Interaction

- Existing child `updateValue`, focus, multi add/remove, and `ClickItem` events retain their public signatures.
- Event handlers reject invalid collection indices and disabled/read-only mutations before actions.
- Collection owner consumes its event; card selection must not forward a record index into nested collection controls.
- Optional selection callback runs after successful actions where a captured example requires dependent refresh. Do not assume all collection children already consume `onRecordChange`.
- Refresh uses existing actions/CoreJS conventions and checks active context plus nonempty target view. Respect implicit refresh to avoid duplicate loops. No new endpoints, locks, or review persistence transactions are introduced.
- Conditional `ListViewComponent.disabled/readOnly` state defaults false; conditional Table enabled parameter defaults true. Native and JS guards agree; defaults retain existing editable callers.

## Loading and Errors

- Child-owned loaders keep ownership. Wrapper Checkbox loader deduplicates matching in-flight requests; generation/context checks gate success and failure.
- New parameters/context, hiding, destruction, or loader-mode change invalidate old loads. Failure publishes empty current options and retains failed state for the request signature. Ordinary notifications with unchanged datasource, parameters, context, and visibility do not retry. Recovery starts a new request only on datasource/parameter change, relationship-context change, or hidden→visible transition; no retry UI is added.
- Invalid response shape is handled as a controlled load failure, not a fabricated record list.
- Unsupported/invalid config uses the existing Unsupported lifecycle and diagnostics. Child construction exceptions are not swallowed into a successful empty tree.
- Diagnostics may contain component ID, normalized mode/type, request status, parameter names/count, and sanitized error category. Do not log records, parameter values, customer data, or arbitrary error bodies.

## Platform Contract and Compatibility

- CMP platforms and Android native share model/default rendering. No platform-specific adapter forks.
- SwiftUI registers ObjectReference before generic container handling. Wrapper delegates existing children; editable Dropdown is its acceptance example. Missing child renderer remains explicit Unsupported; no full SwiftUI presentation parity claim.
- Existing fields/source sets remain compatible. Additive exports/resource registration require release notes; conditional public composable additions use default arguments and published artifacts/frameworks are rebuilt for verification.
- For public composable signature changes, preserve the original signature with a delegating overload where necessary; defaults alone do not guarantee compatibility for already compiled callers.
- Pega 24/25/26 support claims require per-version evidence. Existing-component regression compatibility is separately recorded.
