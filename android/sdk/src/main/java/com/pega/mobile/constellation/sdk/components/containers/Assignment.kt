package com.pega.mobile.constellation.sdk.components.containers

import androidx.compose.runtime.Composable
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.dxcomponents.compose.containers.Column

class AssignmentComponent(context: ComponentContext) : ContainerComponent(context) {
    override val viewModel = AssignmentViewModel()
}

class AssignmentViewModel : ContainerViewModel()

class AssignmentRenderer : ComponentRenderer<AssignmentViewModel> {
    @Composable
    override fun Render(viewModel: AssignmentViewModel) {
        Column {
            viewModel.children.forEach { it.Render() }
        }
    }
}