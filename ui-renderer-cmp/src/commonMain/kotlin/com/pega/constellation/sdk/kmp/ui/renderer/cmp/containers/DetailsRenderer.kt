package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.core.components.containers.DetailsComponent
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render

class DetailsRenderer : ComponentRenderer<DetailsComponent> {
    @Composable
    override fun DetailsComponent.Render() {
        Column(modifier = Modifier.fillMaxWidth()) {
            if (showHighlightedFields) {
                highlightedFields.forEach { field ->
                    Column(modifier = Modifier.padding(bottom = 8.dp)) {
                        HighlightedFieldValue(
                            field = field,
                            valueFontSize = 20.sp,
                            valueFontWeight = FontWeight.Bold
                        )
                    }
                }
            }
            children.forEach { it.Render() }
        }
    }
}
