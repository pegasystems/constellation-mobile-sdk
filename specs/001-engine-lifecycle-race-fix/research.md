# Research: Engine Lifecycle Race Fix

## Decision 1: Guard callbacks instead of catching teardown exceptions

- **Decision**: Use an explicit active/destroyed state check before each asynchronous callback accesses engine state.
- **Rationale**: The reported failures are lifecycle invalidation races. Guarding the callback prevents both stale work and `requireNotNull` crashes, while preserving real active-path failures.
- **Alternatives considered**: Catch `IllegalStateException` around cleared state access; rejected because it masks lifecycle bugs and can leave partial work running.

## Decision 2: Cancel only engine-owned asynchronous work

- **Decision**: Keep the host-provided Android scope as the parent and add an engine-owned child job/scope for event delivery that is cancelled by `destroy()`.
- **Rationale**: The existing API documents caller ownership of the supplied scope. Cancelling it would be an unexpected side effect for other host work.
- **Alternatives considered**: Cancel the supplied scope; rejected as an ownership violation. Do nothing; rejected because queued events can run after teardown.

## Decision 3: Clear callback routes during teardown

- **Decision**: Clear Android page-load callbacks and prevent bridge callbacks from forwarding after destruction; retain iOS delegate/message-handler removal and add safe late-message handling.
- **Rationale**: Clearing references reduces retained work, while guards cover callbacks already queued by the platform.
- **Alternatives considered**: Rely only on WebView/WKWebView delegate removal; rejected because platform callbacks can already be queued.

## Decision 4: No new public lifecycle API

- **Decision**: Strengthen the existing `ConstellationSdkEngine.destroy()` behavior without adding `ConstellationSdk.destroy()`.
- **Rationale**: This is the smallest compatible response to issue #155 and BUG-1009978.
- **Alternatives considered**: Add SDK-level destroy; deferred to a separate API proposal because it changes ownership and public lifecycle semantics.
