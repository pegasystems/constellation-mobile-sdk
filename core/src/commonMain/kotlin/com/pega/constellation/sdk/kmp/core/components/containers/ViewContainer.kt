package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.components.cmp.containers.Column

class ViewContainerComponent(context: ComponentContext) : ContainerComponent(context)

class ViewContainerRenderer : ComponentRenderer<ViewContainerComponent> {
    @Composable
    override fun ViewContainerComponent.Render() {
        Column {
            children.forEach { it.Render() }
        }
    }
}
