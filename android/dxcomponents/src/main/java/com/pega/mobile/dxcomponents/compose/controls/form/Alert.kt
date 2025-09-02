package com.pega.mobile.dxcomponents.compose.controls.form

import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview

@Composable
fun Alert(message: String, onConfirm: () -> Unit) {
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
        }
    )
}

@Preview
@Composable
fun AlertPreview() {
    Alert(
        message = "This is an alert message.",
        onConfirm = {}
    )
}