package com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.fields.SimpleComboBoxComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Dropdown
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.FieldValue
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.SelectableOption
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithFieldHelpers

class SimpleComboBoxRenderer : ComponentRenderer<SimpleComboBoxComponent> {
    @Composable
    override fun SimpleComboBoxComponent.Render() {
        WithFieldHelpers(
            displayOnly = {
                FieldValue(label, options.firstOrNull { it.key == value }?.label ?: "")
            },
            editable = {
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
            })
    }
}
