package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.core.components.containers.DetailsComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.common.Heading
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render

class DetailsRenderer : ComponentRenderer<DetailsComponent> {
    @Composable
    override fun DetailsComponent.Render() {
        if (showLabel && label.isNotEmpty()) {
            Heading(label, Modifier.padding(vertical = 8.dp))
        }
        if (showHighlightedFields) {
            Column(
                modifier = Modifier.padding(bottom = 8.dp).testTag("details_highlightedFields")
            ) {
                highlightedFields.forEach { field ->
                    HighlightedFieldValue(
                        field = field,
                        valueFontSize = 20.sp,
                        valueFontWeight = FontWeight.Bold
                    )
                }
            }
        }
        Column(modifier = Modifier.fillMaxWidth().testTag("details_children")) {
            children.forEach { it.Render() }
        }
    }
}
