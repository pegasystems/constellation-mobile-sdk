package com.pega.constellation.sdk.kmp.ui.components.cmp.containers

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Button
import org.jetbrains.compose.ui.tooling.preview.Preview

@Composable
fun Column(
    modifier: Modifier = Modifier,
    content: @Composable ColumnScope.() -> Unit
) {
    Column(
        modifier = modifier,
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Top,
        content = content
    )
}

@Preview(showBackground = true)
@Composable
fun ColumnPreview() {
    Column(Modifier.fillMaxSize().padding(16.dp)) {
        Button(title = "Cancel")
        Button(title = "Fill from with AI")
        Button(title = "Save for later")
    }
}

