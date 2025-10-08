package com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.components.fields.DateTimeComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.DateTime
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.ClockFormat
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithFieldHelpers
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.format.FormatStringsInDatetimeFormats
import kotlinx.datetime.format.byUnicodePattern
import kotlin.time.ExperimentalTime

@OptIn(FormatStringsInDatetimeFormats::class, ExperimentalTime::class)
class DateTimeRenderer : ComponentRenderer<DateTimeComponent> {
    private val formatter = LocalDateTime.Format {
        byUnicodePattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    }

    @Composable
    override fun DateTimeComponent.Render() {
        WithFieldHelpers {
            DateTime(
                value = value.asLocalDateTimeOrNull()?.plusOffset(),
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                placeholder = placeholder,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                clockFormat = ClockFormat.from(clockFormat),
                onValueChange = {
                    updateValue(it?.let { formatter.format(it.minusOffset()) }.orEmpty())
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
