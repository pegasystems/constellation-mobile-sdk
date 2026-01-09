package com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.components.fields.DateTimeComponent
import com.pega.constellation.sdk.kmp.core.components.fields.DateTimeComponent.Companion.getTimeZoneOffset
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.DateTime
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.FieldValue
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.ClockFormat
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.ClockFormat.Companion.is24Hour
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.parse
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.LocalEnv
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithFieldHelpers
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.TimeZone
import kotlinx.datetime.format.FormatStringsInDatetimeFormats
import kotlinx.datetime.format.byUnicodePattern
import kotlinx.datetime.toInstant
import kotlinx.datetime.toLocalDateTime
import kotlin.time.DurationUnit
import kotlin.time.ExperimentalTime
import kotlin.time.toDuration

@OptIn(FormatStringsInDatetimeFormats::class, ExperimentalTime::class)
class DateTimeRenderer : ComponentRenderer<DateTimeComponent> {
    private val formatter = LocalDateTime.Format {
        byUnicodePattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    }

    @Composable
    override fun DateTimeComponent.Render() {
        // app works with time zone set on server
        // minutes offset between UTC and time zone. For west is minus, for east is plus.
        val timeZoneMinutesOffset = getTimeZoneOffset(LocalEnv.current.timeZone)
        WithFieldHelpers(
            displayOnly = {
                val value = value.asLocalDateTimeOrNull()?.plusOffset(timeZoneMinutesOffset)
                val is24Hour = ClockFormat.from(clockFormat).is24Hour()
                FieldValue(label, value?.parse(is24Hour) ?: "")
            },
            editable = {
                DateTime(
                    value = value.asLocalDateTimeOrNull()?.plusOffset(timeZoneMinutesOffset),
                    label = label,
                    helperText = helperText,
                    validateMessage = validateMessage,
                    placeholder = placeholder,
                    required = required,
                    disabled = disabled,
                    readOnly = readOnly,
                    clockFormat = ClockFormat.from(clockFormat),
                    onValueChange = {
                        updateValue(it?.let {
                            formatter.format(it.minusOffset(timeZoneMinutesOffset))
                        }.orEmpty())
                    },
                    onFocusChange = { updateFocus(it) }
                )
            })

    }

    private fun String.asLocalDateTimeOrNull() = takeIf { isNotEmpty() }
        ?.runCatching { LocalDateTime.parse(this.removeSuffix("Z")) }
        ?.onFailure { Log.e(TAG, "Unable to parse value as DateTime", it) }
        ?.getOrNull()

    private fun LocalDateTime.minusOffset(offset: Int) = toInstant(TimeZone.UTC)
        .minus(offset.toDuration(DurationUnit.MINUTES))
        .toLocalDateTime(TimeZone.UTC)

    private fun LocalDateTime.plusOffset(offset: Int) = toInstant(TimeZone.UTC)
        .plus(offset.toDuration(DurationUnit.MINUTES))
        .toLocalDateTime(TimeZone.UTC)

    companion object {
        private const val TAG = "DateTimeRenderer"
    }
}
