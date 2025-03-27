package com.pega.mobile.constellation.sdk.components.containers

import androidx.compose.runtime.Composable
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.dxcomponents.compose.containers.Column

class RegionComponent(context: ComponentContext) : ContainerComponent(context) {
    override val viewModel = RegionViewModel()
}

class RegionViewModel : ContainerViewModel()

class RegionRenderer : ComponentRenderer<RegionViewModel> {
    @Composable
    override fun Render(viewModel: RegionViewModel) {
        Column {
            viewModel.children.forEach { it.Render() }
        }
    }
}
