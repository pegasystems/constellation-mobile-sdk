package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Time
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.ClockFormat.Companion.toClockFormat
import kotlinx.datetime.LocalTime
import kotlinx.serialization.json.JsonObject

class TimeComponent(context: ComponentContext) : FieldComponent(context) {
    var clockFormat: String by mutableStateOf("")
        private set

    override fun onUpdate(props: JsonObject) {
        super.onUpdate(props)
        clockFormat = props.getString("clockFormat")
    }
}

class TimeRenderer : ComponentRenderer<TimeComponent> {
    @Composable
    override fun TimeComponent.Render() {
        WithFieldHelpers {
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
                onValueChange = {
//                    updateValue(DateTimeFormatter.ofPattern("HH:mm:ss").format(it))
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
