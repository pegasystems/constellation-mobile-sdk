package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.containers.SimpleTableSelectComponent
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render

class SimpleTableSelectRenderer : ComponentRenderer<SimpleTableSelectComponent> {
    @Composable
    override fun SimpleTableSelectComponent.Render() {
        Column {
            child?.Render()
        }
    }
}