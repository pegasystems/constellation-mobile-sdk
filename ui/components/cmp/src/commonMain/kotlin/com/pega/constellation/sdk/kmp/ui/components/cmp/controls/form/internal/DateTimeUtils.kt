package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal

import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.LocalTime

fun LocalDateTime.parse(is24Hour: Boolean) = "$date ${formatTime(is24Hour, hour, minute)}"

fun LocalTime.parse(is24Hour: Boolean): String = formatTime(is24Hour, hour, minute)

private fun formatTime(is24Hour: Boolean, hour: Int, minute: Int) =
    if (is24Hour) {
        "${pad(hour)}:${pad(minute)}"
    } else {
        val hour12 = if (hour % 12 == 0) 12 else hour % 12
        val amPm = if (hour < 12) "AM" else "PM"
        "${pad(hour12)}:${pad(minute)} $amPm"
    }

private fun pad(num: Int): String = num.toString().padStart(2, '0')
