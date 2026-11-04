package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.junit4.ComposeContentTestRule
import androidx.test.core.app.takeScreenshot
import androidx.test.core.graphics.writeToTestStorage
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

@OptIn(ExperimentalTestApi::class)
fun ComposeTest.runAndroidTest(block: ComposeContentTestRule.() -> Unit) {
    runCatching {
        block(composeRule)
    }.onFailure {
        saveScreenshot(testDescription.methodName)
    }.getOrThrow()
}

@OptIn(ExperimentalTestApi::class)
private fun saveScreenshot(testName: String) = runCatching {
    val ts = SimpleDateFormat("yyyyMMdd_HHmmss_SSS", Locale.US).format(Date())
    val safe = testName.replace(Regex("[^a-zA-Z0-9._-]"), "_")
    val fileName = "${safe}_$ts"

    takeScreenshot().writeToTestStorage(fileName)
    println("Screenshot saved: $fileName")
}.onFailure {
    println("Failed to take screenshot: ${it.message}")
}
