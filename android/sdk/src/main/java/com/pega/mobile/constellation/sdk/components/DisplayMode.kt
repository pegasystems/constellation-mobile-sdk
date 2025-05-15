package com.pega.mobile.constellation.sdk.components

import android.util.Log

enum class DisplayMode {
    EDITABLE, DISPLAY_ONLY, STACKED_LARGE_VAL;

    companion object {
        private const val TAG = "DisplayMode"

        fun String.toDisplayMode() =
            when (this) {
                "DISPLAY_ONLY" -> DISPLAY_ONLY
                "STACKED_LARGE_VAL" -> STACKED_LARGE_VAL
                "EDITABLE", "" -> EDITABLE
                else -> {
                    Log.w(TAG, "Unknown display mode: $this, fallback to 'EDITABLE'")
                    EDITABLE
                }
            }
    }
}
