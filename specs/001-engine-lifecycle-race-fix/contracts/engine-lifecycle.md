# Engine Lifecycle Contract

`ConstellationSdkEngine.destroy()` is terminal for the engine instance.

- Calls made before destruction retain existing behavior.
- Callbacks already queued before destruction may arrive, but must be ignored safely.
- No engine event may be forwarded after destruction.
- Teardown must not cancel a caller-owned coroutine scope unless that scope is explicitly engine-owned.
- Calling `destroy()` more than once must remain safe.

This strengthens the behavior of the existing public method; it does not add a new public method.
