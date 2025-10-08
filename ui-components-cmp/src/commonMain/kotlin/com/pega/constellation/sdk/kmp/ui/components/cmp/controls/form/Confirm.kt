package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import org.jetbrains.compose.ui.tooling.preview.Preview

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
                Text("OK")
            }
        },
        dismissButton = {
            TextButton(
                onClick = {
                    onCancel()
                }
            ) {
                Text("Cancel")
            }
        }
    )
}

@Preview(showBackground = true)
@Composable
fun ConfirmPreview() {
    Confirm(
        message = "Are you sure you want to discard changes?",
        onConfirm = {},
        onCancel = {}
    )
}
