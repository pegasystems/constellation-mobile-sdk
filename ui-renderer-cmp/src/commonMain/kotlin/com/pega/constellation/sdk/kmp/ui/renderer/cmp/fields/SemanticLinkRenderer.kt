package com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.fields.SemanticLinkComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.FieldValue
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithVisibility

class SemanticLinkRenderer : ComponentRenderer<SemanticLinkComponent> {
    @Composable
    override fun SemanticLinkComponent.Render() {
        WithVisibility(visible) {
            FieldValue(label, value)
        }
    }
}