
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

Additional SDK dependencies to *okhttp* and *webkit* needs to be added because AAR files do not include them:

```kotlin
implementation(libs.okhttp)
implementation(libs.androidx.webkit)
```

(Once SDK will be distributed via maven these two dependencies can be removed from gradle.)

### Running SDK ###

**1. ConstellationSdk creation**

At first we need to create *ConstellationSdk* object by calling
*create* static method

```kotlin
val sdk = ConstellationSdk.create(context, config)
```
create method definition
```kotlin
fun create(context: Context, config: ConstellationSdkConfig): ConstellationSdk
```
- **context** - android context.

- **config** - ConstellationSdkConfig object

ConstellationSdkConfig definition:

```kotlin
data class ConstellationSdkConfig(
    val pegaUrl: String,
    val pegaVersion: String,
    val okHttpClient: OkHttpClient = OkHttpClient(),
    val componentManager: ComponentManager = ComponentManager.create(),
    val debuggable: Boolean = false
)
```

- **pegaUrl** - URL to Pega server e.g.: *https://lab-05423-bos.lab.pega.com/prweb*

- **pegaVersion** - version of Pega server e.g.: *8.24.1*. Determines Constellation Core JS library version used by SDK.

- **okHttpClient** (optional) - instance of OkHttpClient which can be passed to SDK for advanced networking control.

- **componentManager** (optional) - instance of ComponentManager which is responsible for providing component definitions and manages them in the runtime

- **debuggable** (optional) - flag which allows for debugging of underlying WebView engine

After sdk is created we need to call *createCase* method to create actual Pega case:

```kotlin
sdk.createCase("DIXL-MediaCo-Work-NewService")
```

createCase method definition:

```kotlin
fun createCase(caseClassName: String, startingFields: Map<String, Any> = emptyMap())
```
This method takes *caseClassName* and optional *startingFields*.

**caseClassName** - name of the case type class to be created.

**startingFields** - additional data which can be passed into newly opened form.
```kotlin
e.g.: startingFields = mapOf("name" to "John", "surname" to "Smith")
```

Its values are type of *Any* because we can pass more advanced data structures there like map of maps.
e.g.:
```kotlin
startingFields = mapOf(
    "name" to "John",
    "Vehicle" to mapOf(
        "make" to "Honda",
        "model" to "Civic"
    )
)

```

In *ConstellationSdk* interface there is *state*:

```kotlin
val state: StateFlow<State>
```

*ConstellationSdk.State* represents state of sdk:

```kotlin
sealed class State {
    data object Initial : State()
    data object Loading : State()
    data class Ready(val root: RootContainerComponent) : State()
    data class Error(val error: String?) : State()
    data class Finished(val successMessage: String?) : State()
    data object Cancelled : State()
}
```

We can listen on this flow to get *State* objects and respond e.g:
```kotlin
@Composable
fun PegaForm(state: State) {
    when (state) {
        is Loading -> Loader()
        is Ready -> Render(state.root)
        else -> ...
    }
}
```

For rendering actual fields on form we need to get *Ready* state.
It contains *root* which is *RootContainerComponent* object which holds whole Form components structure.

Rendering components is fully possible by client app but for make things easy SDK provides so called
*Renderers* which utilize Jetpack Compose @Composable functions.

There is also helper extension method which is an entry point for rendering:

```kotlin
@Composable
fun Component.Render()
```

Calling that on *RootContainerComponent* will render all components tree.<br>
SDK is providing set of out of the box components with renderers.

**It is possible to override UI rendering by providing custom renderers.<br>
Client application can also add new components by providing custom components definitions.**

### Overriding components UI ###

To render custom UI in SDK clients app needs to use *ProvideRenderers* method passing custom renderers.
e.g.:

```kotlin
@Composable
fun Render(root: RootContainerComponent) {
    ProvideRenderers(customRenderers) { root.Render() }
}
```




*ProvideRenderers* definition:

```kotlin
@Composable
fun ProvideRenderers(
    customRenderers: Map<ComponentType, ComponentRenderer<*>>,
    content: @Composable () -> Unit
)
```
*customRenderers* - map containing component type as key and component renderer as value.
Example of customRenderers map:
```kotlin
val customRenderers = mapOf(Email to CustomEmailRenderer())
```

*ComponentType* is just inline class wrapping String type:

```kotlin
@JvmInline
value class ComponentType(val type: String) {
    override fun toString() = type
}
```
Example:

```kotlin
val Email = ComponentType("Email")
```

*ComponentRenderer* is generic interface which should be implemented by component renderer:
```kotlin
interface ComponentRenderer<C : Component> {
    @Composable
    fun Render(component: C)
}
```
Example of custom renderer:

```kotlin
class CustomEmailRenderer : ComponentRenderer<CustomEmailComponent> {
    @Composable
    override fun Render(component: CustomEmailComponent) {
        with(component.state) {
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
                    onValueChange = { value = it },
                    onFocusChange = { focused = it }
                )
            }
        }
    }
}
```
*EmailViewModel* passed as type to *ComponentRenderer* is viewModel used in  *EmailComponent*

### Creating new components ###

It is possible to create new components (or override existing) by clients application and pass it to SDK.
This can be useful when SDK does not support some Pega component or client created Pega Custom Component.

#### Defining Kotlin Component ####

While creating *ConstellationSdkConfig* we can pass instance of ComponentManager
```kotlin
ConstellationSdk.create(this, config)
```
```kotlin
val config = ConstellationSdkConfig(
    pegaUrl = PegaConfig.URL,
    pegaVersion = "8.24.1",
    okHttpClient = buildOkHttpClient(),
    componentManager = ComponentManager.create(CustomDefinitions)
)
```
*ComponentManager* can be created by *create* static method.

```kotlin
fun create(customDefinitions: List<ComponentDefinition> = emptyList())
```

We can pass *customDefinitions* which is a list of *ComponentDefinition*

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

*ComponentProducer* is functional interface which has *produce* method returning instance of *Component*

```kotlin
fun interface ComponentProducer {
    fun produce(context: ComponentContext): Component
}
```

Example of creating ComponentDefinition

```kotlin
ComponentDefinition(
    type = Email,
    jsFile = "components_overrides/email.component.override.js",
    producer = ::CustomEmailComponent
)
```
```kotlin
class CustomEmailComponent(context: ComponentContext) : FieldComponent(context) {
    override val viewModel = EmailViewModel()

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        viewModel.placeholder = props.getString("placeholder")
    }
}
```

After providing *customDefinitions* to *ComponentManager* SDK will create that components.

#### Defining JavaScript component ####

When adding new component the SDK requires JavaScript file to be created.
The reason behind is that SDK utilizes business logic which runs in JS code inside WebView.

JS files should be located in *assets* directory. Relative path to js file should be provided as *jsFile* parameter to ComponentDefinition.

Example of Email JS component with comments is available here:
https://git.pega.io/projects/MX/repos/constellation-mobile-sdk/browse/android/app/src/main/assets/components_overrides/email.component.override.js


JavaScript Components use PCore and PConn API which is provided by Constellation Core JS Library:<br>
https://docs.pega.com/bundle/pcore-pconnect/page/pcore-pconnect-public-apis/api/using-pcore-pconnect-public-apis.html

