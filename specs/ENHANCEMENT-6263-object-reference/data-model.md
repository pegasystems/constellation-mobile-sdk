# Data Model: ENHANCEMENT-6263 ObjectReference

**Feature**: [spec.md](spec.md)

## Entities

### Normalized Reference Configuration (JS internal)

- **Purpose**: Stable adapter input separating presentation, cardinality, interactivity, and property context.
- **Fields**: `presentation` (normalized supported child route), `cardinality` (single/multi), `displayMode` (existing field convention), `readOnly`, `disabled`, `visible`, `label`, `hideLabel`, `referenceType` (Case/Data), annotated value/display/list/key references, target class, datasource/reference list, resolved parameters, descriptors, composite-key references, columns/secondary fields/images as applicable.
- **Constraints**: Identity/path information is never inferred from a label or guessed key. Full annotated references and leaf record-field names are distinct. Unsupported/invalid branch is explicit; valid empty values are allowed.
- **Relationships**: Produces generated child metadata; references current PConnect context.
- **Lifecycle**: Rebuilt from raw metadata + inherited/resolved config on updates; do not retain raw mutable state across contexts without validation.

### ObjectReferenceComponent (native public wrapper)

- **Purpose**: Registered container for generated existing components.
- **Fields**: inherited container `children`; observable `visible: Boolean = true`, `label: String = ""`, `isDisplayOnly: Boolean = false` with private setters updated through props. Inherited component metadata remains intact.
- **Relationships**: Children are existing selectors/templates/display fields or Unsupported. Parent/child relations follow ComponentManager/container rules.
- **Lifecycle**: Created through registry, updated by bridge, removed with normal container teardown. No duplicate native selection state or new wrapper selection event.

### Generated Reference Child

- **Purpose**: Own selection/rendering using existing component contracts.
- **Fields**: child type/name/config; stable identity compatible with reconciliation; correct context/page reference; cardinality and instruction paths; datasource metadata and associated-field assignments. Read-only/display children use persisted records rather than new datasource choices.
- **Relationships**: Owned by wrapper; optional existing callback refreshes dependent metadata after child actions.
- **Lifecycle**: Reused by name/type when compatible; replaced/destroyed on route/visibility changes. Indexed text children must not keep a removed record's context.

### Selected Relationship (platform-owned)

- **Purpose**: Saved reference identity for one record or a list of records.
- **Fields**: canonical key(s), display/descriptor fields when supplied, relationship destination. Actual shape comes from captured metadata/responses, not a new SDK schema.
- **Constraints**: Preserve identity even with duplicate labels and falsy valid keys. Single replacement does not become a list append. Multi insert/delete instructions remain child-owned and retain unchanged selections.
- **Lifecycle**: Loaded/preselected → edited by child actions → assignment submission → persisted display. Out-of-assignment review edits are not supported.

### Parameter Load State (JS internal, CheckboxGroup only when wrapper loads)

- **Fields**: generation, context key, request signature, status (`idle/loading/ready/failed/inactive`), normalized options, current in-flight request identity.
- **Constraints**: Signature includes datasource and resolved parameters within context; logs never include parameter values. Completion requires alive/visible/matching generation and context. Failure clears published current options and does not trigger automatic retries. Retain failed state for the signature; unchanged notifications issue zero additional requests.
- **Lifecycle**: Starts/invalidates on relevant input changes; inactive on hide/destroy. After failure, reload only when datasource/parameters change, relationship context changes, or visibility transitions hidden→visible; no new retry UI.

### Support Evidence Entry (documentation/test metadata)

- **Fields**: Pega/CoreJS version, captured case/configuration, mode/presentation/target type, fixture provenance, expected saved selection, platform path, status (`verified/unavailable/unverified`), command/manual result.
- **Relationships**: Links fixture and acceptance scenario to published support claims.
- **Constraints**: CDN presence/build success alone is not a verified feature entry.

## State Transitions

| Current state | Event | Next state | Invariants |
| --- | --- | --- | --- |
| Uninitialized wrapper | Supported metadata | Active children | Register wrapper once; preserve cardinality and identity. |
| Active children | Equivalent config/context | Updated/reused children | No duplicate children or duplicated instructions. |
| Active children | Presentation change | Reconciled new route | Destroy incompatible children; no stale validation. |
| Active children | Invisible | Hidden, no active children | Invalidate loads; hidden required fields are inactive. |
| Hidden | Visible | Current children | Rebuild from current state, not stale options. |
| Any active route | Unsupported/malformed config | Explicit Unsupported child | No cardinality-changing fallback or false empty success. |
| Idle/ready/failed load | Datasource/parameter/context change or hidden→visible | Loading | Clear obsolete options; increment generation; deduplicate same in-flight request. |
| Loading | Matching successful response | Ready | Publish current options only. |
| Loading | Matching failure | Failed | Publish empty options; no retry loop. |
| Failed | Unchanged store notification | Failed | Retain failed signature; no additional request. |
| Loading | Obsolete response | Unchanged current state | No current options/context update. |
| Any load | Hide/context switch/destroy | Inactive/new-context state | Outstanding generations invalidated. |
| Active wrapper | Destroy | Removed | Unsubscribe, destroy children, no later native updates. |

## Serialization and Compatibility

- Existing JSON bridge props use `{children:[{id,type}], visible, label, isDisplayOnly}`; internal configuration/functions/PCore objects are never serialized.
- Missing wrapper fields reset to documented defaults through `applyProps`; the adapter sends an explicit current-state snapshot.
- Child values/events use existing contracts, not a parallel ObjectReference schema. See [contracts/object-reference.md](contracts/object-reference.md).
- Conditional existing ListView interaction flags are optional with default false; any Table enabled parameter defaults true. No persisted database or migration is introduced.
