package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.containers.ViewContainerComponent
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render

class ViewContainerRenderer : ComponentRenderer<ViewContainerComponent> {
    @Composable
    override fun ViewContainerComponent.Render() {
        Column {
            children.forEach { it.Render() }
        }
    }
}
