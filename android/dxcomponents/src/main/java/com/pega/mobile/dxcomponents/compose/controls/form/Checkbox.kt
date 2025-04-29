package com.pega.mobile.dxcomponents.compose.controls.form

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Checkbox
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.sp
import com.pega.mobile.dxcomponents.compose.controls.form.internal.HelperText

@Composable
fun Checkbox(
    value: Boolean,
    caption: String,
    modifier: Modifier = Modifier,
    label: String = "",
    helperText: String = "",
    validateMessage: String = "",
    hideLabel: Boolean = false,
    required: Boolean = false,
    disabled: Boolean = false,
    readOnly: Boolean = false,
    onValueChange: (Boolean) -> Unit = {}
) {
    Column(modifier = modifier) {
        Label(
            label = label,
            hideLabel = hideLabel,
            required = required,
            disabled = disabled,
            readOnly = readOnly
        )
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = Modifier.fillMaxWidth()
        ) {
            Label(
                label = caption,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                fontSize = 16.sp
            )
            Checkbox(
                checked = value,
                onCheckedChange = onValueChange,
                enabled = !disabled
            )
        }
        HelperText(
            text = helperText,
            validateMessage = validateMessage,
            disabled = disabled,
            readOnly = readOnly
        )
    }

}

@Preview(showBackground = true)
@Composable
fun CheckboxPreview() {
    var value by remember { mutableStateOf(false) }
    Checkbox(
        value = value,
        caption = "Checkbox label",
        helperText = "Helper text",
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun CheckboxPreviewLabel() {
    var value by remember { mutableStateOf(false) }
    Checkbox(
        value = value,
        caption = "Checkbox label",
        helperText = "Helper text",
        label = "Top label",
        hideLabel = false,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun CheckboxPreviewHiddenLabel() {
    var value by remember { mutableStateOf(false) }
    Checkbox(
        value = value,
        caption = "Checkbox label",
        helperText = "Helper text",
        label = "Top label",
        hideLabel = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun CheckboxPreviewError() {
    var value by remember { mutableStateOf(false) }
    Checkbox(
        value = value,
        caption = "Checkbox label",
        helperText = "Helper text",
        validateMessage = "Error!",
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun CheckboxPreviewRequired() {
    var value by remember { mutableStateOf(false) }
    Checkbox(
        value = value,
        caption = "Checkbox label",
        helperText = "Helper text",
        required = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun CheckboxPreviewDisabled() {
    var value by remember { mutableStateOf(false) }
    Checkbox(
        value = value,
        caption = "Checkbox label",
        helperText = "Helper text",
        disabled = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun CheckboxPreviewReadOnly() {
    var value by remember { mutableStateOf(false) }
    Checkbox(
        value = value,
        caption = "Checkbox label",
        helperText = "Helper text",
        readOnly = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun CheckboxPreviewEmptyCaption() {
    var value by remember { mutableStateOf(false) }
    Checkbox(
        value = value,
        caption = "",
        helperText = "Helper text",
        readOnly = true,
        onValueChange = { value = it }
    )
}
