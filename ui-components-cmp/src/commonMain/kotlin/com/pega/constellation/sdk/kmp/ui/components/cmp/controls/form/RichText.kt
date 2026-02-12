package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.TextFieldValue
import be.digitalia.compose.htmlconverter.htmlToAnnotatedString
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.Input

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
        Input(
            value = TextFieldValue(rememberAnnotated(value)),
            label = label,
            modifier = modifier,
            helperText = helperText,
            validateMessage = validateMessage,
            required = required,
            disabled = disabled,
            readOnly = true, // not allowing editing in RichText for now
            lines = 3
        )
    }
}

@Composable
fun RichTextFieldValue(label: String, value: String) {
    FieldValue(label, rememberAnnotated(value))
}

@Composable
private fun rememberAnnotated(value: String) =
    remember(value) { htmlToAnnotatedString(value, compactMode = true) }
