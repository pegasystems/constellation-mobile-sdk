package com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.fields.SelectableComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.RadioButtons
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.SelectableOption
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithFieldHelpers

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
