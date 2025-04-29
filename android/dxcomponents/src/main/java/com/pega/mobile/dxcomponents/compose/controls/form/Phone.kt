package com.pega.mobile.dxcomponents.compose.controls.form

import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Phone
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import com.pega.mobile.dxcomponents.compose.controls.form.internal.Input
import com.pega.mobile.dxcomponents.compose.controls.form.utils.CountryCodes

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
    if (showCountryFlag) {
        CountryCodes.getCountryFlag(value)?.let { Text(it) } ?: Icon(Icons.Filled.Phone, null)
    } else {
        Icon(Icons.Filled.Phone, null)
    }
}

@Preview(showBackground = true)
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

@Preview(showBackground = true)
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


@Preview(showBackground = true)
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
