package com.pega.mobile.dxcomponents.compose.controls.form

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.PressInteraction
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.pega.mobile.dxcomponents.R
import com.pega.mobile.dxcomponents.compose.controls.form.internal.ClockFormat
import com.pega.mobile.dxcomponents.compose.controls.form.internal.ClockFormat.Companion.is24Hour
import com.pega.mobile.dxcomponents.compose.controls.form.internal.Input
import com.pega.mobile.dxcomponents.compose.controls.form.internal.TimePickerModal
import kotlinx.coroutines.flow.filter
import java.time.LocalTime
import java.time.format.DateTimeFormatter

@Composable
fun Time(
    value: LocalTime?,
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
    onValueChange: (LocalTime) -> Unit = {},
    onFocusChange: (Boolean) -> Unit = {}
) {
    var showDialog by remember { mutableStateOf(false) }
    val context = LocalContext.current
    val is24Hour = clockFormat.is24Hour(context)

    if (showDialog) {
        TimePickerModal(
            value = value,
            is24Hour = is24Hour,
            onTimeSelected = { onValueChange(it) },
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
        value = value?.parseTimeValue(is24Hour) ?: "",
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
        trailingIcon = {
            Icon(
                painterResource(R.drawable.time_icon),
                "Select date",
                modifier = Modifier.size(24.dp)
            )
        },
        interactionSource = interactionSource
    )
}

private fun LocalTime.parseTimeValue(is24Hour: Boolean): String {
    val pattern = if (is24Hour) "HH:mm" else "hh:mm a"
    return DateTimeFormatter.ofPattern(pattern).format(LocalTime.of(hour, minute))
}

@Preview(showBackground = true, heightDp = 720, widthDp = 480)
@Composable
fun TimePreview() {
    var value: LocalTime? by remember { mutableStateOf(null) }

    Time(
        modifier = Modifier.padding(8.dp),
        value = value,
        label = "Birth date",
        helperText = "select date of birth",
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun TimePreviewDisabled() {
    Time(
        value = LocalTime.parse("19:30"),
        label = "TV news",
        disabled = true,
        onValueChange = { error("unexpected") }
    )
}

@Preview(showBackground = true)
@Composable
fun TimePreviewReadOnly() {
    Time(
        value = LocalTime.parse("19:30"),
        label = "TV news",
        readOnly = true,
        onValueChange = { error("unexpected") }
    )
}

@Preview(showBackground = true)
@Composable
fun TimePreviewRequired() {
    Time(
        value = LocalTime.parse("19:30"),
        label = "TV news",
        required = true
    )
}

@Preview(showBackground = true)
@Composable
fun TimePreviewValidateMessage() {
    Time(
        value = LocalTime.parse("19:30"),
        label = "TV news",
        validateMessage = "Some error!",
        helperText = "select date of birth"
    )
}

