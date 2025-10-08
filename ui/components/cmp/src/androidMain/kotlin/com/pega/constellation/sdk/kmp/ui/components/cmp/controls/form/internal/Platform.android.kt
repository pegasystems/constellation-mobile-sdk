@file:Suppress("EXPECT_ACTUAL_CLASSIFIERS_ARE_IN_BETA_WARNING")

package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal

import android.app.Application
import android.content.Context
import android.text.format.DateFormat
import java.text.DecimalFormat
import java.util.Currency

actual object AppContext {
    private lateinit var application: Application

    fun init(context: Context) {
        application = context.applicationContext as Application
    }

    fun get(): Context = application
}

actual fun is24HourLocale() = DateFormat.is24HourFormat(AppContext.get())

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