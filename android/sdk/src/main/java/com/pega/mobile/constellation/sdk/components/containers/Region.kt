package com.pega.mobile.constellation.sdk.components.containers

import androidx.compose.runtime.Composable
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.dxcomponents.compose.containers.Column

class RegionComponent(context: ComponentContext) : ContainerComponent(context) {
    override val state = RegionState()
}

class RegionState : ContainerState()

class RegionRenderer : ComponentRenderer<RegionComponent> {
    @Composable
    override fun Render(component: RegionComponent) {
        Column {
            component.state.children.forEach { it.Render() }
        }
    }
}
