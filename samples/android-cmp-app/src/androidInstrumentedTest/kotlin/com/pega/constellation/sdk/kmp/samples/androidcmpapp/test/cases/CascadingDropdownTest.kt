package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.runAndroidTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class CascadingDropdownTest : ComposeTest() {
    @Test
    fun test_cascading_dropdown_recovers_after_missing_parameter_error() = runAndroidTest {
        setupApp(
            caseClassName = "OAOEH9-EloEloApp-Work-CascadingDropdowns",
            pegaVersion = PegaVersion.v26_1_1
        )

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
