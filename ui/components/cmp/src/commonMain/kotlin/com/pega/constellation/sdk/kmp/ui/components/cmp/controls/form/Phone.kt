package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.Input
import org.jetbrains.compose.ui.tooling.preview.Preview

@Composable
fun Phone(
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
    showCountryFlag: Boolean = true,
    onValueChange: (String) -> Unit = {},
    onFocusChange: (Boolean) -> Unit = {}
) {
    Input(
        value = value,
        label = label,
        modifier = modifier,
        helperText = helperText,
        validateMessage = validateMessage,
        hideLabel = hideLabel,
        placeholder = placeholder,
        required = required,
        disabled = disabled,
        readOnly = readOnly,
        onValueChange = onValueChange,
        onFocusChange = onFocusChange,
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone),
        leadingIcon = { LeadingIcon(value, showCountryFlag) }
    )
}

@Composable
private fun LeadingIcon(value: String, showCountryFlag: Boolean) {
    // TODO
    if (showCountryFlag) {
//        CountryCodes.getCountryFlag(value)?.let { Text(it) } ?: Icon(Icons.Filled.Phone, null)
    } else {
//        Icon(Icons.Filled.Phone, null)
    }
}

@Preview
@Composable
fun PhonePreview() {
    var value by remember { mutableStateOf("+1-242999888777") }
    Phone(
        value = value,
        label = "Phone",
        helperText = "helper text",
        showCountryFlag = true,
        onValueChange = { value = it }
    )
}

@Preview
@Composable
fun PhonePreviewNoCountryFlag() {
    var value by remember { mutableStateOf("+1-242999888777") }

    Phone(
        value = value,
        label = "Phone",
        helperText = "helper text",
        showCountryFlag = false,
        onValueChange = { value = it }
    )
}


@Preview
@Composable
fun PhonePreviewEmpty() {
    var value by remember { mutableStateOf("") }
    Phone(
        value = value,
        label = "Phone",
        helperText = "helper text",
        placeholder = "Enter phone number",
        showCountryFlag = true,
        onValueChange = { value = it }
    )
}
