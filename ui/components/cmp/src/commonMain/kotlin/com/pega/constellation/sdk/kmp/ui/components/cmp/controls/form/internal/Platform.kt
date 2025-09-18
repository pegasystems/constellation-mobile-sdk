@file:Suppress("EXPECT_ACTUAL_CLASSIFIERS_ARE_IN_BETA_WARNING")

package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal

expect object AppContext

expect fun is24HourLocale(): Boolean

expect fun getCurrencySymbol(isoCode: String): String

expect class DecimalFormat(format: String) {
    fun format(number: Double): String
}
