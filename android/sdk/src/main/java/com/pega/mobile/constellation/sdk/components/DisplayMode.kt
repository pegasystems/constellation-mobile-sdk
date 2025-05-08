package com.pega.mobile.constellation.sdk.components

enum class DisplayMode {
    EDITABLE, DISPLAY_ONLY, STACKED_LARGE_VAL;

    companion object {
        fun String.toDisplayMode() =
            when (this) {
                "DISPLAY_ONLY" -> DISPLAY_ONLY
                "STACKED_LARGE_VAL" -> STACKED_LARGE_VAL
                else -> EDITABLE
            }
    }
}


