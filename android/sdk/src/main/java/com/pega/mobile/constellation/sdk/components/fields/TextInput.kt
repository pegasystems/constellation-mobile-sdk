package com.pega.mobile.constellation.sdk.components.fields

import androidx.compose.runtime.Composable
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.TextInput

class TextInputComponent(context: ComponentContext) : FieldComponent(context)

class TextInputRenderer : ComponentRenderer<TextInputComponent> {
    @Composable
    override fun TextInputComponent.Render() {
        WithVisibility {
            WithDisplayMode(
                editable = {
                    TextInput(
                        value = value,
                        label = label,
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
            )
        }
    }
}
