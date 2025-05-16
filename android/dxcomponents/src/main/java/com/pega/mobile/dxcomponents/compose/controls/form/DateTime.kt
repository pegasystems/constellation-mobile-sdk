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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.pega.mobile.dxcomponents.compose.controls.form.internal.ClockFormat
import com.pega.mobile.dxcomponents.compose.controls.form.internal.ClockFormat.Companion.is24Hour
import com.pega.mobile.dxcomponents.compose.controls.form.internal.DatePickerModal
import com.pega.mobile.dxcomponents.compose.controls.form.internal.Input
import com.pega.mobile.dxcomponents.compose.controls.form.internal.TimePickerModal
import kotlinx.coroutines.flow.filter
import java.time.LocalDateTime
import java.time.LocalTime
import java.time.format.DateTimeFormatter

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
    var localDate by remember { mutableStateOf(value?.toLocalDate()) }

    if (showDateDialog) {
        DatePickerModal(
            value = localDate,
            onDateSelected = {
                localDate = it
                showTimeDialog = true
            },
            onDismiss = { showDateDialog = false }
        )
    }

    val context = LocalContext.current
    val is24Hour = clockFormat.is24Hour(context)
    if (showTimeDialog) {
        TimePickerModal(
            value = value?.toLocalTime(),
            is24Hour = is24Hour,
            onTimeSelected = {
                val newValue = LocalDateTime.of(localDate, it)
                onValueChange(newValue)
            },
            onDismiss = { showTimeDialog = false }
        )
    }

    // intercept clicks
    val interactionSource = remember { MutableInteractionSource() }
    LaunchedEffect(interactionSource, disabled, readOnly) {
        if (!disabled && !readOnly) {
            interactionSource.interactions
                .filter { it is PressInteraction.Release }
                .collect { showDateDialog = true }
        }
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
        readOnly = readOnly, //TODO: fixing missing validation message, need to handle readOnly for date in other way
        onValueChange = {},
        onFocusChange = onFocusChange,
        trailingIcon = { Icon(Icons.Default.DateRange, "Select date") },
        interactionSource = interactionSource
    )
}

private fun LocalDateTime.parseDateTimeValue(is24Hour: Boolean): String {
    val pattern = if (is24Hour) "HH:mm" else "hh:mm a"
    val formattedTime = DateTimeFormatter.ofPattern(pattern).format(LocalTime.of(hour, minute))
    return "${this.toLocalDate()} $formattedTime"
}

@Preview(showBackground = true, heightDp = 720, widthDp = 480)
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