package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import org.jetbrains.compose.ui.tooling.preview.Preview
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.Input

@Composable
fun Email(
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
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email)
    )
}

@Preview(showBackground = true)
@Composable
fun EmailPreview() {
    var value by remember { mutableStateOf("") }

    Email(
        value = value,
        label = "email",
        helperText = "Write your email",
        placeholder = "your.email@company.com",
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun EmailPreviewHiddenLabel() {
    var value by remember { mutableStateOf("John.Doe@pega.com") }

    Email(
        value = value,
        label = "email",
        helperText = "Write your email",
        hideLabel = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun EmailPreviewError() {
    var value by remember { mutableStateOf("John.Doe@pega.com") }

    Email(
        value = value,
        label = "email",
        helperText = "Write your email",
        validateMessage = "Validation failed!",
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun EmailPreviewRequired() {
    var value by remember { mutableStateOf("John.Doe@pega.com") }

    Email(
        value = value,
        label = "email",
        helperText = "Write your email",
        placeholder = "Name placeholder",
        required = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun EmailPreviewDisabled() {
    var value by remember { mutableStateOf("John.Doe@pega.com") }

    Email(
        value = value,
        label = "email",
        helperText = "Write your email",
        disabled = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun EmailPreviewReadOnly() {
    var value by remember { mutableStateOf("John.Doe@pega.com") }

    Email(
        value = value,
        label = "email",
        helperText = "Write your email",
        readOnly = true,
        onValueChange = { value = it }
    )
}
