package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Email

class EmailComponent(context: ComponentContext) : FieldComponent(context)

class EmailRenderer : ComponentRenderer<EmailComponent> {
    @Composable
    override fun EmailComponent.Render() {
        WithFieldHelpers {
            Email(
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
    }
}
