package com.pega.mobile.constellation.sdk.components

import android.util.Log
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.sp

@Composable
fun WithDisplayMode(
    displayMode: DisplayMode,
    label: String,
    value: String,
    editable: @Composable () -> Unit,
    displayOnly: @Composable () -> Unit = { RenderDisplayOnly(label, value) }
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


@Composable
fun RenderDisplayOnly(label: String, value: String) {
    Column(modifier = Modifier.fillMaxWidth()) {
        if (label.trim().isNotEmpty()) {
            Text(label, fontSize = 14.sp, color = Color.Gray)
        }
        Text(value.ifEmpty { "---" }, fontSize = 14.sp)
    }
}