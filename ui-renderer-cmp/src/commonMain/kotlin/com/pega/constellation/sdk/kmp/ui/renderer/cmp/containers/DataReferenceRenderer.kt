package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.core.components.containers.DataReferenceComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.common.Heading
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render

class DataReferenceRenderer : ComponentRenderer<DataReferenceComponent> {
    @Composable
    override fun DataReferenceComponent.Render() {
        if (isDisplayOnly) {
            Column {
                if (label.isNotEmpty()) {
                    Heading(label, Modifier.padding(vertical = 8.dp), fontSize = 16.sp)
                }
                Row {
                    children.forEachIndexed { index, component ->
                        component.Render()
                        if (index < children.size - 1) {
                            Text(", ")
                        }
                    }
                }
            }
        } else {
            Column {
                children.forEach { it.Render() }
            }
        }
    }
}