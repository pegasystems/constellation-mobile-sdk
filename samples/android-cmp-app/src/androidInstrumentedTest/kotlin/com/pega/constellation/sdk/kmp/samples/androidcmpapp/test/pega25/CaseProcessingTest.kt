package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega25

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.PegaCase
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.runAndroidTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class CaseProcessingTest : ComposeTest(PegaVersion.v25_1) {
    @Test
    @PegaCase("OI1OYV-Marco2-Work-SimpleTest")
    fun test_case_processing_backward() = runAndroidTest {

        onNodeWithText("New Service").performClick()
        waitForNode("step1 (S-", substring = true)

        waitForNode("step1 input")
        waitForNode("step1 boolean")
        onNodeWithText("Next").performClick()

        waitForNode("step2 input")
        onNodeWithText("Next").performClick()

        waitForNode("step3 boolean")
        waitForNode("step3 input")
        onNodeWithText("Next").performClick()

        waitForNode("step4 input")
        onNodeWithText("Previous").performClick()

        waitForNode("step3 boolean")
        waitForNode("step3 input")
        onNodeWithText("Previous").performClick()

        waitForNode("step2 input")
        onNodeWithText("Previous").performClick()

        waitForNode("step1 input")
        waitForNode("step1 boolean")
    }
}
