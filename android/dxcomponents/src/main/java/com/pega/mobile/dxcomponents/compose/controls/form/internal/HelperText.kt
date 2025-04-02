/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.dxcomponents.compose.controls.form.internal

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.sp

@Composable
internal fun HelperText(text: String, validateMessage: String, disabled: Boolean, readOnly: Boolean) {
    when {
        validateMessage.isNotEmpty() && !disabled && !readOnly ->
            Text(text = validateMessage, color = Color.Red, fontSize = 12.sp)

        text.isNotEmpty() -> {
            val color = if (disabled) Color.Gray else Color.Black
            Text(text = text, color = color, fontSize = 12.sp)
        }
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