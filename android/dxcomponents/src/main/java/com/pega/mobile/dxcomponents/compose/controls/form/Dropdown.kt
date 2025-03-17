/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.dxcomponents.compose.controls.form

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
import androidx.compose.ui.tooling.preview.Preview
import com.pega.mobile.dxcomponents.compose.controls.form.internal.HelperText

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
    options: List<DropdownOption> = emptyList(),
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
                value = options.firstOrNull { it.value == value }?.label ?: "",
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
                            onValueChange(option.value)
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

data class DropdownOption(val value: String, val label: String)

@Preview(showBackground = true, heightDp = 300)
@Composable
fun DropdownPreview() {
    var value by remember { mutableStateOf("") }
    val options = listOf(
        DropdownOption("", "Select..."),
        DropdownOption("value1", "label1"),
        DropdownOption("value2", "label2"),
        DropdownOption("value3", "label3")
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

@Preview(showBackground = true)
@Composable
fun DropdownPreviewRequired() {
    var value by remember { mutableStateOf("value2") }
    val options = listOf(
        DropdownOption("value1", "label1"),
        DropdownOption("value2", "label2"),
        DropdownOption("value3", "label3")
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

@Preview(showBackground = true)
@Composable
fun DropdownPreviewDisabled() {
    var value by remember { mutableStateOf("value2") }
    val options = listOf(
        DropdownOption("value1", "label1"),
        DropdownOption("value2", "label2"),
        DropdownOption("value3", "label3")
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

@Preview(showBackground = true)
@Composable
fun DropdownPreviewReadOnly() {
    var value by remember { mutableStateOf("value2") }
    val options = listOf(
        DropdownOption("value1", "label1"),
        DropdownOption("value2", "label2"),
        DropdownOption("value3", "label3")
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