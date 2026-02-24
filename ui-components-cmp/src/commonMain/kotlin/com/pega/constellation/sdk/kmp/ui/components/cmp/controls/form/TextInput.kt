package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.Input

@Composable
fun TextInput(
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
        onFocusChange = onFocusChange
    )
}

@Preview(showBackground = true)
@Composable
fun TextInputPreview() {
    var value by remember { mutableStateOf("") }

    TextInput(
        value = value,
        label = "name",
        helperText = "Write your name",
        placeholder = "Name placeholder",
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun TextInputPreviewHiddenLabel() {
    var value by remember { mutableStateOf("John Doe") }

    TextInput(
        value = value,
        label = "name",
        helperText = "write your name",
        hideLabel = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun TextInputPreviewError() {
    var value by remember { mutableStateOf("John Doe") }

    TextInput(
        value = value,
        label = "name",
        helperText = "write your name",
        validateMessage = "Validation failed!",
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun TextInputPreviewRequired() {
    var value by remember { mutableStateOf("John Snow") }

    TextInput(
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
fun TextInputPreviewDisabled() {
    var value by remember { mutableStateOf("John Snow") }

    TextInput(
        value = value,
        label = "name",
        helperText = "Write your name",
        disabled = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun TextInputPreviewReadOnly() {
    var value by remember { mutableStateOf("John Snow") }

    TextInput(
        value = value,
        label = "name",
        helperText = "Write your name",
        readOnly = true,
        onValueChange = { value = it }
    )
}
