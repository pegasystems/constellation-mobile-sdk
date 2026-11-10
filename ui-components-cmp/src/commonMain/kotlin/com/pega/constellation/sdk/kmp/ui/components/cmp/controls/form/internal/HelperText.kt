package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.utils.getTextColor

@Composable
internal fun HelperText(
    text: String,
    validateMessage: String,
    disabled: Boolean,
    readOnly: Boolean,
    modifier: Modifier = Modifier
) {
    when {
        validateMessage.isNotEmpty() && !disabled && !readOnly ->
            Text(
                text = validateMessage,
                modifier = modifier,
                color = MaterialTheme.colorScheme.error,
                fontSize = 12.sp
            )
        text.isNotEmpty() ->
            Text(text = text, modifier = modifier, color = getTextColor(disabled), fontSize = 12.sp)
    }
}

@Preview(showBackground = true)
@Composable
fun HelperTextPreview() {
    HelperText(text = "Helper text", validateMessage = "", disabled = false, readOnly = false)
}

@Preview(showBackground = true)
@Composable
fun HelperTextPreviewValidation() {
    HelperText(text = "Helper text", validateMessage = "Error!", disabled = false, readOnly = false)
}

@Preview(showBackground = true)
@Composable
fun HelperTextPreviewValidationDisabled() {
    HelperText(text = "Helper text", validateMessage = "Error!", disabled = true, readOnly = false)
}

@Preview(showBackground = true)
@Composable
fun HelperTextPreviewValidationReadonly() {
    HelperText(text = "Helper text", validateMessage = "Error!", disabled = false, readOnly = true)
}
