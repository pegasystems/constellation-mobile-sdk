package com.pega.mobile.dxcomponents.compose.controls.form

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

@Composable
fun Unsupported(label: String) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 8.dp, bottom = 8.dp)
            .border(1.dp, Color.Gray),
        contentAlignment = Alignment.Center
    ) {
        Text(
            label,
            modifier = Modifier.padding(8.dp),
            color = Color.Gray,
            textAlign = TextAlign.Center
        )
    }
}

@Preview(showBackground = true)
@Composable
fun UnsupportedPreview() {
    Unsupported("Unsupported component 'Url' for property '.Url'")
}

@Preview(showBackground = true)
@Composable
fun UnsupportedLongLabelPreview() {
    Unsupported("Unsupported component 'Very long long long long long long component name'")
}