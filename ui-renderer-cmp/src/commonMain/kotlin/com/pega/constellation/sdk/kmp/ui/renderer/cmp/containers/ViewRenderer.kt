package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.core.components.containers.ViewComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.common.Heading
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithVisibility

class ViewRenderer : ComponentRenderer<ViewComponent> {
    @Composable
    override fun ViewComponent.Render() {
        WithVisibility(visible) {
            Column(Modifier.padding(bottom = 8.dp)) {
                if (showLabel && label.isNotEmpty()) {
                    Heading(label, Modifier.padding(vertical = 8.dp), fontSize = 16.sp)
                }
                children.forEach { it.Render() }
            }
        }
    }
}
