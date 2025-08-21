package com.pega.mobile.constellation.sample

import androidx.compose.ui.test.ComposeUiTest
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.waitUntilExactlyOneExists
import androidx.compose.ui.test.waitUntilNodeCount

private const val DEFAULT_TIMEOUT = 5000L

@OptIn(ExperimentalTestApi::class)
fun ComposeUiTest.waitForNode(text: String) = try {
    waitUntilExactlyOneExists(hasText(text, substring = true), timeoutMillis = DEFAULT_TIMEOUT)
} catch (e: Throwable) {
    throw ComposeTestException("Cannot find node with text '$text'", e)
}

@OptIn(ExperimentalTestApi::class)
fun ComposeUiTest.waitForNodes(text: String, count: Int) = try {
    waitUntilNodeCount(hasText(text, substring = true), count, timeoutMillis = DEFAULT_TIMEOUT)
} catch (e: Throwable) {
    throw ComposeTestException("Cannot find $count nodes with text '$text'", e)
}

class ComposeTestException(message: String, cause: Throwable) : Exception(message, cause)