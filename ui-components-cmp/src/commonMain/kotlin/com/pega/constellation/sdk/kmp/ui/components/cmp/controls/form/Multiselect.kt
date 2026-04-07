package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Checkbox
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuAnchorType
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
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.HelperText

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Multiselect(
    selectedKeys: List<String>,
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
    onAdd: (String) -> Unit = {},
    onRemove: (String) -> Unit = {},
) {
    var expanded by remember { mutableStateOf(false) }
    var searchText by remember { mutableStateOf("") }

    val selectedLabels = options.filter { selectedKeys.contains(it.key) }.joinToString(", ") { it.label }
    val inputValue = if (expanded || searchText.isNotEmpty()) searchText else selectedLabels
    val filteredOptions =
        remember(options, searchText) {
            if (searchText.isBlank()) {
                options
            } else {
                options.filter { it.label.contains(searchText, ignoreCase = true) }
            }
        }

    ExposedDropdownMenuBox(
        modifier = modifier,
        expanded = expanded,
        onExpandedChange = { newExpanded ->
            if (disabled || readOnly) return@ExposedDropdownMenuBox
            expanded = newExpanded
            if (!newExpanded) {
                searchText = ""
            }
        },
    ) {
        OutlinedTextField(
            value = inputValue,
            onValueChange = {
                searchText = it
                expanded = true
            },
            modifier =
                Modifier
                    .menuAnchor(ExposedDropdownMenuAnchorType.PrimaryEditable)
                    .fillMaxWidth()
                    .onFocusChanged { focused ->
                        if (focused.isFocused && !disabled && !readOnly) {
                            expanded = true
                        }
                        if (!focused.isFocused && !expanded) {
                            searchText = ""
                        }
                    },
            enabled = !disabled,
            readOnly = readOnly,
            label = {
                Label(
                    label = label,
                    hideLabel = hideLabel,
                    required = required,
                    disabled = disabled,
                    readOnly = readOnly,
                )
            },
            placeholder = { Text(placeholder) },
            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded) },
            singleLine = true,
        )

        if (filteredOptions.isNotEmpty()) {
            ExposedDropdownMenu(
                expanded = expanded,
                onDismissRequest = {
                    expanded = false
                    searchText = ""
                },
            ) {
                filteredOptions.forEach { option ->
                    val isSelected = selectedKeys.contains(option.key)
                    DropdownMenuItem(
                        text = {
                            Row(
                                horizontalArrangement = Arrangement.spacedBy(12.dp),
                                modifier = Modifier.fillMaxWidth(),
                            ) {
                                Checkbox(
                                    checked = isSelected,
                                    onCheckedChange = null,
                                    enabled = !disabled && !readOnly,
                                )
                                Text(option.label)
                            }
                        },
                        onClick = {
                            if (disabled || readOnly) return@DropdownMenuItem
                            if (isSelected) {
                                onRemove(option.key)
                            } else {
                                onAdd(option.key)
                            }
                        },
                        contentPadding = ExposedDropdownMenuDefaults.ItemContentPadding,
                    )
                }
            }
        }
    }

    HelperText(
        text = helperText,
        validateMessage = validateMessage,
        disabled = disabled,
        readOnly = readOnly,
    )
}

@Preview(showBackground = true)
@Composable
fun MultiselectPreview() {
    var selectedKeys by remember { mutableStateOf(listOf("1")) }
    val options =
        listOf(
            SelectableOption("1", "Option 1"),
            SelectableOption("2", "Option 2"),
            SelectableOption("3", "Option 3"),
        )

    Multiselect(
        selectedKeys = selectedKeys,
        label = "Cars",
        options = options,
        onAdd = { selectedKeys = (selectedKeys + it).distinct() },
        onRemove = { selectedKeys = selectedKeys.filterNot { key -> key == it } },
    )
}
