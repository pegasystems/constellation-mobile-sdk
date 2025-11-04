package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.containers.DataReferenceComponent
import androidx.compose.foundation.layout.Column
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render

class DataReferenceRenderer : ComponentRenderer<DataReferenceComponent> {
    @Composable
    override fun DataReferenceComponent.Render() {
        Column {
            children.forEach { it.Render() }
        }
    }
}