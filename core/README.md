## Constellation SDK - Core Module

### Overview
The core module of the Constellation SDK provides the foundational logic and abstractions for building mobile applications. 
It targets Android, iOS, and JVM, and serves as the main entry point for SDK features, configuration, and component management.

### Features
- **Kotlin Multiplatform Support**: Shared business logic across Android, iOS, and JVM.
- **Easy Configuration**: Easily configure SDK behavior via `ConstellationSdkConfig`.
- **Engine independent**: Centralized engine operations in `ConstellationSdkEngine`.
- **Custom Components**: Extensible API and component abstractions for development of custom components.

### Getting Started

To get started with the Constellation SDK, follow these steps:

**1. Create ConstellationSdk object**

First, we need to create the *ConstellationSdk* object by calling the *create* static method

```kotlin
val sdk = ConstellationSdk.create(context, config)
```

where:

- **context** - Android application context
- **config** - constellation sdk config object with parameters:
    - **pegaUrl** — URL to Pega server e.g.: *https://insert-url-here.example/prweb*
    - **pegaVersion** — Version of Pega server. For example, *24.1.0*. Determines the Constellation Core JS library version used by the SDK.
    - **okHttpClient** (optional) — Instance of OkHttpClient that can be passed to the SDK for advanced networking control.
    - **componentManager** (optional) — Instance of ComponentManager that is responsible for providing component definitions and managing them in the runtime
    - **debuggable** (optional) — Flag that allows for debugging of the underlying WebView engine

**2. Create Pega case using SDK**

After the SDK is created, we call the *createCase* method to create the actual Pega case:

```kotlin
sdk.createCase(caseClassName, startingFields)
```

where:

- **caseClassName** — Name of the Case Type class to be created, e.g. "DIXL-MediaCo-Work-NewService"
- **startingFields** (optional) — Additional data that can be passed into the newly opened form, e.g.:

```kotlin
val startingFields = mapOf(
    "name" to "John",
    "Vehicle" to mapOf(
        "make" to "Honda",
        "model" to "Civic"
    )
)

```

**3. Listen for SDK state changes**

*ConstellationSdk* provides several states that can be observed for seamless UI integration:

- **Initial** — initial state
- **Loading** — form is loading
- **Ready** — form ready to be displayed
- **Error** — form could not be loaded, e.g., due to configuration or network issues
- **Finished** — form processing finished
- **Cancelled** — form processing cancelled

These states are available via *ConstellationSdk* interface:

```kotlin
interface ConstellationSdk {
    val state: StateFlow<State>
}
```

Listen for state changes to automatically update the user interface:

```kotlin
@Composable
fun PegaForm(state: State) {
    when (state) {
        is Loading -> Loader()
        is Ready -> Render(state.root)
    }
}
```

**4. Render the form**

For rendering actual components on the form, you need to get the *RootContainerComponent*, which is available
through the *Ready* state. This component holds whole form components structure. Rendering components is
fully possible by your app, but to make the process easier, the SDK provides the set of components and renderers for
**Compose** and **SwiftUI** technologies.

For more information about rendering and overriding components, please refer to the:
- [Rendering components using Compose](../ui/renderer/cmp/README.md#rendering-components) section.
- [Rendering components using SwiftUI](../samples/swiftui-components-app/README.md#renderer) section.

### Creating new components

It is possible to create new components (or override existing components) and pass them to the SDK.
This is useful when the SDK does not support some components, or you want to utilize Pega Custom Components.

#### Defining Kotlin Component

Create *ComponentManager* with custom component definitions and pass it to *ConstellationSdkConfig*:

```kotlin
val customDefinitions: List<ComponentDefinition>
val componentManager = ComponentManager.create(customDefinitions)
val config = ConstellationSdkConfig(componentManager = componentManager, ...)
```

where:

```kotlin
class ComponentDefinition(
    val type: ComponentType,
    val script: ComponentScript? = null,
    val producer: ComponentProducer
)
```

- **type** — Instance of *ComponentType*

- **script** — Defines a JavaScript file that is the JS implementation of the component.<br>
  It is possible to override the native implementation of an already existing component.
  In that case *script* should be set to *null* (The JS file from the SDK will be used instead).

- **producer** — instance of *ComponentProducer*

*ComponentProducer* is the functional interface that has the *produce* method returning the instance of *Component*:

```kotlin
fun interface ComponentProducer {
    fun produce(context: ComponentContext): Component
}
```

Example of creating custom component definition:

```kotlin
ComponentDefinition(
    type = ComponentType("Slider"),
    script = ComponentScript("components_overrides/slider.component.override.js"),
    producer = { CustomSlidercomponent(it) }
)
```

```kotlin
class CustomSliderComponent(context: ComponentContext) : FieldComponent(context) {
    var range: String by mutableStateOf("")
        private set

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        range = props.getString("range")
    }
}
```

After providing *customDefinitions* to *ComponentManager*, the SDK will use provided component definitions.

#### Defining a JavaScript component

When adding a new component, the SDK requires a JavaScript file to be created.
The reason is that the SDK utilizes business logic that runs in JS code inside the WebView.

There are two options for providing JS file:
1. Using *assets* directory - the relative path to the JS file should be provided as a *script* parameter to ComponentDefinition.
2. Using *composeResources* directory - the JS file should be placed in the *composeResources/files* directory,
   and the *script* parameter should be set to using *Res.getUri* API. The SDK will automatically load all JS files from this directory.

An example of an Email JS component with comments is available here:
[email.component.override.js](app/src/main/assets/components_overrides/email.component.override.js)

JavaScript Components use PCore and PConn API which is provided by the Constellation Core JS
Library:<br>
https://docs.pega.com/bundle/pcore-pconnect/page/pcore-pconnect-public-apis/api/using-pcore-pconnect-public-apis.html
