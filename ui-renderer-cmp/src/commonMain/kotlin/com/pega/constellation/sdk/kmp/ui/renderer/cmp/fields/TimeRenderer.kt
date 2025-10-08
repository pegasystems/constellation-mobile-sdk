package com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.components.fields.TimeComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Time
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.ClockFormat
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithFieldHelpers
import kotlinx.datetime.LocalTime
import kotlinx.datetime.format
import kotlinx.datetime.format.FormatStringsInDatetimeFormats
import kotlinx.datetime.format.byUnicodePattern

@OptIn(FormatStringsInDatetimeFormats::class)
class TimeRenderer : ComponentRenderer<TimeComponent> {
    private val formatter = LocalTime.Format { byUnicodePattern("HH:mm:ss") }

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
                clockFormat = ClockFormat.from(clockFormat),
                onValueChange = { updateValue(it.format(formatter)) },
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
