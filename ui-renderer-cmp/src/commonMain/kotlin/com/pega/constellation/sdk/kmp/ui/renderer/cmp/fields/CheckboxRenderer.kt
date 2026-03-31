package com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.fields.CheckboxComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Checkbox
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.CheckboxGroup
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.FieldValue
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.MultiSelectOption
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithFieldHelpers

class CheckboxRenderer : ComponentRenderer<CheckboxComponent> {
    @Composable
    override fun CheckboxComponent.Render() {
        WithFieldHelpers(
            displayOnly = {
                val displayValue = if (value.toBoolean()) trueLabel else falseLabel
                FieldValue(label, displayValue)
            },
            editable = {
                if (selectionMode == CheckboxComponent.SelectionMode.SINGLE) {
                    Checkbox(
                        value = value.toBoolean(),
                        caption = caption,
                        label = label,
                        helperText = helperText,
                        validateMessage = validateMessage,
                        hideLabel = hideLabel,
                        required = required,
                        disabled = disabled,
                        readOnly = readOnly,
                        onValueChange = { updateValue(it.toString()) },
                        testTag = "checkbox_[$caption]"
                    )
                } else {
                    CheckboxGroup(
                        options = checkboxGroupOptions.map {
                            MultiSelectOption(
                                it.key,
                                it.text,
                                it.selected
                            )
                        },
                        label = label,
                        helperText = helperText,
                        validateMessage = validateMessage,
                        hideLabel = hideLabel,
                        required = required,
                        disabled = disabled,
                        readOnly = readOnly,
                        onOptionClick = { id, selected -> onOptionClick(id, selected) },
                        testTag = "checkbox_group_[$label]"
                    )
                }
            }
        )
    }
}
