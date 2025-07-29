package com.pega.mobile.constellation.sdk.components.containers

import androidx.compose.runtime.Composable
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.dxcomponents.compose.containers.Column

class DataReferenceComponent(context: ComponentContext) : ContainerComponent(context)

class DataReferenceRenderer : ComponentRenderer<DataReferenceComponent> {
    @Composable
    override fun DataReferenceComponent.Render() {
        Column {
            children.forEach { it.Render() }
        }
    }
}
