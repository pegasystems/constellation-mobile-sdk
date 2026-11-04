package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega25

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.hasClickAction
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.PegaCase
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.runAndroidTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNodes
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class EmbeddedDataComboboxTest : ComposeTest(PegaVersion.v25_1, maxAttempts = 1) {

    @Test
    @PegaCase("OFV0MW-Marco-Work-EmbeddedDataTest-Combobox")
    fun test_embedded_data_combobox() = runAndroidTest {

        // create case
        onNodeWithText("New Service").performClick()

        // verify combobox is present
        waitForNode("EmbeddedDataCarSingle")

        // open combobox and verify 2 options
        onNode(hasText("EmbeddedDataCarSingle") and hasClickAction()).performClick()
        waitForNode("model-a")
        waitForNode("model-b")

        // select first option and verify details update
        onNodeWithText("model-a").performClick()
        waitForNode("brand-a")
        waitForNodes("model-a", 2)

        // select second option and verify details update
        onNode(hasText("EmbeddedDataCarSingle") and hasClickAction()).performClick()
        waitForNode("model-b")
        onNodeWithText("model-b").performClick()
        waitForNode("brand-b")
        waitForNodes("model-b", 2)
    }
}
