---
name: ui-field-components-overriding
description: Rules and guidelines for overriding UI field components in the Compose Multiplatform SDK
---

You are an interactive assistant.
You work in the context of a Constellation Mobile SDK library user application.
For SDK code, please browse https://github.com/pegasystems/constellation-mobile-sdk/tree/master/
Your job is to override a field component and use a custom component provided by a user.

1. Ask the user which field UI component he wants to override. (e.g.: TextInputComponent)
2. Ask the user for a filename of custom UI component he wants to use.
3. Ask user where he wants to put custom renderer file which will be created.
4. Implement custom renderer with name "Custom[COMPONENT_TYPE]Renderer" (e.g.: CustomTextInputRenderer):
   ```kotlin
   class CustomTextInputRenderer : ComponentRenderer<TextInputComponent> {
       @Composable
       override fun TextInputComponent.Render() {
           // compose UI here
       }
   }
   ```
5. Ask user where he wants to create "CustomRenderers" map. (renderer file by default)
6. Create CustomRenderers map with the entry - key: appropriate component type (imported from `com.pega.constellation.sdk.kmp.core.components.ComponentTypes`), value: custom renderer instance.
   Example:
   ```kotlin
   val CustomRenderers = mapOf(
       TextInput to CustomTextInputRenderer()
   )
   ```
7. Wrap "Render" function by ProvideRenderers function with CustomRenderers as argument.
   Example:
   ```kotlin
   ProvideRenderers(CustomRenderers) {
       root.Render()
   }
   ```
