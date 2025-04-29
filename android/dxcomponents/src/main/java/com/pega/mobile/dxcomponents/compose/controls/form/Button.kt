package com.pega.mobile.dxcomponents.compose.controls.form

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonColors
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

@Composable
fun Button(
    title: String,
    modifier: Modifier = Modifier,
    colors: ButtonColors = ButtonDefaults.buttonColors(),
    onClick: () -> Unit = {}
) {
    Button(
        onClick = onClick,
        modifier = modifier.padding(4.dp),
        colors = colors
    ) {
        Text(
            text = title,
            textAlign = TextAlign.Center
        )
    }
}

@Preview(showBackground = true)
@Composable
fun ButtonPreview() {
    Button(title = "Submit")
}

@Preview(showBackground = true, widthDp = 100)
@Composable
fun ButtonLongTextPreview() {
    Button(title = "Save for later")
}

@Preview(showBackground = true)
@Composable
fun ButtonPreviewCancel() {
    Button(
        title = "Submit",
        colors = ButtonDefaults.buttonColors(
            containerColor = Color.Gray,
            contentColor = Color.White
        )
    )
}
