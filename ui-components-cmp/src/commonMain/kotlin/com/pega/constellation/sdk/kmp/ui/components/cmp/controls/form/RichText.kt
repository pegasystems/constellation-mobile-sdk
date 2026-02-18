package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.OutlinedTextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.TextFieldValue
import be.digitalia.compose.htmlconverter.htmlToAnnotatedString
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.HelperText

@Composable
fun RichText(
    value: String,
    label: String,
    modifier: Modifier = Modifier,
    helperText: String = "",
    validateMessage: String = "",
    required: Boolean = false,
    disabled: Boolean = false,
    readOnly: Boolean = false
) {
    if (readOnly) {
        // Read-only RichText renders on web as display-only
        RichTextFieldValue(label, value)
    } else {
        Column(modifier = modifier) {
            // not allowing editing in RichText for now
            OutlinedTextField(
                value = TextFieldValue(rememberAnnotated(value)),
                onValueChange = {},
                modifier = Modifier.fillMaxWidth(),
                label = {
                    Label(
                        label = label,
                        hideLabel = false,
                        required = required,
                        disabled = disabled,
                        readOnly = true
                    )
                },
                placeholder = {  },
                enabled = !disabled,
                readOnly = true,
                singleLine = false,
                minLines = 3,
                maxLines = 3,
            )
            HelperText(
                text = helperText,
                validateMessage = validateMessage,
                disabled = disabled,
                readOnly = true
            )
        }
    }
}

@Composable
fun RichTextFieldValue(label: String, value: String) {
    FieldValue(label, rememberAnnotated(value))
}

@Composable
private fun rememberAnnotated(value: String) =
    remember(value) { htmlToAnnotatedString(value, compactMode = true) }
