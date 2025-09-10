package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.components.cmp.containers.Column

class RegionComponent(context: ComponentContext) : ContainerComponent(context)

class RegionRenderer : ComponentRenderer<RegionComponent> {
    @Composable
    override fun RegionComponent.Render() {
        Column {
            children.forEach { it.Render() }
        }
    }
}
