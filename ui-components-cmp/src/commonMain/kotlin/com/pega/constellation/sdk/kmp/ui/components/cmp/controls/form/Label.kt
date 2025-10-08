package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.Row
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import org.jetbrains.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.sp

@Composable
fun Label(
    label: String,
    modifier: Modifier = Modifier,
    hideLabel: Boolean = false,
    required: Boolean = false,
    disabled: Boolean = false,
    readOnly: Boolean = false,
    fontSize: TextUnit = TextUnit.Unspecified
) {
    if (hideLabel || label.isEmpty()) return

    Row(modifier = modifier) {
        Text(text = label, color = textColor(disabled), fontSize = fontSize)
        if (required) {
            Text(" *", color = asteriskColor(disabled, readOnly), fontSize = fontSize)
        }
    }
}

private fun asteriskColor(disabled: Boolean, readOnly: Boolean) =
    when {
        disabled -> Color.Gray
        readOnly -> Color.Black
        else -> Color.Red
    }

private fun textColor(disabled: Boolean) =
    when {
        disabled -> Color.Gray
        else -> Color.Black
    }

@Preview(showBackground = true)
@Composable
fun LabelPreview() {
    Label(label = "Label", required = false, fontSize = 16.sp)
}

@Preview(showBackground = true)
@Composable
fun LabelPreviewRequired() {
    Label(label = "Label", required = true)
}

@Preview(showBackground = true)
@Composable
fun LabelPreviewRequiredDisabled() {
    Label(label = "Label", required = true, disabled = true)
}

@Preview(showBackground = true)
@Composable
fun LabelPreviewHidden() {
    Label(label = "Label", required = true, hideLabel = true)
}

@Preview(showBackground = true)
@Composable
fun LabelPreviewFontSize() {
    Label(label = "Label", fontSize = 30.sp)
}
