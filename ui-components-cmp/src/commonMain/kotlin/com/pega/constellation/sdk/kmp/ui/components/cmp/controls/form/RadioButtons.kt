package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.selection.selectableGroup
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.Role
import org.jetbrains.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.HelperText

@Composable
fun RadioButtons(
    value: String,
    label: String,
    modifier: Modifier = Modifier,
    helperText: String = "",
    validateMessage: String = "",
    hideLabel: Boolean = false,
    placeholder: String = "",
    required: Boolean = false,
    disabled: Boolean = false,
    readOnly: Boolean = false,
    options: List<SelectableOption> = emptyList(),
    onValueChange: (String) -> Unit = {}
) {

    Column(modifier.selectableGroup().fillMaxWidth()) {
        Label(
            label = label,
            hideLabel = hideLabel,
            required = required,
            disabled = disabled,
            readOnly = readOnly
        )
        options.forEach { option ->
            RadioButton(value, disabled, option, onValueChange)
        }
        HelperText(
            text = helperText,
            validateMessage = validateMessage,
            disabled = disabled,
            readOnly = readOnly
        )
    }
}

@Composable
fun RadioButton(
    value: String,
    disabled: Boolean,
    option: SelectableOption,
    onValueChange: (String) -> Unit
) {
    Row(
        Modifier
            .fillMaxWidth()
            .height(56.dp)
            .selectable(
                selected = (option.key == value),
                onClick = {
                    onValueChange(option.key)
                },
                role = Role.RadioButton
            )
            .padding(horizontal = 16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        RadioButton(
            selected = (option.key == value),
            onClick = null, // null recommended for accessibility with screen readers
            enabled = !disabled
        )
        Text(
            text = option.label,
            style = MaterialTheme.typography.bodyLarge,
            modifier = Modifier.padding(start = 16.dp),
            color = if (disabled) Color.Gray else Color.Black
        )
    }
}

@Preview(showBackground = true)
@Composable
fun RadioButtonsPreview() {
    var value by remember { mutableStateOf("2") }
    val options = listOf(
        SelectableOption("1", "label1"),
        SelectableOption("2", "label2"),
        SelectableOption("3", "label3")
    )
    RadioButtons(
        value = value,
        label = "Dropdown label",
        options = options,
        placeholder = "Select...",
        helperText = "choose some item",
        readOnly = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun RadioButtonsEmptyPreview() {
    var value by remember { mutableStateOf("2") }
    val options = emptyList<SelectableOption>()
    RadioButtons(
        value = value,
        label = "Dropdown label",
        options = options,
        placeholder = "Select...",
        helperText = "choose some item",
        readOnly = true,
        onValueChange = { value = it }
    )
}
