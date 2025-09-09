package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import org.jetbrains.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.Input

@Composable
fun Unsupported(label: String) {
    Input(
        value = "",
        label = label,
        disabled = true
    )
}

@Preview
@Composable
fun UnsupportedPreview() {
    Box(Modifier.padding(8.dp)) {
        Unsupported("Unsupported component 'Url'")
    }
}

@Preview
@Composable
fun UnsupportedLongLabelPreview() {
    Box(Modifier.padding(8.dp)) {
        Unsupported("Unsupported component 'Very long long long long long long component name'")
    }
}
