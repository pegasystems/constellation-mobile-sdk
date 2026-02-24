package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.ClockFormat
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.ClockFormat.Companion.is24Hour
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.DatePickerModal
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.Input
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.TimePickerModal
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.parse
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.utils.interceptInteractionSource
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.Res
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.icon_calendar_range
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import org.jetbrains.compose.resources.painterResource

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
    onValueChange: (LocalDateTime?) -> Unit = {},
    onFocusChange: (Boolean) -> Unit = {}
) {
    val focusManager = LocalFocusManager.current
    var showDateDialog by remember { mutableStateOf(false) }
    var showTimeDialog by remember { mutableStateOf(false) }
    var localDate by remember { mutableStateOf<LocalDate?>(null) }

    if (showDateDialog) {
        DatePickerModal(
            value = value?.date,
            onDateSelected = { date ->
                showDateDialog = false
                if (date != null) {
                    localDate = date
                    showTimeDialog = true
                } else {
                    onValueChange(null)
                    showTimeDialog = false
                }
            },
            onDismiss = {
                focusManager.clearFocus()
                showDateDialog = false
            }
        )
    }

    val is24Hour = clockFormat.is24Hour()
    if (showTimeDialog) {
        TimePickerModal(
            value = value?.time,
            is24Hour = is24Hour,
            onTimeSelected = { onValueChange(LocalDateTime(localDate!!, it)) },
            onDismiss = {
                focusManager.clearFocus()
                showTimeDialog = false
            }
        )
    }

    Input(
        value = value?.parse(is24Hour) ?: "",
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
        trailingIcon = { Icon(painterResource(Res.drawable.icon_calendar_range), "Select date") },
        interactionSource = interceptInteractionSource(disabled, readOnly) { showDateDialog = true }
    )
}

@Preview(showBackground = true)
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
