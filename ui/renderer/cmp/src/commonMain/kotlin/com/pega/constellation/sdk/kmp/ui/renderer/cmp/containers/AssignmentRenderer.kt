package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentComponent
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render

class AssignmentRenderer : ComponentRenderer<AssignmentComponent> {
    @Composable
    override fun AssignmentComponent.Render() {
        Column {
            children.forEach { it.Render() }
        }
    }
}