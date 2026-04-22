package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test

import androidx.compose.ui.test.ComposeUiTest
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.SemanticsMatcher
import androidx.compose.ui.test.SemanticsNodeInteractionCollection
import androidx.compose.ui.test.SemanticsNodeInteractionsProvider
import androidx.compose.ui.test.assertCountEquals
import androidx.compose.ui.test.filter
import androidx.compose.ui.test.hasAnyAncestor
import androidx.compose.ui.test.hasTestTag
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.isRoot
import androidx.compose.ui.test.onFirst
import androidx.compose.ui.test.printToLog
import androidx.compose.ui.test.waitUntilExactlyOneExists
import androidx.compose.ui.test.waitUntilNodeCount

private const val DEFAULT_TIMEOUT = 5000L

@OptIn(ExperimentalTestApi::class)
private fun ComposeUiTest.waitForMatcher(matcher: SemanticsMatcher, errorMessage: String) {
    runCatching {
        waitUntilExactlyOneExists(matcher, timeoutMillis = DEFAULT_TIMEOUT)
    }.onFailure {
        onNode(matcher).assertExists(errorMessage)
    }
}

@OptIn(ExperimentalTestApi::class)
fun ComposeUiTest.waitForNode(text: String, substring: Boolean = false) {
    waitForMatcher(hasText(text, substring), "Cannot find node with text '$text'")
}

@OptIn(ExperimentalTestApi::class)
fun ComposeUiTest.waitForDescendantNode(testTag: String, text: String, substring: Boolean = false) {
    waitForMatcher(
        hasAnyAncestor(hasTestTag(testTag)) and hasText(text, substring),
        "Cannot find node with text '$text' inside '$testTag'"
    )
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


fun SemanticsNodeInteractionCollection.find(text: String) =
    this.filter(hasText(text)).onFirst()

fun SemanticsNodeInteractionsProvider.onAllDescendantsOf(testTag: String) =
    onAllNodes(hasAnyAncestor(hasTestTag(testTag)))