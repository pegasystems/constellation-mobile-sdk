package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ComposeUiTest
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.compose.ui.test.runComposeUiTest
import androidx.compose.ui.test.waitUntilDoesNotExist
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNodes
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import org.junit.Test

@OptIn(ExperimentalTestApi::class)
class GroupTest : ComposeTest(PegaVersion.v24_2_2) {
    @Test
    fun test_group_component() = runComposeUiTest {
        setupApp(caseClassName = "O40M3A-MarekCo-Work-GroupTest")

        onNodeWithText("New Service").performClick()
        waitForNode("GroupTest - Create", substring = true)
        // verify simple fields group
        waitForNode("Simple fields group heading", substring = true)
        waitForNode("Simple fields group instruction", substring = true)

        onNodeWithText("name").performTextInput("John")
        onNodeWithText("surname").performTextInput("Smith")
        onNodeWithText("age").performTextInput("25")

        onNodeWithText("Simple fields group heading", substring = true).performClick()
        verifySimpleFieldsGone()
        onNodeWithText("Simple fields group heading", substring = true).performClick()
        verifySimpleFieldsShown()
        // verify lists group
        verifyListGroupGone()
        onNodeWithTag("checkbox_[Show lists group]").performClick()
        verifyListGroupShown()
        onNodeWithTag("checkbox_[Show lists group]").performClick()
        verifyListGroupGone();

        // Step 2
        onNodeWithText("Next").performClick()
        // verify details group heading
        verifyDetailsShown()
        onNodeWithText("Details group heading", substring = true).performClick()
        verifyDetailsGone()
        onNodeWithText("Details group heading", substring = true).performClick()
        verifyDetailsShown()
        // verify Edit view group
        onNodeWithTag("checkbox_[Show Editable view group no heading]").performClick()
        verifyEditViewShown()
    }

    private fun ComposeUiTest.verifySimpleFieldsShown() {
        waitForNode("Simple fields group instruction", substring = true)
        waitForNode("John")
        waitForNode("Smith")
        waitForNode("25")
    }

    private fun ComposeUiTest.verifySimpleFieldsGone() {
        waitUntilDoesNotExist(hasText("Simple fields group instruction", substring = true))
        waitUntilDoesNotExist(hasText("John"))
        waitUntilDoesNotExist(hasText("Smith"))
        waitUntilDoesNotExist(hasText("25"))
    }

    private fun ComposeUiTest.verifyListGroupShown() {
        waitForNode("Lists group heading", substring = true)
        waitForNode("List group instructions", substring = true)
        waitForNode("cars")
        waitForNode("Encryption keys")
    }

    private fun ComposeUiTest.verifyListGroupGone() {
        waitUntilDoesNotExist(hasText("Lists group heading"))
        waitUntilDoesNotExist(hasText("List group instructions"))
        waitUntilDoesNotExist(hasText("cars"))
        waitUntilDoesNotExist(hasText("Encryption keys"))
    }

    private fun ComposeUiTest.verifyDetailsShown() {
        waitForNode("Details")
        waitForNode("Label")
        waitForNode("Group test")
        waitForNode("Description")
        waitForNode("---")
    }

    private fun ComposeUiTest.verifyDetailsGone() {
        waitUntilDoesNotExist(hasText("Details"))
        waitUntilDoesNotExist(hasText("Label"))
        waitUntilDoesNotExist(hasText("Group test"))
        waitUntilDoesNotExist(hasText("Description"))
        waitUntilDoesNotExist(hasText("---"))
    }

    private fun ComposeUiTest.verifyEditViewShown() {
        waitForNode("Edit")
        waitForNode("Edit label")
        waitForNodes("Group test", 2)
        waitForNode("Edit description")
    }
}