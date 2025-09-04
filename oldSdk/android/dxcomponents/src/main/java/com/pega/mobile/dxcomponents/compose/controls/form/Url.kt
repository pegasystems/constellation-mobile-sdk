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
fun Url(
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
        
    )
}

@Preview(showBackground = true)
@Composable
fun UrlPreview() {
    var value by remember { mutableStateOf("") }

    Url(
        value = value,
        label = "Url",
        helperText = "Write your url",
        placeholder = "Url placeholder",
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun UrlPreviewHiddenLabel() {
    var value by remember { mutableStateOf("https://pega.com") }

    Url(
        value = value,
        label = "Url",
        helperText = "write your url",
        hideLabel = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun UrlPreviewError() {
    var value by remember { mutableStateOf("foobar") }

    Url(
        value = value,
        label = "Url",
        helperText = "write your url",
        validateMessage = "Validation failed!",
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun UrlPreviewRequired() {
    var value by remember { mutableStateOf("https://portal.pega.com") }

    Url(
        value = value,
        label = "Url",
        helperText = "Write your url",
        placeholder = "Url placeholder",
        required = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun UrlPreviewDisabled() {
    var value by remember { mutableStateOf("https://time.pega.com") }

    Url(
        value = value,
        label = "Url",
        helperText = "Write your url",
        disabled = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun UrlPreviewReadOnly() {
    var value by remember { mutableStateOf("https://tango.pega.com") }

    Url(
        value = value,
        label = "Url",
        helperText = "Write your url",
        readOnly = true,
        onValueChange = { value = it }
    )
}