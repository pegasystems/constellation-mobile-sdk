package com.pega.mobile.dxcomponents.compose.controls.form

import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import com.pega.mobile.dxcomponents.compose.controls.form.internal.Input
import java.text.DecimalFormat

@Composable
fun Decimal(
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
    decimalPrecision: Int = 2,
    showGroupSeparators: Boolean = false,
    onValueChange: (String) -> Unit = {},
    onFocusChange: (Boolean) -> Unit = {},
) {
    val decimalFormat = remember(decimalPrecision, showGroupSeparators) {
        DecimalFormat(
            buildString {
                if (showGroupSeparators) append("#,##0") else append("0")
                if (decimalPrecision > 0) append(".").append("0".repeat(decimalPrecision))
            }
        )
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
        onValueChange = {
            val input = it.replace(",", "")
            val newValue = when {
                input.isEmpty() -> ""
                decimalPrecision > 0 && value.contains(".") && !input.contains(".") -> value
                else -> runCatching { decimalFormat.format(input.toDouble()) }.getOrDefault(value)
            }
            onValueChange(newValue)
        },
        onFocusChange = onFocusChange,
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal)
    )
}

@Preview(showBackground = true)
@Composable
fun DecimalPreview() {
    var value by remember { mutableStateOf("1003.73") }
    Integer(
        value = value,
        label = "Calculation",
        helperText = "How much is 1002.52 + 1.21?",
        placeholder = "Calculation placeholder",
        onValueChange = { value = it }
    )
}
