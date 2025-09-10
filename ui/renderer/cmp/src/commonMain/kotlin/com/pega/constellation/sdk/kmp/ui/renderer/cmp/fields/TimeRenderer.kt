package com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.components.fields.TimeComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Time
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.ClockFormat.Companion.toClockFormat
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithFieldHelpers
import kotlinx.datetime.LocalTime

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
