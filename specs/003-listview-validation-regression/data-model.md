# Data Model: ListView Validation and Data Reference Regression

## ListView props

| Field | Contract |
|-------|----------|
| `label` | Display text for the table label. |
| `validateMessage` | String; absent or JSON null is treated as empty by Kotlin. |
| `required` | Boolean; bridge defaults absent/null config to false. |
| `disabled` | Boolean; bridge defaults absent/null config to false. |
| `selectionMode` | Single or multi selection. |
| `items` | Rows with selected state and display fields. |

Updates propagate through the bridge to observable Kotlin state and the Compose
renderer. A disabled selection control cannot change the selected rows.

## Banner message

`Message(message: String, isFieldMessage: Boolean)` represents a localized message.
Field-validation messages use `true`; page and HTTP messages use `false`.

## Versioned recorded scenario

The Pega version, endpoint, case/assignment identity, and request body select a
recorded response. Selected record keys and expected submissions identify the
scenario's reference selections. Shared legacy fixtures remain separate.
