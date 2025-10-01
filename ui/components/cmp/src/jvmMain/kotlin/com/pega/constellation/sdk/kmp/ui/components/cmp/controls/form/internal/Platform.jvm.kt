package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal

import java.text.DecimalFormat
import java.text.SimpleDateFormat
import java.util.Currency
import java.util.Locale

actual object AppContext

actual fun is24HourLocale(): Boolean {
    val formatter = SimpleDateFormat.getTimeInstance(SimpleDateFormat.SHORT, Locale.getDefault())
    val pattern = (formatter as SimpleDateFormat).toPattern()
    return !pattern.contains("a") // 'a' stands for AM/PM marker
}

actual fun getCurrencySymbol(isoCode: String) =
    runCatching { Currency.getInstance(isoCode).symbol }.getOrNull() ?: isoCode

actual class DecimalFormat actual constructor(decimalPrecision: Int, showGroupSeparators: Boolean) {
    private val formatter = DecimalFormat(formatString(decimalPrecision, showGroupSeparators))
    actual fun format(number: Double): String = formatter.format(number)

    private fun formatString(decimalPrecision: Int, showGroupSeparators: Boolean) = buildString {
        append(if (showGroupSeparators) "#,##0" else "0")
        if (decimalPrecision > 0)
            append(".").append("0".repeat(decimalPrecision))
    }
}
