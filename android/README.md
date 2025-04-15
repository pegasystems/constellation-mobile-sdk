## Android ##

- [Gradle intergration](#gradle-integration-)
- [Running SDK](#running-sdk-)
- [Overriding components UI](#overriding-components-ui-)
- [Creating new components](#creating-new-components-)
    - [Defining Kotlin Component](#defining-kotlin-component-)
    - [Defining JavaScript component](#defining-javascript-component-)

Lets go step by step of how to quickly integrate SDK with android application.

### Gradle integration ###

Currently SDK is distributed using library AAR files.
They need to be downloaded into app/libs directory (or any other accessible by gradle).

To use them add in app gradle:

```kotlin
implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.aar", "*.jar"))))
```

Additional SDK dependencies to *okhttp* and *webkit* needs to be added because AAR files do not
include them:

```kotlin
implementation(libs.okhttp)
implementation(libs.androidx.webkit)
```

> Once SDK will be distributed via maven these two dependencies can be removed from gradle

### Running SDK ###

**1. Create ConstellationSdk object**

At first we need to create *ConstellationSdk* object by calling
*create* method:

```kotlin
val sdk = ConstellationSdk.create(context, config)
```

where:

- **context** - android application context
- **config** - constellation sdk config object with parameters:
    - **pegaUrl** - URL to Pega server e.g.: *https://insert-url-here.example/prweb*
    - **pegaVersion** - version of Pega server e.g.: *8.24.1*. Determines Constellation Core JS
      library version used by SDK.
    - **okHttpClient** (optional) - instance of OkHttpClient which can be passed to SDK for advanced
      networking control.
    - **componentManager** (optional) - instance of ComponentManager which is responsible for
      providing component definitions and manages them in the runtime
    - **debuggable** (optional) - flag which allows for debugging of underlying WebView engine

**2. Create Pega case using SDK**

After the SDK is created, call the *createCase* method to create the actual Pega case:

```kotlin
sdk.createCase(caseClassName, startingFields)
```

where:

- **caseClassName** - name of the case type class to be created, e.g. "DIXL-MediaCo-Work-NewService"
- **startingFields** (optional) - additional data which can be passed into newly opened form, e.g:

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

- **Initial** - initial state
- **Loading** - form is loading
- **Ready** - form ready to be displayed
- **Error** - form could not be loaded, e.g. due to configuration or network issues
- **Finished** - form processing finished
- **Cancelled** - form processing cancelled

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

For rendering actual components on form we need to get *RootContainerComponent*, which is available
through *Ready* state. This component holds whole form components structure. Rendering components is
fully possible by client's app, but for make things easy SDK provides set of component renderers for
**Jetpack Compose** technology.

There is also a helper extension method which is an entry point for rendering:

```kotlin
@Composable
fun Component.Render()
```

Calling that on *RootContainerComponent* will render all components. This extension function is
helpful for rendering other components as well.

> Please note that SDK provides ready-to-use set of components with their renderers.

### Overriding UI components ###

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

### Creating new components ###

It is possible to create new components (or override existing) and pass them to the SDK.
This can be useful when SDK does not support some components or client wants to utilize Pega Custom
Components.

#### Defining Kotlin Component ####

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

- **type** - instance of *ComponentType*

- **jsFile** - relative path to JavaScript file which is js implementation of component.<br>
  It is possible to overrride native implementation of already existing component.
  In that case *jsFile* should be set to *null* (js file from SDK will be used)

- **producer** - instance of *ComponentProducer*

*ComponentProducer* is functional interface which has *produce* method returning instance of
*Component*

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

After providing *customDefinitions* to *ComponentManager* SDK will create that components.

#### Defining JavaScript component ####

When adding new component the SDK requires JavaScript file to be created.
The reason behind is that SDK utilizes business logic which runs in JS code inside WebView.

JS files should be located in *assets* directory. Relative path to js file should be provided as
*jsFile* parameter to ComponentDefinition.

Example of Email JS component with comments is available here:
https://git.pega.io/projects/MX/repos/constellation-mobile-sdk/browse/android/app/src/main/assets/components_overrides/email.component.override.js

JavaScript Components use PCore and PConn API which is provided by Constellation Core JS
Library:<br>
https://docs.pega.com/bundle/pcore-pconnect/page/pcore-pconnect-public-apis/api/using-pcore-pconnect-public-apis.html

