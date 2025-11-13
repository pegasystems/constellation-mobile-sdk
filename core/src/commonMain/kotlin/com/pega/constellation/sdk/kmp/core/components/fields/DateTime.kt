package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.datetime.Clock
import kotlinx.datetime.TimeZone
import kotlinx.datetime.offsetAt
import kotlinx.serialization.json.JsonObject

class DateTimeComponent(context: ComponentContext) : FieldComponent(context) {
    var clockFormat: String by mutableStateOf("")
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        clockFormat = props.getString("clockFormat")
    }

    companion object {
        private const val TAG = "DateTimeComponent"

        fun getTimeZoneOffset(timeZone: String): Int {
            if (timeZone.isEmpty()) {
                Log.w(TAG, "Time zone is empty, defaulting to UTC")
                return 0
            }
            val zone = TimeZone.of(timeZone)
            val now = Clock.System.now()
            val offset = zone.offsetAt(now)
            return (offset.totalSeconds / 60)
        }
    }
}
