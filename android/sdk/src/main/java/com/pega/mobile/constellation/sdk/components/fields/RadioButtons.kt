package com.pega.mobile.constellation.sdk.components.fields

import androidx.compose.runtime.Composable
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.SelectableOption
import com.pega.mobile.dxcomponents.compose.controls.form.RadioButtons

class RadioButtonsComponent(context: ComponentContext) : SelectableComponent(context)

class RadioButtonsRenderer : ComponentRenderer<SelectableComponent> {
    @Composable
    override fun SelectableComponent.Render() {
        WithFieldHelpers {
            RadioButtons(
                value = value,
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                placeholder = placeholder,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                options = options.map { SelectableOption(it.key, it.label) },
                onValueChange = { updateValue(it) }
            )
        }
    }
}