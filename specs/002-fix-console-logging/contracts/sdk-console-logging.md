# Console Logging Contract

## Public API and migration

`ConstellationSdk.debuggable` is a mutable companion property shared by **all** SDK instances in a process. It defaults to `false`, regardless of application build type. The latest explicit assignment controls subsequent SDK native logging; constructing or configuring an SDK instance does not change it.

```kotlin
ConstellationSdk.debuggable = BuildConfig.DEBUG // Android application's generated BuildConfig.
val config = ConstellationSdkConfig(pegaUrl = "https://example.test/prweb")
val sdk = ConstellationSdk.create(config, engine)
```

**Breaking change**: Remove `debuggable` from every `ConstellationSdkConfig(...)` call and `copy(...)` invocation (and any use of its previous third data-class component). Set the SDK companion property explicitly instead; leave it unset for default-off behavior. Kotlin named/positional constructors and prebuilt Swift frameworks must be rebuilt against the new API. In Swift, use `ConstellationSdkCompanion().debuggable = true` before SDK creation when inspection is needed; both Swift sample projects compile against the rebuilt framework with this accessor. iOS `ConsoleHandler(showDebugLogs: Boolean)` is removed; construct `ConsoleHandler()` and set `ConstellationSdk.debuggable` instead if calling this handler directly. Existing public engine and other helper constructors retain their signatures.

## Observable output

| SDK logging path | Global `debuggable = false` | Global `debuggable = true` |
| --- | --- | --- |
| SDK-owned native informational/debug/verbose, including SDK-owned direct Android platform-log calls and `core.Log.i` | Suppressed | Visible, with original platform level/tag/format |
| Already-forwarded console information/debug/verbose from SDK or custom scripts inside an SDK WebView | Not emitted to SDK native log | Emitted to SDK native log |
| SDK-owned native or forwarded warning/error | Visible with original platform level/tag/context | Visible with original platform level/tag/context |
| Underlying browser console, utilities not natively forwarded, independently logged host app or external resource provider | Unchanged | Unchanged |

The setting changes logging for existing SDK instances on their **next emission**; no instance recreation is needed. The SDK's shared `Log` facility is also used by some sample/app-authored code, so code that opts into that facility follows its filter; independently emitted host-app logs do not. The native filter is **not** a redaction guarantee for the real browser inspector, browser-only utilities, or host-provided logging.

Applications requiring debug-build-only logging can initialize the flag from their host build setting (`BuildConfig.DEBUG` or Swift `#if DEBUG`). Samples retain their previous explicit settings: SwiftUI uses its `Debuggable` plist value, and the other affected flows enable debugging unconditionally. The mutable SDK property does not prohibit logging in release.

## Inspection and embedded-engine configuration

Set the property **before `ConstellationSdk.create` configures the engine** and leave it unchanged during flows. Engines read the companion property directly without an engine-local copy: Android applies inspection at configuration and reads the flag for its embedded configuration at page load; iOS reads it for inspection and embedded configuration at action startup. The setter does not synchronize existing views. Changing it mid-flow is not a supported integration pattern, and logging/inspection/configuration are not guaranteed to change together. Android inspection is process-wide and may affect other WebViews. Browser-console output may remain visible in inspection tools.

## Internal delivery boundaries

- Keep one default-off volatile backing value in `core.Log`; the SDK companion property delegates to it. `Log.v/d/i/w/e` share a private filter and internal platform writer. Retain String `i/w/e` signatures and lazy routine-level overloads; no public output callback.
- Android calls the common facade for both SDK-owned native sites and `SdkWebChromeClient`; the core Android writer preserves native priorities, tags and throwable traces. Map `TIP` = verbose, `LOG` = info, `DEBUG` = debug, `WARNING` = warning, `ERROR` = error; preserve source detail on console errors and `onConsoleMessage` returning `true`. WebView may report different JavaScript console methods at the same level. Common calls previously emitted to stdout now gain native Logcat metadata.
- iOS's registered no-argument `ConsoleHandler` calls common methods directly without local filtering or injected output. Preserve `Console.js`, explicitly map 1/2/3/4 = error/warning/information/debug, retain the `JS:` prefix, unknown-numeric-level info fallback and malformed-input error. Debug forwarding intentionally gains a `D:` label; other iOS/JVM formatting remains unchanged.
- Leave bundled JavaScript, network/request behavior, host logging, externally supplied providers, and unrelated console utilities alone. Do not add sensitive log payloads.
