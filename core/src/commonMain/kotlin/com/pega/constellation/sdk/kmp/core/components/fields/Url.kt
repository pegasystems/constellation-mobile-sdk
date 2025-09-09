package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Url

class UrlComponent(context: ComponentContext) : FieldComponent(context)

class UrlRenderer : ComponentRenderer<UrlComponent> {
    @Composable
    override fun UrlComponent.Render() {
        WithFieldHelpers {
            Url(
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
