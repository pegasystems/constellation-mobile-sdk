package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Checkbox
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.HelperText

@Composable
fun CheckboxGroup(
    options: List<MultiSelectOption>,
    modifier: Modifier = Modifier,
    label: String = "",
    helperText: String = "",
    validateMessage: String = "",
    hideLabel: Boolean = false,
    required: Boolean = false,
    disabled: Boolean = false,
    readOnly: Boolean = false,
    onOptionClick: (Int, Boolean) -> Unit = { _, _ -> },
    testTag: String? = null
) {
    Column(modifier = modifier) {
        Label(
            label = label,
            hideLabel = hideLabel,
            required = required,
            disabled = disabled,
            readOnly = readOnly
        )
        options.forEachIndexed { index, option ->
            Row(
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.fillMaxWidth()
            ) {
                Checkbox(
                    checked = option.selected,
                    onCheckedChange = { onOptionClick(index, !option.selected) },
                    modifier = testTag?.let { Modifier.testTag(it) } ?: Modifier,
                    enabled = !disabled
                )
                Label(
                    label = option.label,
                    required = required,
                    disabled = disabled,
                    readOnly = readOnly,
                    fontSize = 16.sp
                )
            }
        }
        HelperText(
            text = helperText,
            validateMessage = validateMessage,
            disabled = disabled,
            readOnly = readOnly
        )
    }
}
