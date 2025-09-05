package com.pega.mobile.dxcomponents.compose.controls.form

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.pega.mobile.dxcomponents.compose.controls.form.internal.Input

@Composable
fun TextArea(
    value: String,
    label: String,
    modifier: Modifier = Modifier,
    helperText: String = "",
    validateMessage: String = "",
    hideLabel: Boolean = false,
    placeholder: String = "",
    required: Boolean = false,
    disabled: Boolean = false,
    readOnly: Boolean = false,
    onValueChange: (String) -> Unit = {},
    onFocusChange: (Boolean) -> Unit = {}
) {
    Input(
        value = value,
        label = label,
        modifier = modifier,
        helperText = helperText,
        validateMessage = validateMessage,
        hideLabel = hideLabel,
        placeholder = placeholder,
        required = required,
        disabled = disabled,
        readOnly = readOnly,
        onValueChange = onValueChange,
        onFocusChange = onFocusChange,
        lines = 3
    )
}

@Preview(showBackground = true)
@Composable
fun TextAreaPreview() {
    var value by remember { mutableStateOf("") }

    TextArea(
        value = value,
        label = "name",
        helperText = "Write your name",
        placeholder = "Name placeholder",
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun TextAreaPreviewHiddenLabel() {
    var value by remember { mutableStateOf("John Doe") }

    TextArea(
        value = value,
        label = "name",
        helperText = "write your name",
        hideLabel = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun TextAreaPreviewError() {
    var value by remember { mutableStateOf("John Doe") }

    TextArea(
        value = value,
        label = "name",
        helperText = "write your name",
        validateMessage = "Validation failed!",
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun TextAreaPreviewRequired() {
    var value by remember { mutableStateOf("John Snow") }

    TextArea(
        value = value,
        label = "name",
        helperText = "Write your name",
        placeholder = "Name placeholder",
        required = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun TextAreaPreviewDisabled() {
    var value by remember { mutableStateOf("John Snow") }

    TextArea(
        value = value,
        label = "name",
        helperText = "Write your name",
        disabled = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun TextAreaPreviewReadOnly() {
    var value by remember { mutableStateOf("John Snow") }

    TextArea(
        value = value,
        label = "name",
        helperText = "Write your name",
        readOnly = true,
        onValueChange = { value = it }
    )
}