package com.pega.mobile.constellation.sdk.components.containers

import androidx.compose.runtime.Composable
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.dxcomponents.compose.containers.Column

class RootContainerComponent(context: ComponentContext) : ContainerComponent(context) {
    override val viewModel = RootContainerViewModel()
}

class RootContainerViewModel : ContainerViewModel()

class RootContainerRenderer : ComponentRenderer<RootContainerViewModel> {
    @Composable
    override fun Render(viewModel: RootContainerViewModel) {
        Column {
            viewModel.children.forEach { it.Render() }
        }
    }
}
