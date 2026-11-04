# AGENTS.md — Constellation Mobile SDK

## Project guidance

- Read `.specify/memory/constitution.md` for the project's non-negotiable engineering principles.
- For non-trivial changes, use the spec-driven workflow described in `CONTRIBUTING.md` and the Copilot skills under `.github/skills/`.
- Read the relevant module README and `docs/` page before changing behavior. Preserve Kotlin Multiplatform module and source-set boundaries.
- Use the checked-in Gradle Wrapper and report the exact verification commands and results.
- Do not create or modify GitHub Actions workflows unless the user explicitly requests it.

## Dev environment tips
1. Do not hallucinate. When a task requires specific data that is not provided and cannot be reliably inferred from existing code or fixtures, ask the user before proceeding.
2. Do not change the logic of the code while doing migrations or refactoring, unless explicitly asked for.
3. After `silent on` is typed by user you cannot send any messages in the conversation and only modify files in the workspace. You can still report errors or ask clarifying questions if absolutely necessary to proceed safely.
4. After `silent off` is typed by user you can resume normal chat output and explanations.

## Project Overview

Kotlin Multiplatform (KMP) SDK for embedding Pega Constellation forms into mobile apps.
Targets Android, iOS, JVM/Desktop. Group: `com.pega.constellation.sdk.kmp`.

### Module Layout

| Module | Purpose |
|---|---|
| `core` | Domain models, interfaces, component system (publishable) |
| `engine-webview` | WebView-based engine with platform implementations (publishable) |
| `engine-mock` | Mock engine for testing |
| `ui-components-cmp` | Compose Multiplatform UI widgets (publishable) |
| `ui-renderer-cmp` | Renderers bridging core components to UI (publishable) |
| `test` | Integration test infrastructure and mocks |
| `samples/` | Sample Android, desktop, and iOS apps |
| `engine-webview/src/commonMain/composeResources/files/scripts/` | JavaScript bridge layer (pure ES modules, no bundler) |

## Build Commands

```bash
# Full build
./gradlew clean build

# Build + publish to local Maven
./gradlew clean publishToMavenLocal

# Build a single module
./gradlew :core:build
./gradlew :engine-webview:build
```

## Test Commands

SDK/WebView and sample UI tests require an Android emulator/device. SwiftUI UI tests use an
iOS simulator and a separate Xcode suite. Download CDN fixtures before WebView-backed tests:

```bash
(cd test/src/commonMain/composeResources/files/responses && ./download_js_files.sh)
```

### Android

```bash
# All SDK instrumented tests
./gradlew :test:connectedAndroidDeviceTest

# All sample app UI tests
./gradlew :samples:android-cmp-app:connectedDebugAndroidTest

# Single test class
./gradlew :test:connectedAndroidDeviceTest \
  -Pandroid.testInstrumentationRunnerArguments.class=com.pega.constellation.sdk.kmp.test.ConstellationSdk24Test

# Single test method
./gradlew :test:connectedAndroidDeviceTest \
  -Pandroid.testInstrumentationRunnerArguments.class=com.pega.constellation.sdk.kmp.test.ConstellationSdk24Test#test_initialization
```

Sample scenarios live in `test/pega24`, `test/pega25`, and `test/pega26` under the sample's
`androidInstrumentedTest` package. Extend `ComposeTest` with one fixed `PegaVersion`, annotate
each method with `@PegaCase`, and use `runAndroidTest` with `ComposeContentTestRule` helpers.
Setup belongs to `@BeforeTest`; do not use per-scenario `setupApp` or `runComposeUiTest`.
Compose retries recreate the full environment; SDK rule retries also reset the full SDK
lifecycle between attempts so each retry starts from initial state.

SDK integration scenarios live in
`test/src/androidDeviceTest/kotlin/com/pega/constellation/sdk/kmp/test/ConstellationSdk24Test.kt`
and the adjacent `ConstellationSdk25Test.kt`, using the shared
`ConstellationSdkTestRule` and utilities, not a common base class or an iOS scenario suite.
Version-specific assignment/case routes belong to the matching `handlers/pega24`, `pega25`,
or `pega26` delegate; keep shared parsing/legacy routes in the public dispatchers. See the
[response guide](test/src/commonMain/composeResources/files/responses/README.md) for exact paths.

### iOS

```bash
xcodebuild -project samples/swiftui-components-app/UITest/UITest.xcodeproj \
  -scheme UITest -destination "platform=iOS Simulator,name=<sim>" test

# Single test
xcodebuild ... -only-testing:"UITest/TestCaseProcessing/testCaseProcessing" test
```

---

## Kotlin Code Style

### Formatting & Imports

- 4-space indentation (no tabs); `kotlin.code.style=official` in `gradle.properties`
- One primary class/interface per file; file name matches the class name
- No explicit `public` modifier — rely on Kotlin's default public visibility
- Imports: alphabetically ordered, no blank-line separators, no wildcard imports
    - Exception: iOS platform APIs like `platform.WebKit.*`
    - Order: android/androidx → project (`com.pega.*`) → kotlin → kotlinx → third-party → java

### Naming & Visibility

- Classes/Interfaces: PascalCase (`FlowContainerComponent`)
- Functions: camelCase; Composables: PascalCase; factory funcs: `for`/`create` prefix
- Variables: camelCase; constants: SCREAMING_SNAKE_CASE in `companion object`
- Enums: SCREAMING_SNAKE_CASE; value classes: PascalCase (`ComponentId`)
- Test methods: `test_` prefix + snake_case (`test_initialization()`)
- `internal` for impl classes; `private set` on mutable Compose state; no explicit `public`

### Error Handling

- **Sealed classes** for domain state: `State.Ready`, `State.Error`, `EngineEvent.Error`
- **`EngineError` interface** with concrete types: `JsError`, `InternalError`
- **`runCatching`/`onFailure`** for defensive handling around component updates
- **Null safety with early returns**: `val x = y as? Type ?: return`
- **`Log` object** (`Log.i`, `Log.w`, `Log.e`) for non-critical failures — never swallow silently

### Patterns

- `StateFlow`/`MutableStateFlow` for observable state; `SharedFlow` for events
- `CoroutineScope(Dispatchers.Main + SupervisorJob())` for lifecycle-scoped coroutines
- `mutableStateOf` (Compose) for component property state, not StateFlow
- `fun interface` for SAM types: `EngineEventHandler`, `ComponentProducer`
- `companion object` with `private const val TAG` and factory methods
- `@JvmInline value class` for type-safe identifiers; `lateinit var` for deferred init
- KDoc on public API interfaces/classes with `@param`/`@property` tags; minimal docs on internals

---

## JavaScript Code Style (bundled scripts)

The `engine-webview/src/commonMain/composeResources/files/scripts/` directory contains a pure
ES module JavaScript codebase (no bundler, no npm).
This is a bridge layer loaded into a WebView at runtime.

### Formatting

- 4-space indentation (`.prettierrc`: `tabWidth: 4, useTabs: false`)
- Double quotes for strings; semicolons at end of statements
- Max line length: 120 (`.editorconfig`)
- Relative imports with explicit `.js` extension: `import { BaseComponent } from "../../base.component.js";`
- No bare module specifiers, no npm packages; one import per line

### File & Class Naming

- Files: `kebab-case.component.js` (e.g., `text-input.component.js`)
- Classes: PascalCase matching file name (e.g., `TextInputComponent`)
- Component type string: PascalCase without "Component" suffix (`this.type = "TextInput"`)

### Component Lifecycle

All components extend `BaseComponent`. Required methods in order:

1. **`constructor(componentsManager, pConn)`** — call `super(componentsManager, pConn)`, set `this.type`
2. **`init()`** — register via `this.jsComponentPConnect.registerAndSubscribeComponent(this, this.checkAndUpdate)`, call `this.componentsManager.onComponentAdded(this)`, then `this.checkAndUpdate()`
3. **`destroy()`** — call `super.destroy()`, unsubscribe, call `this.componentsManager.onComponentRemoved(this)`
4. **`update(pConn, ...)`** — guard with equality check, reassign, call `this.checkAndUpdate()`
5. **`checkAndUpdate()`** — call `this.jsComponentPConnect.shouldComponentUpdate(this)`, if true call `this.#updateSelf()`
6. **`#updateSelf()`** — resolve props from `this.pConn`, build state, call `this.#sendPropsUpdate()`
7. **`#sendPropsUpdate()`** — set `this.props = { ... }`, call `this.componentsManager.onComponentPropsUpdate(this)`

### Key Conventions

- **Private methods** use `#` prefix: `#updateSelf()`, `#sendPropsUpdate()`
- **No TypeScript** in new code — the `.ts` files are legacy Angular originals kept as reference
- Component registration: `engine-webview/src/commonMain/composeResources/files/scripts/dxcomponents/mappings/sdk-pega-component-map.js`
- TAG-based logging: `const TAG = "ClassName";` with `Utils.log(TAG, ...)` or `console.warn`
- Guard clauses with early return for null/undefined checks
- `try/catch` only at system boundaries (bridge calls, JSON parsing)
- String interpolation with template literals: `` `@P .${context}` ``

### Angular TS → JS Migration Rules

Load the `angular-ts-to-js-migration` skill for the full migration rules and workflow.

### Writing Unit-tests for JS components

Load the `js-component-unit-tests` skill for the full guidelines and rules.
Honor feature-specific constraints: ObjectReference has no retained standalone JS suite;
do not introduce a new harness or treat syntax/resource checks as runtime acceptance.
Consult the separate Pega 24/25 and Pega 26 support sections in `README.md`; versioned
fixtures and a compatible CDN profile alone do not establish component support.

### Creating components in core kotlin module

Load the `core-kotlin-component` skill for the full guidelines and rules.

### Creating component renderers in ui-renderer-cmp kotlin module

Load the `ui-renderer-cmp-component` skill for the full guidelines and rules.

### Creating Compose Multiplatform UI components in ui-components-cmp

Load the `ui-components-cmp-component` skill for the full guidelines and rules.

### Writing Android instrumented UI tests

Load the `android-instrumented-ui-test` skill for the full guidelines and rules.

### Writing non-UI Constellation SDK tests

Load the `constellation-sdk-test` skill for SDK/WebView integration tests in the `test`
module's Android device source set.
