package com.pega.constellation.sdk.kmp.ui.components.cmp.containers

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Button

@Composable
fun Row(
    modifier: Modifier = Modifier,
    content: @Composable RowScope.() -> Unit
) {
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.Center,
        content = content
    )
}

@Preview(showBackground = true)
@Composable
fun RowPreview() {
    Row(
        modifier = Modifier.fillMaxWidth(),
        content = {
            Button(
                title = "Cancel",
                modifier = Modifier.weight(1f)
            )
            Button(
                title = "Fill from with AI",
                modifier = Modifier.weight(1f)
            )
            Button(
                title = "Save for later",
                modifier = Modifier.weight(1f)
            )
        }
    )
}
