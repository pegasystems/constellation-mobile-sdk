package com.pega.mobile.dxcomponents.compose.controls.form

import android.content.Context
import android.text.format.DateFormat
import android.util.Log
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.PressInteraction
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TimePicker
import androidx.compose.material3.TimePickerState
import androidx.compose.material3.rememberTimePickerState
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
import com.pega.mobile.dxcomponents.compose.controls.form.ClockFormat.Companion.is24Hour
import com.pega.mobile.dxcomponents.compose.controls.form.internal.Input
import kotlinx.coroutines.flow.filter
import java.time.LocalTime
import java.time.format.DateTimeFormatter

@OptIn(ExperimentalMaterial3Api::class)
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
    onValueChange: (LocalTime?) -> Unit = {},
    onFocusChange: (Boolean) -> Unit = {}
) {
    var showDialog by remember { mutableStateOf(false) }
    val context = LocalContext.current
    val is24Hour = clockFormat.is24Hour(context)

    if (showDialog) {
        TimePickerModal(
            value = value ?: LocalTime.of(0, 0),
            is24Hour = is24Hour,
            onTimeSelected = { timePickerState ->
                timePickerState?.let {
                    onValueChange(LocalTime.of(it.hour, it.minute, 0))
                }
                showDialog = false
            },
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


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TimePickerModal(
    value: LocalTime,
    is24Hour: Boolean,
    onTimeSelected: (TimePickerState?) -> Unit,
    onDismiss: () -> Unit
) {
    val timePickerState = rememberTimePickerState(
        initialHour = value.hour,
        initialMinute = value.minute,
        is24Hour = is24Hour
    )

    TimePickerDialog(
        onDismiss = onDismiss,
        onConfirm = { onTimeSelected(timePickerState) },
        content = { TimePicker(state = timePickerState) }
    )
}

@Composable
fun TimePickerDialog(
    onDismiss: () -> Unit,
    onConfirm: () -> Unit,
    content: @Composable () -> Unit
) {
    AlertDialog(
        onDismissRequest = onDismiss,
        dismissButton = {
            TextButton(onClick = { onDismiss() }) {
                Text("Cancel")
            }
        },
        confirmButton = {
            TextButton(onClick = { onConfirm() }) {
                Text("OK")
            }
        },
        text = { content() }
    )
}

enum class ClockFormat {
    H_12, H_24, FROM_LOCALE;

    companion object {
        private const val TAG = "ClockFormat"
        fun String.toClockFormat() =
            when (this) {
                "" -> FROM_LOCALE
                "12" -> H_12
                "24" -> H_24
                else -> {
                    Log.w(TAG, "Unrecognized clock format: $this, fallback to 'FROM_LOCALE'")
                    FROM_LOCALE
                }
            }
        fun ClockFormat.is24Hour(context: Context) =
            this == H_24 || (this == FROM_LOCALE && DateFormat.is24HourFormat(context))
    }
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

