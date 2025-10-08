package com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.fields.FieldComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.FieldValue

@Composable
fun <T : FieldComponent> T.WithFieldHelpers(
    displayOnly: @Composable T.() -> Unit = { FieldValue(label, value) },
    editable: @Composable T.() -> Unit,
) {
    WithVisibility(visible) {
        WithDisplayMode(
            displayMode = displayMode,
            label = label,
            value = value,
            editable = { editable.invoke(this) },
            displayOnly = { displayOnly.invoke(this) }
        )
    }
}