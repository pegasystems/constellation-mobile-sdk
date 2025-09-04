package com.pega.mobile.dxcomponents.compose.controls.form.internal

import androidx.compose.material3.AlertDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TimePicker
import androidx.compose.material3.rememberTimePickerState
import androidx.compose.runtime.Composable
import java.time.LocalTime

@OptIn(ExperimentalMaterial3Api::class)
@Composable
internal fun TimePickerModal(
    value: LocalTime?,
    is24Hour: Boolean,
    onTimeSelected: (LocalTime) -> Unit,
    onDismiss: () -> Unit
) {
    val timePickerState = rememberTimePickerState(
        initialHour = value?.hour ?: 0,
        initialMinute = value?.minute ?: 0,
        is24Hour = is24Hour
    )

    TimePickerDialog(
        onDismiss = onDismiss,
        onConfirm = {
            onTimeSelected(LocalTime.of(timePickerState.hour, timePickerState.minute, 0))
            onDismiss()
        },
        content = { TimePicker(state = timePickerState) }
    )
}

@Composable
internal fun TimePickerDialog(
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