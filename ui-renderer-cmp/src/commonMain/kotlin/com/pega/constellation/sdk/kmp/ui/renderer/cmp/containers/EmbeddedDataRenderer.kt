package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.containers.EmbeddedDataComponent
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithVisibility

class EmbeddedDataRenderer : ComponentRenderer<EmbeddedDataComponent> {
    @Composable
    override fun EmbeddedDataComponent.Render() {
        WithVisibility(visible) {
            Column {
                children.forEach { it.Render() }
            }
        }
    }
}
