package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.runtime.Composable
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.TextUnit
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes
import com.pega.constellation.sdk.kmp.core.components.containers.DetailsComponent.HighlightedField
import com.pega.constellation.sdk.kmp.core.components.fields.DateTimeComponent.Companion.getTimeZoneOffset
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.FieldValue
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.ClockFormat
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.ClockFormat.Companion.is24Hour
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.getCurrencySymbol
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.parse
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.rememberAnnotated
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.LocalEnv
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.asLocalDateOrNull
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.asLocalDateTimeOrNull
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.asLocalTimeOrNull
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.plusOffset
import kotlinx.datetime.format.FormatStringsInDatetimeFormats
import kotlin.time.ExperimentalTime

@OptIn(FormatStringsInDatetimeFormats::class, ExperimentalTime::class)
@Composable
fun HighlightedFieldValue(
    field: HighlightedField,
    valueFontSize: TextUnit,
    valueFontWeight: FontWeight,
) {
    val config = field.config
    val (label, value) = when (field.type) {
        ComponentTypes.Currency.type -> {
            val rawValue = config["value"] ?: ""
            val isoCode = config["currencyISOCode"] ?: "USD"
            val showIsoCode = config["showISOCode"].toBoolean()
            val prefix = if (showIsoCode) isoCode else getCurrencySymbol(isoCode)
            val value = if (prefix.isNotEmpty()) "$prefix $rawValue" else rawValue
            (config["label"] ?: "") to value
        }
        ComponentTypes.Checkbox.type -> {
            val trueLabel = config["trueLabel"] ?: "True"
            val falseLabel = config["falseLabel"] ?: "False"
            (config["caption"] ?: "") to if (config["value"].toBoolean()) trueLabel else falseLabel
        }
        ComponentTypes.Date.type ->
            (config["label"] ?: "") to (config["value"]?.asLocalDateOrNull()?.toString() ?: "")
        ComponentTypes.DateTime.type -> {
            val timeZoneMinutesOffset = getTimeZoneOffset(LocalEnv.current.timeZone)
            val is24Hour = ClockFormat.FROM_LOCALE.is24Hour()
            (config["label"] ?: "") to (config["value"]?.asLocalDateTimeOrNull()?.plusOffset(timeZoneMinutesOffset)?.parse(is24Hour) ?: "")
        }
        ComponentTypes.Time.type -> {
            val is24Hour = ClockFormat.FROM_LOCALE.is24Hour()
            (config["label"] ?: "") to (config["value"]?.asLocalTimeOrNull()?.parse(is24Hour) ?: "")
        }
        ComponentTypes.RichText.type ->
            (config["label"] ?: "") to rememberAnnotated(config["value"] ?: "")
        else ->
            (config["label"] ?: "") to (config["value"] ?: "")
    }
    when (value) {
        is AnnotatedString -> FieldValue(label, value, valueFontSize, valueFontWeight)
        is String -> FieldValue(label, value, valueFontSize, valueFontWeight)
    }
}
