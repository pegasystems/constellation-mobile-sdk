package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.hasContentDescription
import androidx.compose.ui.test.hasSetTextAction
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.compose.ui.test.runComposeUiTest
import androidx.compose.ui.test.waitUntilDoesNotExist
import androidx.compose.ui.test.waitUntilNodeCount
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNodes
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class EmbeddedDataTest : ComposeTest(PegaVersion.v24_1_0) {
    @Test
    fun test_embedded_data() = runComposeUiTest {
        setupApp("DIXL-MediaCo-Work-EmbeddedData")

        // create case
        onNodeWithText("New Service").performClick()

        // verify form title and instruction
        waitForNode("Create EmbeddedData (E-", substring = true)
        waitForNode("Embedded Data use-case", substring = true)
        waitForNode("EmbeddedData cars editable")
        waitForNode("EmbeddedData cars readonly")

        // remove and verify empty list
        onNodeWithContentDescription("Delete item 1").performClick()
        waitForNodes("No items", count = 2)
        waitUntilNodeCount(hasContentDescription("No items"), count = 2)

        onNodeWithText("Add", substring = true).performClick()

        // verify empty record
        waitForNodes("Row 1", 2)
        waitForNode("Details")
        waitForNodes("Brand", 2)
        waitForNodes("Model", 2)
        waitForNodes("---", 2)

        // enter data
        onNodeWithText("Client name").performTextInput("Lukasz")
        onNode(hasText("Brand") and hasSetTextAction()).performTextInput("Audi")
        onNode(hasText("Model") and hasSetTextAction()).performTextInput("A5")
        onNodeWithText("Row 1").performClick() // remove focus to propagate data

        // verify data propagation
        waitForNodes("Lukasz", 2)
        waitForNodes("Audi", 2)
        waitForNodes("A5", 2)

        // adding 2nd record
        onNodeWithText("Add", substring = true).performClick()

        // enter data in Row 2
        waitForNodes("Row 2", count = 2)
        onNode(hasText("Client name") and !hasText("Lukasz") and hasSetTextAction()).performTextInput("Marek")
        onNode(hasText("Brand") and !hasText("Audi") and hasSetTextAction()).performTextInput("Ford")
        onNode(hasText("Model") and !hasText("A5") and hasSetTextAction()).performTextInput("Focus")
        onNodeWithText("Row 2").performClick() // remove focus to propagate data

        // verify data propagation for Row 2
        waitForNodes("Marek", 2)
        waitForNodes("Ford", 2)
        waitForNodes("Focus", 2)

        // remove Row 1 and verify
        onNodeWithContentDescription("Delete item 2").performClick()

        waitUntilDoesNotExist(hasText("Row 2"))
        waitUntilDoesNotExist(hasText("Marek"))
        waitUntilDoesNotExist(hasText("Ford"))
        waitUntilDoesNotExist(hasText("Focus"))

        // go to next step
        onNodeWithText("Next").performClick()

        // verify form components on 2nd step
        waitForNode("Verify EmbeddedData (E-", substring = true)
        waitForNode("EmbeddedData cars readonly")
        waitForNode("Lukasz")
        waitForNode("Details")
        waitForNode("Brand")
        waitForNode("Audi")
        waitForNode("Model")
        waitForNode("A5")
    }
}
