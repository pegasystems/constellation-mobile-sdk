# Data Model: Engine Lifecycle Race Fix

## Engine Lifecycle State

The implementation needs one internal lifecycle state for each engine instance:

| State | Meaning | Allowed callback behavior |
| --- | --- | --- |
| Active | The engine is configured and may initialize, process bridge messages, and deliver events. | Continue existing behavior. |
| Destroyed | `destroy()` has been called and teardown has started or completed. | Return safely; do not access cleared resources or emit events. |

### Transitions

```text
Active --destroy()--> Destroyed
Destroyed --configure()/performAction()/callback--> no resurrection; existing API error behavior may be preserved where applicable
```

The state is internal and is not exposed as a new public API or serialized data.
