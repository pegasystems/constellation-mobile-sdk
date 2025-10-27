package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.assertTextContains
import androidx.compose.ui.test.isRoot
import androidx.compose.ui.test.onFirst
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.onSiblings
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.compose.ui.test.performTextReplacement
import androidx.compose.ui.test.printToString
import androidx.compose.ui.test.runComposeUiTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class CaseProcessingTest : ComposeTest() {
    @Test
    fun test_case_processing_sdk_testing() = runComposeUiTest {
        setupApp(caseClassName = "DIXL-MediaCo-Work-SDKTesting")

        onNodeWithText("New Service").performClick()
        waitForNode("Create")

        onNodeWithText("Name", substring = true).performTextInput("Jan")
        onNodeWithText("Surname").performTextInput("Kowalski")
        onNodeWithText("Url").performTextInput("https://pega.com")
        onNodeWithText("Next").performClick()

        waitForNode("Submit")
        onNodeWithText("Name").assertTextContains("Jan")
        onNodeWithText("Surname").assertTextContains("Kowalski")
        onNodeWithText("Url").assertTextContains("https://pega.com")

        onNodeWithText("Cancel").performClick()
        waitForNode("New Service")
    }

    @Test
    fun test_case_processing_service() = runComposeUiTest {
        setupApp(caseClassName = "DIXL-MediaCo-Work-NewService")

        onNodeWithText("New Service").performClick()
        waitForNode("Customer")

        onNodeWithText("First Name").performTextInput("Jan")
        onNodeWithText("Last Name").performTextInput("Kowalski")
        onNodeWithText("Custom Email").performTextInput("invalid email")

        onNodeWithText("Service date").performClick()
        // DatePicker holds nodes with text formatted as: '[Today, Friday, October 24, 2025]'
        runCatching {
            waitForNode("Today123")
            onNodeWithText("Today123, ", substring = true).performClick()
        }.onFailure {
            val tree1 = runCatching { onAllNodes(isRoot()).get(0).printToString() }.getOrDefault("no tree1")
            val tree2 = runCatching { onAllNodes(isRoot()).get(1).printToString() }.getOrDefault("no tree2")
            val tree3 = runCatching { onAllNodes(isRoot()).get(2).printToString() }.getOrDefault("no tree3")
            val tree4 = runCatching { onAllNodes(isRoot()).get(3).printToString() }.getOrDefault("no tree4")
            error(
                """
                Failed to find today's date. Printing UI trees for debugging:
                
                tree1: $tree1
                
                tree2: $tree2
                
                tree3: $tree3
                
                tree4: $tree4
                
                """.trimIndent()
            )
        }
        onNodeWithText("OK").performClick()
        onNodeWithText("Submit").performClick()

        waitForNode("Email: Enter a valid email address")
        onNodeWithText("Custom Email").performTextReplacement("jan.kowalski@pega.com")
        onNodeWithText("Submit").performClick()

        waitForNode("Street")
        onNodeWithText("Street").performTextInput("ul. Krakowska 1")
        onNodeWithText("City").performTextInput("Kraków")
        onNodeWithText("Postal code").performTextInput("31-066")
        onNodeWithText("Submit").performClick()

        waitForNode("TV Package")
        onNodeWithText("TV Package").onSiblings().onFirst().performClick()
        onNodeWithText("Submit").performClick()

        waitForNode("Other notes")
        onNodeWithText("Other notes").performTextInput("Lorem ipsum")
        onNodeWithText("Submit").performClick()

        waitForNode("New Service")
    }
}
