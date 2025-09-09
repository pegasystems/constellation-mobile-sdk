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
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.ClockFormat.Companion.is24Hour
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.Input
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.TimePickerModal
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.utils.interceptInteractionSource
import kotlinx.datetime.LocalTime
import org.jetbrains.compose.ui.tooling.preview.Preview

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
    val is24Hour = clockFormat.is24Hour()

    if (showDialog) {
        TimePickerModal(
            value = value,
            is24Hour = is24Hour,
            onTimeSelected = { onValueChange(it) },
            onDismiss = { showDialog = false }
        )
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
        readOnly = readOnly,
        onValueChange = {},
        onFocusChange = onFocusChange,
        trailingIcon = {
            // TODO
//            Icon(painterResource(R.drawable.time_icon), "Select date", Modifier.size(24.dp))
        },
        interactionSource = interceptInteractionSource(disabled, readOnly) { showDialog = true }
    )
}

//private fun LocalTime.parseTimeValue(is24Hour: Boolean): String {
//    val pattern = if (is24Hour) "HH:mm" else "hh:mm a"
//    return DateTimeFormatter.ofPattern(pattern).format(LocalTime.of(hour, minute))
//}

@Preview
@Composable
fun TimePreview() {
    var value: LocalTime? by remember { mutableStateOf(null) }

    Time(
        modifier = Modifier.padding(8.dp),
        value = value,
        label = "TV news",
        helperText = "select time of news",
        onValueChange = { value = it }
    )
}

@Preview
@Composable
fun TimePreviewDisabled() {
    Time(
        value = LocalTime.parse("19:30"),
        label = "TV news",
        disabled = true,
        onValueChange = { error("unexpected") }
    )
}

@Preview
@Composable
fun TimePreviewReadOnly() {
    Time(
        value = LocalTime.parse("19:30"),
        label = "TV news",
        readOnly = true,
        onValueChange = { error("unexpected") }
    )
}

@Preview
@Composable
fun TimePreviewRequired() {
    Time(
        value = LocalTime.parse("19:30"),
        label = "TV news",
        required = true
    )
}

@Preview
@Composable
fun TimePreviewValidateMessage() {
    Time(
        value = LocalTime.parse("19:30"),
        label = "TV news",
        validateMessage = "Some error!",
        helperText = "select time of news"
    )
}

