## Android

- [Running sample application](#running-sample-application)
- [Gradle integration](#gradle-integration)
- [Using SDK](#using-sdk)
- [Overriding components UI](#overriding-ui-components)
- [Creating new components](#creating-new-components)
    - [Defining Kotlin Component](#defining-kotlin-component)
    - [Defining JavaScript component](#defining-a-javascript-component)

Let's go step by step to quickly run and integrate the SDK with an Android application.

### Running sample application

Project contains a sample application that demonstrates the usage of the SDK.

To run the sample application, you need to provide necessary configuration in [SDKConfig.kt](app/src/main/java/com/pega/mobile/constellation/sample/SDKConfig.kt)

```kotlin
object SDKConfig {
    ...
    const val PEGA_URL = "https://insert-url-here.example/prweb"
    ...
}
```

For more information about the configuration, please refer to the [Configuring sample mobile application](../docs/configure-sample-mobile-app.md) document.


### Gradle integration

Currently, the SDK is distributed using library AAR files.
They need to be downloaded into app/libs directory (or any other accessible by Gradle).
To use the AAR files, add in the Gradle app:

```kotlin
implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.aar", "*.jar"))))
```

Additional SDK dependencies to *okhttp* and *webkit* need to be added because the AAR files do not
include them:

```kotlin
implementation(libs.okhttp)
implementation(libs.androidx.webkit)
```

> After the SDK is distributed through Maven in the future, these two dependencies can be removed from Gradle.

### Using SDK

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
        else ->...
    }
}
```

**4. Render the form**

For rendering actual components on the form, you need to get the *RootContainerComponent*, which is available
through the *Ready* state. This component holds whole form components structure. Rendering components is
fully possible by your app, but to make the process easier, the SDK provides the set of component renderers for
**Jetpack Compose** technology.

There is also a helper extension method, which is an entry point for rendering:

```kotlin
@Composable
fun Component.Render()
```

Calling *RootContainerComponent.Render()* will render all components. 
This extension function is helpful for rendering other components as well.

> Please note that SDK provides a ready-to-use set of components with their renderers.

### Overriding UI components

Use *ProvideRenderers* method to override component rendering by providing custom renderers:

```kotlin
@Composable
fun Render(root: RootContainerComponent) {
    val customRenderers: Map<ComponentType, ComponentRenderer> = 
        mapOf(ComponentTypes.Email to CustomEmailRenderer())
    ProvideRenderers(customRenderers) { root.Render() }
}
```

*ComponentRenderer* is just a generic interface that is responsible for rendering a component:

```kotlin
interface ComponentRenderer<C : Component> {
    @Composable
    fun C.Render()
}
```

Example of a custom renderer:

```kotlin
class CustomEmailRenderer : ComponentRenderer<CustomEmailComponent> {
    @Composable
    override fun CustomEmailComponent.Render() {
        WithVisibility {
            Column {
                Email(
                    value = value,
                    label = "Custom $label",
                    helperText = helperText,
                    validateMessage = validateMessage,
                    placeholder = placeholder,
                    required = required,
                    disabled = disabled,
                    readOnly = readOnly,
                    onValueChange = { updateValue(it) },
                    onFocusChange = { updateFocus(it) }
                )
            }
        }
    }
}
```

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
    val jsFile: String? = null,
    val producer: ComponentProducer
)
```

- **type** — Instance of *ComponentType*

- **jsFile** — Relative path to the JavaScript file that is the JS implementation of the component.<br>
  It is possible to override the native implementation of an already existing component.
  In that case *jsFile* should be set to *null* (The JS file from the SDK will be used instead).

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
    jsFile = "components_overrides/slider.component.override.js",
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

After providing *customDefinitions* to *ComponentManager*, the SDK will create the components.

#### Defining a JavaScript component

When adding a new component, the SDK requires a JavaScript file to be created.
The reason is that the SDK utilizes business logic that runs in JS code inside the WebView.

JS files should be located in the *assets* directory. The relative path to the JS file should be provided as a *jsFile* parameter to ComponentDefinition.

An example of an Email JS component with comments is available here:
[email.component.override.js](app/src/main/assets/components_overrides/email.component.override.js)

JavaScript Components use PCore and PConn API which is provided by the Constellation Core JS
Library:<br>
https://docs.pega.com/bundle/pcore-pconnect/page/pcore-pconnect-public-apis/api/using-pcore-pconnect-public-apis.html


### Adding Kotlin sources for browsing SDK code in Android Studio

To be able to browse the SDK code in Android Studio, you need to download sdk-sources.jar file and place it 'android/libs' folder.
Then after opening any SDK class definition, you can click on the "Choose Sources..." link in the top right corner of the editor.
Find the sdk-sources.jar file and click "open". After that, you will be able to browse the SDK code in Android Studio.

sdk-sources.jar file can be downloaded from github releases page:<br> 
https://github.com/pegasystems/constellation-mobile-sdk/releases

It can also be built from the source code by running the following command in the 'android' directory of the SDK:

```bash 
./gradlew :sdk:sourcesJar