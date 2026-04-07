package com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.widgets.MultiselectComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.FieldValue
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Multiselect
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.SelectableOption
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithFieldHelpers

class MultiselectRenderer : ComponentRenderer<MultiselectComponent> {
    @Composable
    override fun MultiselectComponent.Render() {
        WithFieldHelpers(
            displayOnly = {
                val selectedLabels = options
                    .filter { selectedKeys.contains(it.key) }
                    .joinToString(", ") { it.label }
                FieldValue(label, selectedLabels)
            },
            editable = {
                Multiselect(
                    selectedKeys = selectedKeys,
                    label = label,
                    helperText = helperText,
                    validateMessage = validateMessage,
                    placeholder = placeholder,
                    required = required,
                    disabled = disabled,
                    readOnly = readOnly,
                    options = options.map { SelectableOption(it.key, it.label) },
                    onAdd = { addSelection(it) },
                    onRemove = { removeSelection(it) }
                )
            })
    }
}
