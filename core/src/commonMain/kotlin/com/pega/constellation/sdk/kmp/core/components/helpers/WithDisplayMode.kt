package com.pega.constellation.sdk.kmp.core.components.helpers

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.DisplayMode
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.FieldValue
import com.pega.constellation.sdk.kmp.ui.components.cmp.stub.Log

@Composable
fun WithDisplayMode(
    displayMode: DisplayMode,
    label: String,
    value: String,
    editable: @Composable () -> Unit,
    displayOnly: @Composable () -> Unit = { FieldValue(label, value) }
) {
    when (displayMode) {
        DisplayMode.EDITABLE -> editable.invoke()
        DisplayMode.DISPLAY_ONLY -> displayOnly.invoke()
        DisplayMode.STACKED_LARGE_VAL -> {
            Log.i(
                "WithDisplayMode",
                "DisplayMode STACKED_LARGE_VAL not supported, fallback to DISPLAY_ONLY"
            )
            displayOnly.invoke()
        }
    }
}
