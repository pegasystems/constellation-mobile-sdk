package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Switch
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import org.jetbrains.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.HelperText

@Composable
fun Switch(
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
            Switch(
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
fun SwitchPreview() {
    var value by remember { mutableStateOf(false) }
    Switch(
        value = value,
        caption = "switch label",
        helperText = "Helper text",
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun SwitchPreviewLabel() {
    var value by remember { mutableStateOf(false) }
    Switch(
        value = value,
        caption = "switch label",
        helperText = "Helper text",
        label = "Top label",
        hideLabel = false,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun SwitchPreviewHiddenLabel() {
    var value by remember { mutableStateOf(false) }
    Switch(
        value = value,
        caption = "switch label",
        helperText = "Helper text",
        label = "Top label",
        hideLabel = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun SwitchPreviewError() {
    var value by remember { mutableStateOf(false) }
    Switch(
        value = value,
        caption = "switch label",
        helperText = "Helper text",
        validateMessage = "Error!",
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun SwitchPreviewRequired() {
    var value by remember { mutableStateOf(false) }
    Switch(
        value = value,
        caption = "switch label",
        helperText = "Helper text",
        required = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun SwitchPreviewDisabled() {
    var value by remember { mutableStateOf(false) }
    Switch(
        value = value,
        caption = "switch label",
        helperText = "Helper text",
        disabled = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun SwitchPreviewReadOnly() {
    var value by remember { mutableStateOf(false) }
    Switch(
        value = value,
        caption = "switch label",
        helperText = "Helper text",
        readOnly = true,
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun SwitchPreviewEmptyCaption() {
    var value by remember { mutableStateOf(false) }
    Switch(
        value = value,
        caption = "",
        helperText = "Helper text",
        readOnly = true,
        onValueChange = { value = it }
    )
}
