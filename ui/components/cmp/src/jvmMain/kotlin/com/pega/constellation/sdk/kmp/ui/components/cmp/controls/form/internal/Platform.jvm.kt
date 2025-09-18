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

actual class DecimalFormat actual constructor(format: String) {
    private val formatter = DecimalFormat(format)
    actual fun format(number: Double): String = formatter.format(number)
}
