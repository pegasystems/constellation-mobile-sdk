package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuAnchorType
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.text.TextRange
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.tooling.preview.Preview
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.HelperText

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AutoComplete(
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
    var searchText by remember { mutableStateOf(TextFieldValue("")) }

    LaunchedEffect(value, options) {
        searchText = options.getSelectedLabel(value)
    }

    val filteredOptions = remember(searchText.text, options) {
        if (searchText.text.isEmpty()) {
            options
        } else {
            options.filter { it.label.contains(searchText.text, ignoreCase = true) }
        }
    }

    Column(modifier = modifier) {
        ExposedDropdownMenuBox(
            expanded = expanded,
            onExpandedChange = {
                if (disabled || readOnly) return@ExposedDropdownMenuBox
                expanded = !expanded
            }
        ) {
            OutlinedTextField(
                value = searchText,
                onValueChange = {
                    searchText = it
                    expanded = true
                },
                modifier = Modifier
                    .menuAnchor(ExposedDropdownMenuAnchorType.PrimaryEditable)
                    .fillMaxWidth()
                    .onFocusChanged { isFocused ->
                        when {
                            isFocused.isFocused -> {}
                            searchText.text.isEmpty() -> onValueChange("")
                            !isFocused.isFocused -> searchText = options.getSelectedLabel(value)
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
                        readOnly = readOnly
                    )
                },
                placeholder = { Text(placeholder) },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded) },
                singleLine = true
            )

            if (filteredOptions.isNotEmpty()) {
                ExposedDropdownMenu(
                    expanded = expanded,
                    onDismissRequest = { expanded = false }
                ) {
                    filteredOptions.forEach { option ->
                        DropdownMenuItem(
                            text = { Text(option.label) },
                            onClick = {
                                searchText =
                                    TextFieldValue(option.label, TextRange(option.label.length))
                                expanded = false
                                onValueChange(option.key)
                            },
                            contentPadding = ExposedDropdownMenuDefaults.ItemContentPadding
                        )
                    }
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

private fun List<SelectableOption>.getSelectedLabel(value: String) =
    find { it.key == value }?.let {
        TextFieldValue(it.label, TextRange(it.label.length))
    } ?: TextFieldValue("")

@Preview(showBackground = true)
@Composable
fun AutoCompletePreview() {
    var value by remember { mutableStateOf("") }
    val options = listOf(
        SelectableOption("1", "Option 1"),
        SelectableOption("2", "Option 2"),
        SelectableOption("3", "Option 3")
    )
    AutoComplete(
        value = value,
        label = "Label",
        options = options,
        onValueChange = { value = it }
    )
}
