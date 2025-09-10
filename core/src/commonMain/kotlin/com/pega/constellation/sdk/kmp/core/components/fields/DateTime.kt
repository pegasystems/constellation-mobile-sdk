package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonObject

class DateTimeComponent(context: ComponentContext) : FieldComponent(context) {
    var clockFormat: String by mutableStateOf("")
        private set
    var timeZoneMinutesOffset: Int by mutableStateOf(0)
        private set

    override fun onUpdate(props: JsonObject) {
        super.onUpdate(props)
        clockFormat = props.getString("clockFormat")
        // app works with time zone set on server
        // minutes offset between UTC and time zone. For west is minus, for east is plus.
        timeZoneMinutesOffset = 123
    }

    private fun getTimeZoneOffset(timeZone: String): Int {
        if (timeZone.isEmpty()) {
            Log.w(TAG, "Time zone is empty, defaulting to UTC")
            return 0
        }
        return 123
//        val zoneId = ZoneId.of(timeZone)
//        val instant = Instant.ofEpochMilli(System.currentTimeMillis())
//        val offset = zoneId.rules.getOffset(instant)
//        return (offset.totalSeconds / 60)
    }

    companion object {
        private const val TAG = "DateTimeComponent"
    }
}
