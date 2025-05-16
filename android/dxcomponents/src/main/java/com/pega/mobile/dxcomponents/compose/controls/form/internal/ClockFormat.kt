package com.pega.mobile.dxcomponents.compose.controls.form.internal

import android.content.Context
import android.text.format.DateFormat
import android.util.Log

enum class ClockFormat {
    H_12, H_24, FROM_LOCALE;

    companion object {
        private const val TAG = "ClockFormat"
        fun String.toClockFormat() =
            when (this) {
                "" -> FROM_LOCALE
                "12" -> H_12
                "24" -> H_24
                else -> {
                    Log.w(TAG, "Unrecognized clock format: $this, fallback to 'FROM_LOCALE'")
                    FROM_LOCALE
                }
            }

        fun ClockFormat.is24Hour(context: Context) =
            this == H_24 || (this == FROM_LOCALE && DateFormat.is24HourFormat(context))
    }
}