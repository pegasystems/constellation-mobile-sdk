package com.pega.mobile.dxcomponents.compose.controls.form.internal

import androidx.compose.material3.DatePicker
import androidx.compose.material3.DatePickerDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.rememberDatePickerState
import androidx.compose.runtime.Composable
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.time.ZoneOffset

@OptIn(ExperimentalMaterial3Api::class)
@Composable
internal fun DatePickerModal(
    value: LocalDate?,
    onDateSelected: (LocalDate) -> Unit,
    onDismiss: () -> Unit
) {
    val datePickerState = rememberDatePickerState(
        initialSelectedDateMillis = value?.atStartOfDay()?.toInstant(ZoneOffset.UTC)?.toEpochMilli()
    )

    DatePickerDialog(
        onDismissRequest = onDismiss,
        confirmButton = {
            TextButton(
                onClick = {
                    datePickerState.selectedDateMillis?.let {
                        onDateSelected(it.toLocalDate())
                    }
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

private fun Long.toLocalDate() =
    Instant.ofEpochMilli(this).atZone(ZoneId.systemDefault()).toLocalDate()