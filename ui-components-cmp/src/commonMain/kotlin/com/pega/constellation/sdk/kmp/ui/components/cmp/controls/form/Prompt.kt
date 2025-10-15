package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.ui.tooling.preview.Preview

@Composable
fun Prompt(
    message: String,
    defaultValue: String = "",
    onConfirm: (String) -> Unit,
    onCancel: () -> Unit = {}
) {
    val (input, setInput) = remember { mutableStateOf(defaultValue) }

    AlertDialog(
        onDismissRequest = { onCancel() },
        text = {
            Column {
                Text(text = message)
                Spacer(modifier = Modifier.height(8.dp))
                TextField(
                    value = input,
                    onValueChange = setInput,
                    singleLine = true
                )
            }
        },
        confirmButton = {
            TextButton(onClick = { onConfirm(input) }) {
                Text("OK")
            }
        },
        dismissButton = {
            TextButton(onClick = onCancel) {
                Text("Cancel")
            }
        }
    )
}

@Preview(showBackground = true)
@Composable
fun PromptPreview() {
    Prompt(
        message = "Enter a value:",
        defaultValue = "Default text",
        onConfirm = {},
        onCancel = {})
}