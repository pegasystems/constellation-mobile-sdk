package com.pega.mobile.constellation.sdk.components.fields

import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.DateTime
import com.pega.mobile.dxcomponents.compose.controls.form.internal.ClockFormat.Companion.toClockFormat
import org.json.JSONObject
import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter

class DateTimeComponent(context: ComponentContext) : FieldComponent(context) {
    var clockFormat: String by mutableStateOf("")
        private set
    var timeZoneMinutesOffset: Int by mutableStateOf(0)
        private set

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        clockFormat = props.getString("clockFormat")
        // app works with time zone set on server
        // minutes offset between UTC and time zone. For west is minus, for east is plus.
        timeZoneMinutesOffset = getTimeZoneOffset(props.getString("timeZone"))
    }

    private fun getTimeZoneOffset(timeZone: String): Int {
        val zoneId = ZoneId.of(timeZone)
        val instant = Instant.ofEpochMilli(System.currentTimeMillis())
        val offset = zoneId.rules.getOffset(instant)
        return (offset.totalSeconds / 60)
    }
}

class DateTimeRenderer : ComponentRenderer<DateTimeComponent> {
    private val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")

    @Composable
    override fun DateTimeComponent.Render() {
        WithFieldHelpers {
            DateTime(
                value = value.asLocalDateTimeOrNull()?.plusMinutes(timeZoneMinutesOffset.toLong()),
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                placeholder = placeholder,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                clockFormat = clockFormat.toClockFormat(),
                onValueChange = {
                    updateValue(formatter.format(it.minusMinutes(timeZoneMinutesOffset.toLong())))
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