package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import com.fleeksoft.ksoup.Ksoup
import com.pega.constellation.sdk.kmp.core.components.containers.DefaultFormComponent
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render

class DefaultFormRenderer : ComponentRenderer<DefaultFormComponent> {
    @Composable
    override fun DefaultFormComponent.Render() {
        if (instructions.isNotEmpty()) {
            val rawText = Ksoup.parse(instructions).wholeText()
            Text(
                text = rawText,
                textAlign = TextAlign.Left,
                modifier = Modifier.fillMaxWidth()
            )
        }
        Column {
            children.forEach { it.Render() }
        }
    }
}