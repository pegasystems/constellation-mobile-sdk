package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import org.jetbrains.compose.ui.tooling.preview.Preview
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.HelperText

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Dropdown(
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
    var expanded by remember { mutableStateOf(false) }

    Column(modifier = modifier) {
        ExposedDropdownMenuBox(
            expanded = expanded,
            onExpandedChange = {
                if (disabled || readOnly) return@ExposedDropdownMenuBox
                expanded = !expanded
            }
        ) {
            OutlinedTextField(
                value = options.firstOrNull { it.key == value }?.label ?: "",
                onValueChange = {},
                enabled = !disabled,
                readOnly = true,
                label = {
                    Label(
                        label = label,
                        hideLabel = hideLabel,
                        required = required,
                        disabled = disabled,
                        readOnly = readOnly
                    )
                },
                placeholder = { Text(placeholder) },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded) },
                modifier = Modifier
                    .menuAnchor()
                    .fillMaxWidth()
            )
            ExposedDropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
                options.forEach { option ->
                    DropdownMenuItem(
                        text = { Text(option.label) },
                        onClick = {
                            expanded = false
                            onValueChange(option.key)
                        }
                    )
                }
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

@Preview
@Composable
fun DropdownPreview() {
    var value by remember { mutableStateOf("") }
    val options = listOf(
        SelectableOption("", "Select..."),
        SelectableOption("value1", "label1"),
        SelectableOption("value2", "label2"),
        SelectableOption("value3", "label3")
    )
    Dropdown(
        value = value,
        label = "Dropdown label",
        options = options,
        placeholder = "Select...",
        helperText = "choose some item",
        onValueChange = { value = it }
    )
}

@Preview
@Composable
fun DropdownPreviewRequired() {
    var value by remember { mutableStateOf("value2") }
    val options = listOf(
        SelectableOption("value1", "label1"),
        SelectableOption("value2", "label2"),
        SelectableOption("value3", "label3")
    )
    Dropdown(
        value = value,
        label = "Dropdown label",
        options = options,
        placeholder = "Select...",
        helperText = "choose some item",
        required = true,
        onValueChange = { value = it }
    )

}

@Preview
@Composable
fun DropdownPreviewDisabled() {
    var value by remember { mutableStateOf("value2") }
    val options = listOf(
        SelectableOption("value1", "label1"),
        SelectableOption("value2", "label2"),
        SelectableOption("value3", "label3")
    )
    Dropdown(
        value = value,
        label = "Dropdown label",
        options = options,
        placeholder = "Select...",
        helperText = "choose some item",
        disabled = true,
        onValueChange = { value = it }
    )
}

@Preview
@Composable
fun DropdownPreviewReadOnly() {
    var value by remember { mutableStateOf("value2") }
    val options = listOf(
        SelectableOption("value1", "label1"),
        SelectableOption("value2", "label2"),
        SelectableOption("value3", "label3")
    )
    Dropdown(
        value = value,
        label = "Dropdown label",
        options = options,
        placeholder = "Select...",
        helperText = "choose some item",
        readOnly = true,
        onValueChange = { value = it }
    )
}
