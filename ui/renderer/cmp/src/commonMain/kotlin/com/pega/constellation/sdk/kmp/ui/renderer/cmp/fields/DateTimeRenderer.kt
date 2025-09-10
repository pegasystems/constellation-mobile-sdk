package com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.DateTime
import com.pega.constellation.sdk.kmp.core.components.fields.DateTimeComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.DateTime
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.ClockFormat.Companion.toClockFormat
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithFieldHelpers
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import kotlinx.datetime.LocalDateTime

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
