package com.pega.mobile.constellation.sdk.components.containers

import androidx.compose.runtime.Composable
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.dxcomponents.compose.containers.Column

class ViewContainerComponent(context: ComponentContext) : ContainerComponent(context) {
    override val state = ViewContainerState()
}

class ViewContainerState : ContainerState()

class ViewContainerRenderer : ComponentRenderer<ViewContainerComponent> {
    @Composable
    override fun Render(component: ViewContainerComponent) {
        Column {
            component.state.children.forEach { it.Render() }
        }
    }
}
