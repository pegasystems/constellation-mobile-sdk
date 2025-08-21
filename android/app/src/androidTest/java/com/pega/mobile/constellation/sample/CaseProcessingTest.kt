package com.pega.mobile.constellation.sample

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.assertTextContains
import androidx.compose.ui.test.hasSetTextAction
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.onFirst
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.onSiblings
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.compose.ui.test.performTextReplacement
import androidx.compose.ui.test.runComposeUiTest
import org.junit.Test

@OptIn(ExperimentalTestApi::class)
class CaseProcessingTest : ComposeTest() {
    @Test
    fun test_case_processing_sdk_testing() = runComposeUiTest {
        setupApp(caseClassName = "DIXL-MediaCo-Work-SDKTesting")

        onNodeWithText(CREATE_CASE_TEXT).performClick()
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
        waitForNode(CREATE_CASE_TEXT)
    }

    @Test
    fun test_case_processing_service() = runComposeUiTest {
        setupApp(caseClassName = "DIXL-MediaCo-Work-NewService")

        onNodeWithText(CREATE_CASE_TEXT).performClick()
        waitForNode("Customer")

        onNodeWithText("First Name").performTextInput("Jan")
        onNodeWithText("Last Name").performTextInput("Kowalski")
        onNodeWithText("Custom Email").performTextInput("invalid email")

        onNodeWithText("Service date").performClick()
        onNodeWithText("10", substring = true).performClick()
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

        waitForNode(CREATE_CASE_TEXT)
    }

    @Test
    fun test_case_processing_embedded_data() = runComposeUiTest {
        setupApp("DIXL-MediaCo-Work-EmbeddedData")

        // create case
        onNodeWithText(CREATE_CASE_TEXT).performClick()

        // verify form components
        waitForNode("Create EmbeddedData (E-")
        waitForNode("Embedded Data use-case")
        waitForNode("EmbeddedData cars editable")
        waitForNode("EmbeddedData cars readonly")
        waitForNodes("Row 1", 2)
        waitForNode("Details")
        waitForNodes("Brand", 2)
        waitForNodes("Model", 2)
        waitForNodes("---", 2)

        // enter some data
        onNodeWithText("Client name").performTextInput("Lukasz")
        onNode(hasText("Brand") and hasSetTextAction()).performTextInput("Audi")
        onNode(hasText("Model") and hasSetTextAction()).performTextInput("A5")

        // verify data propagation
        // TODO TASK-1786094

        // go to next step
        onNodeWithText("Next").performClick()

        // verify form components on 2nd step
        waitForNode("Verify EmbeddedData (E-")
        waitForNode("EmbeddedData cars readonly")
        waitForNode("Lukasz")
        waitForNode("Details")
        waitForNode("Brand")
        waitForNode("Audi")
        waitForNode("Model")
        waitForNode("A5")
    }

    companion object {
        private const val CREATE_CASE_TEXT = "New Service"
    }
}
