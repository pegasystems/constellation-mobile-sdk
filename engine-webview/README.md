# WebView Engine

`engine-webview` provides the Android and iOS WebView implementations of the SDK engine.

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

### Importing bundled SDK modules

Custom JavaScript components on Android and iOS can use the following HTTPS alias to
import bundled SDK modules without hardcoding the Pega host. This is needed when adding
custom component JavaScript files whose classes extend SDK classes such as
`FieldBaseComponent`: the custom file must import the base class before extending it.
Use this URL to import `FieldBaseComponent`:

```text
https://constellation-mobile-sdk-assets/scripts/dxcomponents/components/fields/field-base.component.js
```

The path after the alias host maps to the packaged `files/` directory. Android's asset
interceptor and iOS's bundled resource provider serve these resources locally, without
a network request to the alias host. Existing asset URLs on the configured Pega host
remain supported.

Alias responses include `Access-Control-Allow-Origin: *` to allow cross-origin module
imports. This header applies only to public bundled SDK resources served through the
alias; authenticated network responses are unchanged.

**Android limitation:** Custom component source is currently loaded through a `data:`
URL, so relative imports cannot resolve against the component's original asset path.
Use the absolute alias URL above for imports from custom components.
