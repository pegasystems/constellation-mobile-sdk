## Constellation SDK - Compose Multiplatform UI Renderer Module

This module provides rendering logic for Compose Multiplatform technology.
It allows to render components from the core module using ready-to-use composables from `ui:components` module.

### Rendering components

To render components, use the `Render()` extension, which is available for all the components:

```kotlin
@Composable
fun Component.Render()
```

This is also an entry point for rendering `RootContainerComponent`. Calling *RootContainerComponent.Render()* will render all components hierarchy.
This extension function is helpful for rendering any component as well.


### Overriding component rendering

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
