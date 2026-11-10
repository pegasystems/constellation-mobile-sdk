# Branch Contracts

## ListView and Table

- JavaScript emits `required` and `disabled` as booleans from `configProps`;
  absent/null configuration becomes false. `validateMessage` defaults to an empty string.
- Kotlin `ListViewComponent` exposes these properties as observable state and
  the CMP renderer passes them to `Table`.
- `Table` requires `validateMessage`, `required`, and `disabled` arguments.
  Disabled row toggles, radio buttons, and checkboxes cannot change selection.
  Selection controls use Material's disabled colors. The label currently passes
  `disabled = false`; helper validation is hidden while disabled.
- `Label` accepts an optional nullable `fontWeight`, used for label and asterisk.
  Existing callers retain the default appearance; compiled consumers must rebuild.
- Changing validation alone does not require table data reload; after a selection,
  property errors are cleared only if the validation message is empty or absent.

## AlertBanner

`AlertBannerComponent.messages` is `List<Message>` rather than `List<String>`.
Each `Message` contains `message` and `isFieldMessage`. Existing consumers must
adapt to the new element type and recompile. CMP and SwiftUI display the text.

## Versioned fixtures

Version-specific requests use matching `dx/<version>/` fixtures and delegates.
Legacy shared routes remain shared; a scenario unavailable in the requested version
reports a missing response instead of falling back to another version.
