package com.pega.mobile.dxcomponents.compose.controls.form

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.pega.mobile.dxcomponents.compose.controls.form.internal.Input

@Composable
fun Unsupported(label: String) {
    Input(
        value = "",
        label = label,
        disabled = true
    )
}

@Preview(showBackground = true)
@Composable
fun UnsupportedPreview() {
    Box(Modifier.padding(8.dp)) {
        Unsupported("Unsupported component 'Url'")
    }
}

@Preview(showBackground = true)
@Composable
fun UnsupportedLongLabelPreview() {
    Box(Modifier.padding(8.dp)) {
        Unsupported("Unsupported component 'Very long long long long long long component name'")
    }
}