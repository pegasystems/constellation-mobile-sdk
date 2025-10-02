package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.Input
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.utils.CountryCodes
import constellation_mobile_sdk.ui.components.cmp.generated.resources.Res
import constellation_mobile_sdk.ui.components.cmp.generated.resources.icon_phone
import org.jetbrains.compose.resources.painterResource
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
    val phoneRes = painterResource(Res.drawable.icon_phone)
    if (showCountryFlag) {
        CountryCodes.getCountryFlag(value)?.let { Text(it) } ?: Icon(phoneRes, "Phone")
    } else {
        Icon(phoneRes, "Phone")
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
