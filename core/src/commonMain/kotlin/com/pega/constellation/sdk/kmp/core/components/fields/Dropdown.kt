package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.SelectableOption
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Dropdown

class DropdownComponent(context: ComponentContext) : SelectableComponent(context)

class DropdownRenderer : ComponentRenderer<SelectableComponent> {
    @Composable
    override fun SelectableComponent.Render() {
        WithFieldHelpers {
            Dropdown(
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
