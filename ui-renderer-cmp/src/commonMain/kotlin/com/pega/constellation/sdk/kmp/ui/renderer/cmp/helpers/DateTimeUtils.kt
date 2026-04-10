package com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers

import com.pega.constellation.sdk.kmp.core.Log
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.LocalTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toInstant
import kotlinx.datetime.toLocalDateTime
import kotlin.time.DurationUnit
import kotlin.time.ExperimentalTime
import kotlin.time.toDuration

private const val TAG = "DateTimeUtils"

fun String.asLocalDateOrNull() = takeIf { isNotEmpty() }
    ?.runCatching { LocalDate.parse(this) }
    ?.onFailure { Log.e(TAG, "Unable to parse value as date", it) }
    ?.getOrNull()

fun String.asLocalDateTimeOrNull() = takeIf { isNotEmpty() }
    ?.runCatching { LocalDateTime.parse(this.removeSuffix("Z")) }
    ?.onFailure { Log.e(TAG, "Unable to parse value as DateTime", it) }
    ?.getOrNull()

fun String.asLocalTimeOrNull() = takeIf { isNotEmpty() }
    ?.runCatching { LocalTime.parse(this) }
    ?.onFailure { Log.e(TAG, "Unable to parse value as time", it) }
    ?.getOrNull()

@ExperimentalTime
fun LocalDateTime.plusOffset(offset: Int) = toInstant(TimeZone.UTC)
    .plus(offset.toDuration(DurationUnit.MINUTES))
    .toLocalDateTime(TimeZone.UTC)

@ExperimentalTime
fun LocalDateTime.minusOffset(offset: Int) = toInstant(TimeZone.UTC)
    .minus(offset.toDuration(DurationUnit.MINUTES))
    .toLocalDateTime(TimeZone.UTC)
