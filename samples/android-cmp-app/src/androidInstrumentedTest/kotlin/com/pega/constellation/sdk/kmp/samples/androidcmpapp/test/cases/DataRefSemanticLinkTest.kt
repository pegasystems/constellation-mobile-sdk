package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.runAndroidTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNodes
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class DataRefSemanticLinkTest : ComposeTest(PegaVersion.v25_1) {

    @Test
    fun test_data_reference_form_and_semantic_link() = runAndroidTest {
        setupApp("OI1OYV-Marco2-Work-DataReferenceTest-FieldOnly")

        // create case
        onNodeWithText("New Service").performClick()

        // Step 1: verify DataReference form with Dropdown appears
        waitForNode("DataReferenceSingleCars")

        // Select "Focus" from the dropdown
        onNodeWithText("DataReferenceSingleCars").performClick()
        waitForNode("Focus")
        onNodeWithText("Focus").performClick()

        // Verify refresh populated the subview with Brand and Model
        waitForNodes("Focus", 2)
        waitForNode("Ford")

        // Submit step 1 → step 2 loads with SemanticLink
        onNodeWithText("Next").performClick()

        // Step 2: verify SemanticLink renders the selected car model
        waitForNode("Focus")
    }
}
