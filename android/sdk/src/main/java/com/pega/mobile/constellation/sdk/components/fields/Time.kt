package com.pega.mobile.constellation.sdk.components.fields

import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.ClockFormat.Companion.toClockFormat
import com.pega.mobile.dxcomponents.compose.controls.form.Time
import org.json.JSONObject
import java.time.LocalTime
import java.time.format.DateTimeFormatter

class TimeComponent(context: ComponentContext) : FieldComponent(context) {
    var clockFormat: String by mutableStateOf("")
        private set

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        clockFormat = props.getString("clockFormat")
    }
}

class TimeRenderer : ComponentRenderer<TimeComponent> {
    @Composable
    override fun TimeComponent.Render() {
        WithVisibility {
            Time(
                value = value.asLocalTimeOrNull(),
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                placeholder = placeholder,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                clockFormat = clockFormat.toClockFormat(),
                onValueChange = { localTime ->
                    val newValue = localTime?.let {
                        DateTimeFormatter.ofPattern("HH:mm:ss")
                            .format(LocalTime.of(it.hour, it.minute, it.second))
                    } ?: ""
                    updateValue(newValue)
                },
                onFocusChange = { updateFocus(it) }
            )
        }
    }

    private fun String.asLocalTimeOrNull() = takeIf { isNotEmpty() }
        ?.runCatching { LocalTime.parse(this) }
        ?.onFailure { Log.e(TAG, "Unable to parse value as time", it) }
        ?.getOrNull()

    companion object {
        private const val TAG = "TimeRenderer"
    }
}