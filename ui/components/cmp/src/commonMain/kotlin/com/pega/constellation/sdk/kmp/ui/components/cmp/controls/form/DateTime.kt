package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.ClockFormat
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.DatePickerModal
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.Input
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.TimePickerModal
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.utils.interceptInteractionSource
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import org.jetbrains.compose.ui.tooling.preview.Preview

@Composable
fun DateTime(
    value: LocalDateTime?,
    label: String,
    modifier: Modifier = Modifier,
    helperText: String = "",
    validateMessage: String = "",
    hideLabel: Boolean = false,
    placeholder: String = "",
    required: Boolean = false,
    disabled: Boolean = false,
    readOnly: Boolean = false,
    clockFormat: ClockFormat = ClockFormat.FROM_LOCALE,
    onValueChange: (LocalDateTime) -> Unit = {},
    onFocusChange: (Boolean) -> Unit = {}
) {
    var showDateDialog by remember { mutableStateOf(false) }
    var showTimeDialog by remember { mutableStateOf(false) }
    var localDate by remember { mutableStateOf<LocalDate?>(null) }

    if (showDateDialog) {
        DatePickerModal(
            value = value?.date,
            onDateSelected = {
                localDate = it
                showTimeDialog = true
            },
            onDismiss = { showDateDialog = false }
        )
    }

    val is24Hour = false // TODO
    if (showTimeDialog) {
        TimePickerModal(
            value = value?.time,
            is24Hour = is24Hour,
            onTimeSelected = { onValueChange(LocalDateTime(localDate!!, it)) },
            onDismiss = { showTimeDialog = false }
        )
    }

    Input(
        value = value?.parseDateTimeValue(is24Hour) ?: "",
        label = label,
        modifier = modifier,
        helperText = helperText,
        validateMessage = validateMessage,
        hideLabel = hideLabel,
        placeholder = placeholder,
        required = required,
        disabled = disabled,
        readOnly = readOnly,
        onValueChange = {},
        onFocusChange = onFocusChange,
// TODO        trailingIcon = { Icon(Icons.Default.DateRange, "Select date") },
        interactionSource = interceptInteractionSource(disabled, readOnly) { showDateDialog = true }
    )
}

private fun LocalDateTime.parseDateTimeValue(is24Hour: Boolean): String {
//    val pattern = if (is24Hour) "HH:mm" else "hh:mm a"
//    val formattedTime = DateTimeFormatter.ofPattern(pattern).format(LocalTime.of(hour, minute))
    // TODO
    return this.toString()
}

@Preview
@Composable
fun DateTimePreview() {
    var value: LocalDateTime? by remember { mutableStateOf(null) }

    DateTime(
        modifier = Modifier.padding(8.dp),
        value = value,
        label = "Meeting date&time",
        helperText = "select date and time",
        onValueChange = { value = it }
    )
}
