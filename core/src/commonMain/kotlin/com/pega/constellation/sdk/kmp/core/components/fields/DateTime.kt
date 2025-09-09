package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import kotlinx.serialization.json.JsonObject
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.DateTime
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.ClockFormat.Companion.toClockFormat
import com.pega.constellation.sdk.kmp.ui.components.cmp.stub.Log
import kotlinx.datetime.LocalDateTime

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

class DateTimeRenderer : ComponentRenderer<DateTimeComponent> {
//    private val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")

    @Composable
    override fun DateTimeComponent.Render() {
        WithFieldHelpers {
            DateTime(
                value = value.asLocalDateTimeOrNull(),
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                placeholder = placeholder,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                clockFormat = clockFormat.toClockFormat(),
                onValueChange = {
//                    updateValue(formatter.format(it.minusMinutes(timeZoneMinutesOffset.toLong())))
                },
                onFocusChange = { updateFocus(it) }
            )
        }

    }

    private fun String.asLocalDateTimeOrNull() = takeIf { isNotEmpty() }
        ?.runCatching { LocalDateTime.parse(this.removeSuffix("Z")) }
        ?.onFailure { Log.e(TAG, "Unable to parse value as DateTime", it) }
        ?.getOrNull()

    companion object {
        private const val TAG = "DateTimeRenderer"
    }
}
