# Data Model: Shared SDK Console Logging

No persisted data or schema migration is introduced. Runtime state and message flow replace the previous per-engine logger model.

| Entity | Relevant state | Ownership and relationship |
| --- | --- | --- |
| SDK configuration | `pegaUrl`, `componentManager`; **no** `debuggable` | `ConstellationSdk.create` passes it to an engine; constructing another configuration does not affect global logging |
| SDK-level debug setting | One mutable Boolean, default `false`, exposed as `ConstellationSdk.debuggable` | One process-wide backing value in `core.Log`, visible to Android/JVM and Kotlin/Native threads; the latest assignment determines subsequent SDK log emissions |
| SDK logging boundary | Internal severity, tag, lazy routine message, optional throwable | `core.Log.v/d/i/w/e` owns the **only** filtering decision and calls an internal platform writer |
| Engine inspection/configuration operation | Direct companion-property read | Android inspection at configure, Android embedded configuration at page load, iOS inspection/embedded configuration at action startup; no retained engine-local Boolean |
| Platform console handler | Android `SdkWebChromeClient`; iOS registered `ConsoleHandler` | Maps supported forwarded levels to the shared logging boundary without storing a debug Boolean or instance-owned logger |
| Platform writer | Android priority/tag/throwable or iOS/JVM formatted stdout | Internal `expect/actual` function in core; no engine adapter, callback injection or filtering state |
| SDK-owned native diagnostic | Severity, tag, message producer, optional throwable and originating code site | Only `core.Log`; forwarded and native routine messages use the same global rule |
| Application debug choice | Explicit Boolean, SwiftUI plist value, or consumer-owned build setting | Samples retain their previous settings; consumers can choose build-mode initialization without SDK inference |

## State Transitions

1. **Process starts**: the shared value is `false`; SDK-owned routine messages are suppressed even before any SDK instance exists.
2. **Integrator assigns property**: `ConstellationSdk.debuggable = true` or `false` updates the one value; all subsequent SDK logging from every instance reads it. Assignments do not alter existing log records.
3. **Engine operations**: read the companion property directly when Android configures inspection or builds the page-load initialization payload, and when iOS applies inspection/builds the initialization payload at action startup. Keep the serialized `debuggable` field but no engine-local copy.
4. **View emits a supported console message or SDK emits a native diagnostic**: map to its existing severity and output convention; the core boundary decides visibility, then evaluates the lazy message and invokes the platform output if allowed. Native warnings and errors remain visible.
5. **Integrator assigns property after configuration**: native logging follows the new value and subsequent engine operations read it directly. The setter does not synchronize existing views. Mid-flow changes are not a supported integration pattern; set the property once before SDK creation.
6. **Engine destroyed**: view and handlers are released; the global value is not reset and remains in effect until another explicit assignment or process termination.

## Invariants

- There is exactly one source of mutable debug state. No `config.debuggable`, helper Boolean, per-instance logger state, or setter side effect from `ConstellationSdk.create` remains.
- Logging and engine inspection/configuration operations read the same global setting directly. No engine retains a debug flag; applications are expected to keep it constant during flows.
- Every SDK-owned Android direct platform-log call passes through the shared gate without losing native severity, tag, source details, or throwable stack trace. Independent host/application log calls remain outside it.
- No suppressed routine message producer is evaluated unnecessarily. All SDK warnings/errors, including malformed forwarded messages, remain visible for either setting.
- Supported custom-component messages inside SDK views follow native forwarding; WebKit's original console and unforwarded browser utilities do not.
- Tests changing the global value restore it in teardown so unrelated test runs have a deterministic default.
