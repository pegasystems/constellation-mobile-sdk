package com.pega.mobile.dxcomponents.compose.controls.form

import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview

@Composable
fun Confirm(message: String, onConfirm: () -> Unit, onCancel: () -> Unit) {
    AlertDialog(
        text = { Text(text = message) },
        onDismissRequest = {},
        confirmButton = {
            TextButton(
                onClick = {
                    onConfirm()
                }
            ) {
                Text("Discard")
            }
        },
        dismissButton = {
            TextButton(
                onClick = {
                    onCancel()
                }
            ) {
                Text("Go back")
            }
        }
    )
}

@Preview
@Composable
fun ConfirmPreview() {
    Confirm(
        message = "Are you sure you want to discard changes?",
        onConfirm = {},
        onCancel = {}
    )
}