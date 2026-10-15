package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.core.components.containers.ObjectReferenceComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.common.Heading
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithVisibility

class ObjectReferenceRenderer : ComponentRenderer<ObjectReferenceComponent> {
    @Composable
    override fun ObjectReferenceComponent.Render() {
        WithVisibility(visible) {
            Column {
                if (isDisplayOnly && label.isNotEmpty()) {
                    Heading(label, Modifier.padding(vertical = 8.dp), fontSize = 16.sp)
                }
                if (isDisplayOnly) {
                    FlowRow {
                        children.forEachIndexed { index, component ->
                            component.Render()
                            if (index < children.size - 1) Text(", ")
                        }
                    }
                } else {
                    children.forEach { it.Render() }
                }
            }
        }
    }
}
