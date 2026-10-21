# WebView Engine

`engine-webview` provides the Android and iOS WebView implementations of the SDK engine.

## Engine lifecycle

`ConstellationSdkEngine.destroy()` is terminal for an engine instance. Call it from
the host lifecycle when the engine is no longer needed. Initialization, bridge
events, and platform callbacks that arrive after destruction are ignored safely;
callers do not need to coordinate late WebView or WKWebView callbacks.

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
