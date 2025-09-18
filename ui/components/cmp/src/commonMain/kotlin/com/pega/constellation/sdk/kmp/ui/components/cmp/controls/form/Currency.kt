package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import org.jetbrains.compose.ui.tooling.preview.Preview
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.Input
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.getCurrencySymbol

@Composable
fun Currency(
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
    isoCode: String = "",
    showIsoCode: Boolean = false,
    decimalPrecision: Int = 2,
    onValueChange: (String) -> Unit = {},
    onFocusChange: (Boolean) -> Unit = {}
) {
    val keyboardType =
        if (decimalPrecision == 0) KeyboardType.NumberPassword else KeyboardType.Number
    val leadingIcon: @Composable () -> Unit =
        if (showIsoCode) {
            { Text(isoCode) }
        } else {
            { Text(getCurrencySymbol(isoCode))}
        }
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
        onValueChange = { onValueChange(formatValue(it, decimalPrecision)) },
        onFocusChange = onFocusChange,
        keyboardOptions = KeyboardOptions(keyboardType = keyboardType),
        leadingIcon = leadingIcon
    )
}

private fun formatValue(value: String, decimalPrecision: Int) =
    value.replace(",", "").let {
        if (decimalPrecision == 0) {
            return@let it.replace(".", "")
        }
        val decimalPlacesIndex = decimalPrecision + 1
        val separatorIndex = it.indexOf('.')
        if (separatorIndex != -1 && it.length - separatorIndex > decimalPlacesIndex) {
            it.substring(0, separatorIndex + decimalPlacesIndex)
        } else {
            it
        }
    }


@Preview
@Composable
fun CurrencyPreview() {
    var value by remember { mutableStateOf("") }
    Currency(
        value = value,
        label = "Salary",
        helperText = "What is your salary",
        placeholder = "Salary placeholder",
        isoCode = "USD",
        showIsoCode = false,
        decimalPrecision = 2,
        onValueChange = { value = it }
    )
}

@Preview
@Composable
fun CurrencyPreviewNoDecimal() {
    var value by remember { mutableStateOf("") }
    Currency(
        value = value,
        label = "Salary",
        helperText = "What is your salary",
        placeholder = "Salary placeholder",
        isoCode = "USD",
        showIsoCode = true,
        decimalPrecision = 0,
        onValueChange = { value = it }
    )

}
