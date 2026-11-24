# WebView Engine

`engine-webview` provides the Android and iOS WebView implementations of the SDK engine.

## Engine lifecycle

`ConstellationSdkEngine.destroy()` is terminal for an engine instance. Call it from
the host lifecycle when the engine is no longer needed. Initialization, bridge
events, and platform callbacks that arrive after destruction are ignored safely;
callers do not need to coordinate late WebView or WKWebView callbacks.


## Case-summary refresh

After bootstrap, `init.js` sets `deferUpdateCaseSummaryView` to `false` because embedded
forms do not render case summaries. If CoreJS's private `updateFeatureMap` method is
unavailable, it logs a warning and continues with the runtime's existing behavior.
There is no native configuration option. Exceptions from an existing method follow
the normal initialization-error path.

## Console logging

Engine diagnostics and supported WebView console messages use the shared
[debugging and inspection setting](../core/README.md#debugging-and-inspection).

Android maps WebView `TIP` to verbose, `LOG` to info, `DEBUG` to debug,
`WARNING` to warning and `ERROR` to error. WebView may report different
JavaScript console methods as `LOG`, so the original method cannot always be
distinguished. The iOS bridge maps levels 1/2/3/4 to error/warn/info/debug.

Android applies inspection at engine configuration and reads the setting for
embedded configuration at page load; iOS applies both at action startup.

## Bundled JavaScript Resources

The [`src/commonMain/composeResources/files/scripts/`](src/commonMain/composeResources/files/scripts/) directory is the canonical source for the JavaScript bridge and engine page.

Edit the scripts in that directory directly. Compose Multiplatform packages them with these resource paths:

```text
files/scripts/index.html
files/scripts/init/init.js
files/scripts/bridge/
files/scripts/dxcomponents/
```

Keeping the ordinary source files in the conventional Compose resource directory avoids platform-dependent symlink behavior and additional resource-staging tasks. The Compose Multiplatform resources plugin includes them in Android, iOS, and JVM artifacts.

## Conditional-view validation

The bridge removes a View using its registered `viewName` and page reference, not
its data-reference `config.name`. These names can differ; using the latter can
remove a parent form and its required fields when a conditional variant is hidden.
The compatibility guard applies during property updates and component teardown.
It does not rename metadata, replace field validation, or affect Pega 24 runtimes
without context-tree removal. Pega 26 visibility metadata is retained.

Selectable tables run `checkAndUpdate()` during initialization so their validation
metadata and initial error state are populated before submission.

Run the focused bridge regressions from the repository root with Node.js 22.7 or newer
(no npm dependencies):

```bash
node --test engine-webview/src/jsTest/pconnect-helpers.test.mjs
```

These are mocked bridge tests, not Android/iOS acceptance coverage. Verify required
empty and answered selections, variant switching, and back navigation in the host
application before releasing a patched artifact.
