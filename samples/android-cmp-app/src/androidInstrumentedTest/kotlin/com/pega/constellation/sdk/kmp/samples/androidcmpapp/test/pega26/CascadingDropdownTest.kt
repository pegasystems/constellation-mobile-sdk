package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26

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
class CascadingDropdownTest : ComposeTest(PegaVersion.v26_1) {
    @Test
    @PegaCase("OAOEH9-EloEloApp-Work-CascadingDropdowns")
    fun test_cascading_dropdown_recovers_after_missing_parameter_error() = runAndroidTest {

        onNodeWithText("New Service").performClick()
        waitForNode("Create (C-", substring = true)
        waitForNode("CarMake")
        waitForNode("CarModel")

        onNodeWithText("CarModel").performClick()
        onNodeWithText("3").assertDoesNotExist()
        onNodeWithText("CX60").assertDoesNotExist()
        onNodeWithText("CX30").assertDoesNotExist()

        onNodeWithText("CarMake").performClick()
        onNodeWithText("Mazda").performClick()

        waitForNode("3")
        waitForNode("CX60")
        waitForNode("CX30")
    }
}
