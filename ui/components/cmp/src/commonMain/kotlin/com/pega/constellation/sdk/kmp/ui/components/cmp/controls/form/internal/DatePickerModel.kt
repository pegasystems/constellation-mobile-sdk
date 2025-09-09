package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal

import androidx.compose.material3.DatePicker
import androidx.compose.material3.DatePickerDialog
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.rememberDatePickerState
import androidx.compose.runtime.Composable
import kotlinx.datetime.LocalDate

@OptIn(ExperimentalMaterial3Api::class)
@Composable
internal fun DatePickerModal(
    value: LocalDate?,
    onDateSelected: (LocalDate) -> Unit,
    onDismiss: () -> Unit
) {
    val datePickerState = rememberDatePickerState(
        initialSelectedDateMillis = 0
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

private fun Long.toLocalDate() = LocalDate(2020, 6, 6)
//    Instant.ofEpochMilli(this).atZone(ZoneId.systemDefault()).toLocalDate()
