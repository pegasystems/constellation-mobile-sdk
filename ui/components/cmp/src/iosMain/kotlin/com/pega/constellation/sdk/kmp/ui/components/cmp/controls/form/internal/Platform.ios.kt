package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal

import platform.Foundation.NSDateFormatter
import platform.Foundation.NSNumber
import platform.Foundation.NSNumberFormatter
import platform.Foundation.NSNumberFormatterDecimalStyle
import platform.Foundation.currentLocale

actual object AppContext

actual fun is24HourLocale(): Boolean {
    val formatter = NSDateFormatter()
    formatter.setLocalizedDateFormatFromTemplate("j") // 'j' is locale-aware hour format
    return !formatter.dateFormat.contains("a") // If it contains 'a', it's 12-hour (AM/PM
}

actual fun getCurrencySymbol(isoCode: String): String {
    val locale = platform.Foundation.NSLocale.currentLocale
    val symbol = locale.displayNameForKey(platform.Foundation.NSLocaleCurrencySymbol, isoCode)
    return symbol ?: isoCode
}

actual class DecimalFormat actual constructor(
    private val decimalPrecision: Int,
    private val showGroupSeparators: Boolean
) {
    actual fun format(number: Double): String {
        val formatter = NSNumberFormatter()
        formatter.usesGroupingSeparator = showGroupSeparators
        formatter.numberStyle = NSNumberFormatterDecimalStyle
        formatter.minimumFractionDigits = decimalPrecision.toULong()
        formatter.maximumFractionDigits = decimalPrecision.toULong()
        return formatter.stringFromNumber(NSNumber(number)) ?: number.toString()
    }
}