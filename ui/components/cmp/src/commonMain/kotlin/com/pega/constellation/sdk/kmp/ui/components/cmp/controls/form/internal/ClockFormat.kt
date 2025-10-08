package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal

enum class ClockFormat {
    H_12, H_24, FROM_LOCALE;

    companion object {
        fun from(value: String) =
            when (value) {
                "" -> FROM_LOCALE
                "12" -> H_12
                "24" -> H_24
                else -> {
                    println("Unrecognized clock format: $value, fallback to 'FROM_LOCALE'")
                    FROM_LOCALE
                }
            }

        fun ClockFormat.is24Hour() = this == H_24 || (this == FROM_LOCALE && is24HourLocale())
    }
}
