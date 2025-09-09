package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.core.Render
import com.pega.constellation.sdk.kmp.ui.components.cmp.containers.Column

class AssignmentComponent(context: ComponentContext) : ContainerComponent(context)

class AssignmentRenderer : ComponentRenderer<AssignmentComponent> {
    @Composable
    override fun AssignmentComponent.Render() {
        Column {
            children.forEach { it.Render() }
        }
    }
}
