package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.DecimalFormat
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.Input

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
    val precisionFormat = rememberPrecisionFormat(decimalPrecision)
    val precisionGroupFormat = rememberPrecisionGroupFormat(decimalPrecision, showGroupSeparators)

    // displays group separators only when unfocused to avoid jumping cursor
    fun getDisplayValue(value: String, focused: Boolean) = when {
        !focused && showGroupSeparators -> precisionGroupFormat
        else -> precisionFormat
    }.formatOrDefault(value, "")

    var focused by remember { mutableStateOf(false) }
    var displayValue by remember(value) { mutableStateOf(getDisplayValue(value, focused)) }

    Input(
        value = displayValue,
        label = label,
        modifier = modifier,
        helperText = helperText,
        validateMessage = validateMessage,
        hideLabel = hideLabel,
        placeholder = placeholder,
        required = required,
        disabled = disabled,
        readOnly = readOnly,
        onValueChange = { newValue ->
            onValueChange(
                when {
                    newValue.isEmpty() -> ""
                    // do not allow dot or comma without precision
                    decimalPrecision == 0 && listOf(".", ",").any { it in newValue } -> value
                    // do not allow to remove dot with precision
                    decimalPrecision > 0 && newValue == value.replace(".", "") -> value
                    // limit to max value
                    newValue.toDoubleOrNull()?.compareTo(MAX_VALUE) == 1 -> value
                    // use only precision format when editing
                    else -> precisionFormat.formatOrDefault(newValue, value)
                }
            )
        },
        onFocusChange = {
            focused = it
            displayValue = getDisplayValue(value, it)
            onFocusChange(it)
        },
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Decimal)
    )
}

@Composable
private fun rememberPrecisionFormat(decimalPrecision: Int) = remember(decimalPrecision) {
    DecimalFormat(decimalPrecision)
}

@Composable
private fun rememberPrecisionGroupFormat(decimalPrecision: Int, showGroupSeparators: Boolean) =
    remember(decimalPrecision, showGroupSeparators) {
        DecimalFormat(decimalPrecision, showGroupSeparators)
    }

// do not use big numbers as Pega does not support them
private const val MAX_VALUE = 1E8

private fun DecimalFormat.formatOrDefault(value: String, default: String) =
    runCatching { format(value.toDouble()) }.getOrDefault(default)

@Preview(showBackground = true)
@Composable
fun DecimalPreviewInteractive() {
    var value by remember { mutableStateOf("1003.732") }
    Column {
        Decimal(
            value = value,
            label = "Calculation",
            helperText = "How much is 1002.52 + 1.212?",
            decimalPrecision = 3,
            showGroupSeparators = true,
            onValueChange = { value = it }
        )
        Input("Click here to take over focus", "Focus")
    }
}

@Preview(showBackground = true)
@Composable
fun DecimalPreviewWithNoGrouping() {
    var value by remember { mutableStateOf("1234567.89") }
    Decimal(
        value = value,
        label = "No Grouping",
        showGroupSeparators = false,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun DecimalPreviewWithGrouping() {
    var value by remember { mutableStateOf("1234567.89") }
    Decimal(
        value = value,
        label = "With Grouping",
        showGroupSeparators = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun DecimalPreviewWithPrecision() {
    var value by remember { mutableStateOf("1234567.89") }
    Decimal(
        value = value,
        label = "With Precision",
        decimalPrecision = 3,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun DecimalPreviewWithoutPrecision() {
    var value by remember { mutableStateOf("1234567") }
    Decimal(
        value = value,
        label = "Without Precision",
        decimalPrecision = 0,
        showGroupSeparators = false, // does not work only in design mode
        onValueChange = { value = it }
    )
}
