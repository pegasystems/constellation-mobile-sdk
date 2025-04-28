package com.pega.mobile.constellation.sdk.components

import com.pega.mobile.constellation.sdk.components.DisplayMode.DISPLAY_ONLY
import com.pega.mobile.constellation.sdk.components.DisplayMode.EDITABLE
import com.pega.mobile.constellation.sdk.components.DisplayMode.STACKED_LARGE_VAL

enum class DisplayMode {
    EDITABLE, DISPLAY_ONLY, STACKED_LARGE_VAL;
}

fun String.toDisplayMode() =
    when (this) {
        "DISPLAY_ONLY" -> DISPLAY_ONLY
        "STACKED_LARGE_VAL" -> STACKED_LARGE_VAL
        else -> EDITABLE
    }
