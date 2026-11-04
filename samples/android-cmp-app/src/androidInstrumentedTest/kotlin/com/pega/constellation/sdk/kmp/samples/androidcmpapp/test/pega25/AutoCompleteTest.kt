package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega25

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.isFocused
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.compose.ui.test.performTextReplacement
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.PegaCase
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.runAndroidTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNodes
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class AutoCompleteTest : ComposeTest(PegaVersion.v25_1) {
    @Test
    @PegaCase("OFV0MW-Marco-Work-AutoCompleteTest")
    fun test_auto_complete() = runAndroidTest {

        onNodeWithText("New Service").performClick()
        waitForNode("AutoComplete (", substring = true)

        onNodeWithText("Car brand").performClick()
        waitForNode("Ford")
        waitForNode("Audi")
        waitForNode("Fiat")
        onNodeWithText("Car brand").performClick() // closing dropdown

        onNodeWithText("Car Model").performClick()
        waitForNode("Focus")
        waitForNode("Corolla")
        waitForNode("126p")
        waitForNode("Octavia")
        onNodeWithText("Car Model").performClick() // closing dropdown

        onNodeWithText("Car brand").performClick()
        onNode(isFocused()).performTextInput("For")
        waitForNode("Ford")
        onNodeWithText("Fiat").assertDoesNotExist()

        onNodeWithText("Ford").performClick()
        waitForNode("Ford")

        // Reopening must reset the transient query and show all three brand options.
        onNodeWithText("Car brand").performClick()
        waitForNodes("Ford", count = 2) // selected field value plus the reopened option
        waitForNode("Audi")
        waitForNode("Fiat")

        // Explicitly replacing the field text applies the new filter query.
        onNode(isFocused()).performTextReplacement("Fi")
        waitForNode("Fiat")
        onNodeWithText("Ford").assertDoesNotExist()
        onNodeWithText("Audi").assertDoesNotExist()
        onNodeWithText("Car brand").performClick() // close filtered dropdown
        onNodeWithText("Car Model").performClick()
        waitForNode("Focus")
        onNodeWithText("Corolla").assertDoesNotExist()
        onNodeWithText("Octavia").assertDoesNotExist()

        onNode(isFocused()).performTextInput("Audi")
        onNodeWithText("Focus").assertDoesNotExist()
    }

    @Test
    @PegaCase("OFV0MW-Marco-Work-AutoCompleteTest")
    fun test_auto_complete_data_ref() = runAndroidTest {

        onNodeWithText("New Service").performClick()

        waitForNode("AutoComplete (", substring = true)
        onNodeWithText("Submit").performClick()

        waitForNode("Car Reference")

        onNodeWithText("Car Reference").performClick()
        waitForNode("Ford")
        waitForNode("Fiat")
        waitForNode("Toyota")
        waitForNode("Skoda")
        waitForNode("Audi")

        onNodeWithText("Car Reference").performTextInput("F")
        waitForNode("Ford")
        waitForNode("Fiat")

        onNodeWithText("Toyota").assertDoesNotExist()
        onNodeWithText("Skoda").assertDoesNotExist()
        onNodeWithText("Audi").assertDoesNotExist()
    }
}
