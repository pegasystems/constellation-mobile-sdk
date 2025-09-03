package com.pega.mobile.constellation.sdk.components.helpers

import android.util.Log
import androidx.compose.runtime.Composable
import com.pega.mobile.constellation.sdk.components.DisplayMode
import com.pega.mobile.dxcomponents.compose.controls.form.FieldValue

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