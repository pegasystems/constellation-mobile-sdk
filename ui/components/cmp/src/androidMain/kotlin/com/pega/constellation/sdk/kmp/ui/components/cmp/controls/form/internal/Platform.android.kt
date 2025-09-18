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

actual class DecimalFormat actual constructor(format: String) {
    private val formatter = DecimalFormat(format)
    actual fun format(number: Double): String = formatter.format(number)
}