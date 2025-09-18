package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.datetime.Clock
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.offsetAt
import kotlinx.datetime.toInstant
import kotlinx.datetime.toLocalDateTime
import kotlinx.serialization.json.JsonObject
import kotlin.time.DurationUnit
import kotlin.time.toDuration

class DateTimeComponent(context: ComponentContext) : FieldComponent(context) {
    var clockFormat: String by mutableStateOf("")
        private set
    var timeZoneMinutesOffset: Int by mutableStateOf(0)
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        clockFormat = props.getString("clockFormat")
        // app works with time zone set on server
        // minutes offset between UTC and time zone. For west is minus, for east is plus.
        timeZoneMinutesOffset = getTimeZoneOffset(props.getString("timeZone"))
    }

    private fun getTimeZoneOffset(timeZone: String): Int {
        if (timeZone.isEmpty()) {
            Log.w(TAG, "Time zone is empty, defaulting to UTC")
            return 0
        }
        val zone = TimeZone.of(timeZone)
        val now = Clock.System.now()
        val offset = zone.offsetAt(now)
        return (offset.totalSeconds / 60)
    }

    fun LocalDateTime.minusOffset() = toInstant(TimeZone.UTC)
        .minus(timeZoneMinutesOffset.toDuration(DurationUnit.MINUTES))
        .toLocalDateTime(TimeZone.UTC)

    fun LocalDateTime.plusOffset() = toInstant(TimeZone.UTC)
        .plus(timeZoneMinutesOffset.toDuration(DurationUnit.MINUTES))
        .toLocalDateTime(TimeZone.UTC)


    companion object {
        private const val TAG = "DateTimeComponent"
    }
}
