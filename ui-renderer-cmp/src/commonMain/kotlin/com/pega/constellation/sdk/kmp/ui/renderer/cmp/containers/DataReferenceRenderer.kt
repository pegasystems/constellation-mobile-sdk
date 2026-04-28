package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.containers.DataReferenceComponent
import com.pega.constellation.sdk.kmp.core.components.fields.SemanticLinkComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.FieldValue
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render

class DataReferenceRenderer : ComponentRenderer<DataReferenceComponent> {
    @Composable
    override fun DataReferenceComponent.Render() {
        if (isDisplayOnlyMulti) {
            val displayText = children
                .filterIsInstance<SemanticLinkComponent>()
                .joinToString(", ") { it.value }
            FieldValue(label, displayText)
        } else {
            Column {
                children.forEach { it.Render() }
            }
        }
    }
}