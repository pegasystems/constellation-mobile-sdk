package com.pega.mobile.constellation.sdk.components.containers

import androidx.compose.runtime.Composable
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.dxcomponents.compose.containers.Column

class AssignmentComponent(context: ComponentContext) : ContainerComponent(context) {
    override val state = AssignmentState()
}

class AssignmentState : ContainerState()

class AssignmentRenderer : ComponentRenderer<AssignmentComponent> {
    @Composable
    override fun Render(component: AssignmentComponent) {
        Column {
            component.state.children.forEach { it.Render() }
        }
    }
}