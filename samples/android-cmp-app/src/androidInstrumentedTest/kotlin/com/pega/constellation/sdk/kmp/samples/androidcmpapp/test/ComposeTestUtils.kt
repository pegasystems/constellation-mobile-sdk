package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test

import androidx.compose.ui.test.ComposeUiTest
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.assertCountEquals
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.isRoot
import androidx.compose.ui.test.printToLog
import androidx.compose.ui.test.waitUntilExactlyOneExists
import androidx.compose.ui.test.waitUntilNodeCount

private const val DEFAULT_TIMEOUT = 5000L

@OptIn(ExperimentalTestApi::class)
fun ComposeUiTest.waitForNode(text: String, substring: Boolean = false) {
    runCatching {
        waitUntilExactlyOneExists(hasText(text, substring), timeoutMillis = DEFAULT_TIMEOUT)
    }.onFailure {
        // additional assertion to provide better error message as waitUntil's exception is not very descriptive
        onNode(hasText(text, substring)).assertExists("Cannot find node with text '$text'")
    }
}

@OptIn(ExperimentalTestApi::class)
fun ComposeUiTest.waitForNodes(text: String, count: Int, substring: Boolean = false) {
    runCatching {
        waitUntilNodeCount(hasText(text, substring), count, timeoutMillis = DEFAULT_TIMEOUT)
    }.onFailure {
        // additional assertion to provide better error message as waitUntil's exception is not very descriptive
        onAllNodes(hasText(text, substring)).assertCountEquals(count)
    }
}

@OptIn(ExperimentalTestApi::class)
fun ComposeUiTest.printAllFormNodes() = onAllNodes(isRoot())[1].printToLog("FORM NODES")