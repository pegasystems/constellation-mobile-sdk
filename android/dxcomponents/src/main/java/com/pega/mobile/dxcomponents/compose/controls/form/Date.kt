package com.pega.mobile.dxcomponents.compose.controls.form

import android.graphics.drawable.Icon
import androidx.compose.foundation.focusable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.PressInteraction
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material3.DatePicker
import androidx.compose.material3.DatePickerDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.rememberDatePickerState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.pega.mobile.dxcomponents.R
import com.pega.mobile.dxcomponents.compose.controls.form.internal.Input
import kotlinx.coroutines.flow.filter
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId

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
    onValueChange: (LocalDate?) -> Unit = {},
    onFocusChange: (Boolean) -> Unit = {}
) {
    // date modal dialog
    var showDialog by remember { mutableStateOf(false) }
    if (showDialog) {
        DatePickerModal(
            onDateSelected = { onValueChange(it?.toLocalDate()) },
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

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DatePickerModal(
    onDateSelected: (Long?) -> Unit,
    onDismiss: () -> Unit
) {
    val datePickerState = rememberDatePickerState()

    DatePickerDialog(
        onDismissRequest = onDismiss,
        confirmButton = {
            TextButton(
                onClick = {
                    onDateSelected(datePickerState.selectedDateMillis)
                    onDismiss()
                },
                content = { Text("OK") }
            )
        },
        dismissButton = {
            TextButton(onClick = onDismiss, content = { Text("Cancel") })
        },
        content = {
            DatePicker(state = datePickerState)
        }
    )
}

private fun Long.toLocalDate() = Instant.ofEpochMilli(this).atZone(ZoneId.systemDefault()).toLocalDate()

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

