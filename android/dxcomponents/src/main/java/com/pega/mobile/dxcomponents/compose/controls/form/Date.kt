package com.pega.mobile.dxcomponents.compose.controls.form

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.PressInteraction
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.pega.mobile.dxcomponents.compose.controls.form.internal.DatePickerModal
import com.pega.mobile.dxcomponents.compose.controls.form.internal.Input
import kotlinx.coroutines.flow.filter
import java.time.LocalDate

@Composable
fun Date(
    value: LocalDate?,
    label: String,
    modifier: Modifier = Modifier,
    helperText: String = "",
    validateMessage: String = "",
    hideLabel: Boolean = false,
    placeholder: String = "",
    required: Boolean = false,
    disabled: Boolean = false,
    readOnly: Boolean = false,
    onValueChange: (LocalDate) -> Unit = {},
    onFocusChange: (Boolean) -> Unit = {}
) {
    var showDialog by remember { mutableStateOf(false) }
    if (showDialog) {
        DatePickerModal(
            value = value,
            onDateSelected = { onValueChange(it) },
            onDismiss = { showDialog = false }
        )
    }
    // intercept clicks
    val interactionSource = remember { MutableInteractionSource() }
    LaunchedEffect(interactionSource, disabled, readOnly) {
        if (!disabled && !readOnly) {
            interactionSource.interactions
                .filter { it is PressInteraction.Release }
                .collect { showDialog = true }
        }
    }

    Input(
        value = value?.toString().orEmpty(),
        label = label,
        modifier = modifier,
        helperText = helperText,
        validateMessage = validateMessage,
        hideLabel = hideLabel,
        placeholder = placeholder,
        required = required,
        disabled = disabled,
        readOnly = readOnly, //TODO: fixing missing validation message, need to handle readOnly for date in other way
        onValueChange = {},
        onFocusChange = onFocusChange,
        trailingIcon = { Icon(Icons.Default.DateRange, "Select date") },
        interactionSource = interactionSource
    )
}

@Preview(showBackground = true, heightDp = 720, widthDp = 480)
@Composable
fun DatePreview() {
    var value: LocalDate? by remember { mutableStateOf(null) }

    Date(
        modifier = Modifier.padding(8.dp),
        value = value,
        label = "Birth date",
        helperText = "select date of birth",
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun DatePreviewDisabled() {
    Date(
        value = LocalDate.parse("2020-10-10"),
        label = "Birth date",
        disabled = true,
        onValueChange = { error("unexpected") }
    )
}

@Preview(showBackground = true)
@Composable
fun DatePreviewReadOnly() {
    Date(
        value = LocalDate.parse("1980-01-01"),
        label = "Birth date",
        readOnly = true,
        onValueChange = { error("unexpected") }
    )
}

@Preview(showBackground = true)
@Composable
fun DatePreviewRequired() {
    Date(
        value = LocalDate.parse("2024-09-27"),
        label = "Birth date",
        required = true
    )
}

@Preview(showBackground = true)
@Composable
fun DatePreviewValidateMessage() {
    Date(
        value = LocalDate.parse("2024-09-27"),
        label = "Birth date",
        validateMessage = "Some error!",
        helperText = "select date of birth"
    )
}

