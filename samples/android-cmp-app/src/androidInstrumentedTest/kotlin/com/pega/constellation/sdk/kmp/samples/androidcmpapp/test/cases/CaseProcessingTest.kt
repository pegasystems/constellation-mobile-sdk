package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.assertTextContains
import androidx.compose.ui.test.onFirst
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.onSiblings
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.compose.ui.test.performTextReplacement
import androidx.compose.ui.test.requestFocus
import androidx.compose.ui.test.runComposeUiTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class CaseProcessingTest : ComposeTest(PegaVersion.v24_1_0) {
    @Test
    fun test_case_processing_sdk_testing() = runComposeUiTest {
        setupApp(caseClassName = "DIXL-MediaCo-Work-SDKTesting")

        onNodeWithText("New Service").performClick()
        waitForNode("Create (S-", substring = true)

        waitForNode("Name")
        onNodeWithText("Name", substring = true).performTextInput("Jan")
        onNodeWithText("Surname").performTextInput("Kowalski")
        onNodeWithText("Url").performTextInput("https://pega.com")
        onNodeWithText("Next").performClick()

        waitForNode("Name")
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
        waitForNode("Customer (N-", substring = true)

        waitForNode("First Name")
        onNodeWithText("First Name").performTextInput("Jan")
        onNodeWithText("Last Name").performTextInput("Kowalski")
        onNodeWithText("Custom Email").performTextInput("invalid email")

        onNodeWithText("Service date").requestFocus()
        onNodeWithText("Today, ", substring = true).performClick()
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
