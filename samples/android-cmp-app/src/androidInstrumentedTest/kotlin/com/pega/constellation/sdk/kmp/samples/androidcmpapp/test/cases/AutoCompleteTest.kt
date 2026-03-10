package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.isFocused
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.compose.ui.test.runComposeUiTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class AutoCompleteTest : ComposeTest(PegaVersion.v25_1_1) {
    @Test
    fun test_auto_complete() = runComposeUiTest {
        setupApp("OFV0MW-Marco-Work-AutoCompleteTest")

        onNodeWithText("New Service").performClick()

        waitForNode("AutoComplete (", substring = true)

        onNodeWithText("Car brand").performClick()
        waitForNode("Ford")
        waitForNode("Audi")
        waitForNode("Fiat")
        onNodeWithText("Car brand").performClick() // closing dropdown

        onNodeWithText("Car Model").performClick()
        waitForNode("A4")
        waitForNode("Focus")
        waitForNode("Panda")
        waitForNode("Mondeo")
        onNodeWithText("Car Model").performClick() // closing dropdown

        onNodeWithText("Car brand").performClick()
        onNode(isFocused()).performTextInput("For")
        waitForNode("Ford")
        onNodeWithText("Fiat").assertDoesNotExist()

        onNodeWithText("Ford").performClick()
        waitForNode("Ford")

        onNodeWithText("Car Model").performClick()
        waitForNode("Focus")
        waitForNode("Mondeo")
        onNodeWithText("A4").assertDoesNotExist()
        onNodeWithText("Panda").assertDoesNotExist()

        onNode(isFocused()).performTextInput("Foc")
        waitForNode("Focus")
        onNodeWithText("Mondeo").assertDoesNotExist()
    }
}