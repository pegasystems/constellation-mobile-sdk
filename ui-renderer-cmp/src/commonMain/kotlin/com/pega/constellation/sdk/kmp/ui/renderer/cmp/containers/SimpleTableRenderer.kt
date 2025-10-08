package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.containers.SimpleTableComponent
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render

class SimpleTableRenderer : ComponentRenderer<SimpleTableComponent> {
    @Composable
    override fun SimpleTableComponent.Render() {
        Column {
            child?.Render()
        }
    }
}
