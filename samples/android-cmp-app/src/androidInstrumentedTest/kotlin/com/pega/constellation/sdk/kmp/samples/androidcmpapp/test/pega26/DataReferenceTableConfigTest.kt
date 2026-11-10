package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.assertIsNotEnabled
import androidx.compose.ui.test.assertIsOff
import androidx.compose.ui.test.assertIsOn
import androidx.compose.ui.test.click
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.isOn
import androidx.compose.ui.test.junit4.ComposeContentTestRule
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performScrollTo
import androidx.compose.ui.test.performTouchInput
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.DataReferenceTestHelper.Companion.row
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.DataReferenceTestHelper.Companion.rowMatcher
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.DataReferenceTestHelper.Companion.submitAndVerify
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.PegaCase
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.runAndroidTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlinx.serialization.json.Json
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalTestApi::class)
class DataReferenceTableConfigTest : ComposeTest(PegaVersion.v26_1) {
    @Test
    @PegaCase("OR97MD-Constell_1-Work-DataReferenceConfigTest")
    fun test_required_and_disabled_tables() = runAndroidTest {
        val readRequestBody: (String) -> String = { waitForRequestBody(it) }
        onNodeWithText("New Service").performClick()

        waitForNode("Single SelectTable required", substring = true)
        verifyBody("/cases?", """{"caseTypeID":"OR97MD-Constell_1-Work-DataReferenceConfigTest","content":{}}""")
        verifyBody(
            "/data_views/D_CarList",
            """{"dataViewParameters":{},"query":{"select":[{"field":"Brand"},{"field":"Model"},{"field":"Price"},{"field":"pyGUID"}]}}"""
        )
        verifyRequired("Car")
        row("Golf").assertIsOff()
        onNodeWithText("Next").performClick()
        verifyValidation("Car")
        row("Golf").performScrollTo().performClick()
        waitForSelected("Golf")
        waitUntilDoesNotExist(hasText("Cannot be blank"))
        submitAndVerify(
            "Create",
            """{"content":{"Car":{"pyGUID":"c6398654-03bd-487c-a9b5-d1b474868ffc"}},"pageInstructions":[]}""",
            readRequestBody
        )

        waitForNode("Single Select Table disabled", substring = true)
        row("Golf").assertIsOn().assertIsNotEnabled()
        row("3 Series").assertIsOff().assertIsNotEnabled()
        row("3 Series").performScrollTo().performTouchInput { click() }
        row("3 Series").assertIsOff()
        row("Golf").assertIsOn()
        submitAndVerify("TableDisabled", """{"content":{},"pageInstructions":[]}""", readRequestBody)

        waitForNode("Multi Select Table required", substring = true)
        verifyRequired("Cars")
        row("Golf").assertIsOff()
        row("Camry").assertIsOff()
        onNodeWithText("Next").performClick()
        verifyValidation("Cars")
        row("Golf").performScrollTo().performClick()
        waitForSelected("Golf")
        waitUntilDoesNotExist(hasText("Cannot be blank"))
        row("Camry").performScrollTo().performClick()
        waitForSelected("Camry")
        row("Golf").assertIsOn()
        submitAndVerify(
            "MultiSelectTableRequired",
            """{"content":{},"pageInstructions":[{"target":".Cars","content":{"pyGUID":"c6398654-03bd-487c-a9b5-d1b474868ffc"},"listIndex":1,"instruction":"INSERT"},{"target":".Cars","content":{"pyGUID":"eaf449dd-b7cc-483b-96f5-b9546336aa5d"},"listIndex":2,"instruction":"INSERT"}]}""",
            readRequestBody
        )

        waitForNode("Multi Select Table disabled", substring = true)
        row("Golf").assertIsOn().assertIsNotEnabled()
        row("Camry").assertIsOn().assertIsNotEnabled()
        row("A4").assertIsOff().assertIsNotEnabled()
        row("Golf").performScrollTo().performTouchInput { click() }
        row("A4").performScrollTo().performTouchInput { click() }
        row("Golf").assertIsOn()
        row("Camry").assertIsOn()
        row("A4").assertIsOff()
        onNodeWithText("Submit").performClick()
        verifyBody("/actions/MultiSelectTableDisabled?", """{"content":{},"pageInstructions":[]}""")
        waitForNode("New Service")
    }

    private fun ComposeContentTestRule.verifyRequired(label: String) {
        waitForNode(label)
        waitForNode(" *")
    }

    private fun ComposeContentTestRule.verifyValidation(label: String) {
        waitForNode("$label: Cannot be blank")
        waitForNode("Cannot be blank")
    }

    private fun ComposeContentTestRule.waitForSelected(model: String) {
        waitUntil(timeoutMillis = 5_000) {
            onAllNodes(rowMatcher(model) and isOn(), useUnmergedTree = true).fetchSemanticsNodes().isNotEmpty()
        }
        row(model).assertIsOn()
    }

    private fun ComposeContentTestRule.verifyBody(urlPart: String, expected: String) {
        assertEquals(Json.parseToJsonElement(expected), Json.parseToJsonElement(waitForRequestBody(urlPart)))
    }
}
