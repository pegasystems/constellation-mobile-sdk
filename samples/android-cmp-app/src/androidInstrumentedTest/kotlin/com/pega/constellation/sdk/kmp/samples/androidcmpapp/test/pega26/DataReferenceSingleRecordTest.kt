package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26

import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.SemanticsProperties
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.SemanticsMatcher
import androidx.compose.ui.test.SemanticsMatcher.Companion.expectValue
import androidx.compose.ui.test.assert
import androidx.compose.ui.test.assertCountEquals
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertIsNotSelected
import androidx.compose.ui.test.assertIsOff
import androidx.compose.ui.test.assertIsOn
import androidx.compose.ui.test.assertIsSelected
import androidx.compose.ui.test.hasAnyDescendant
import androidx.compose.ui.test.hasClickAction
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.isOn
import androidx.compose.ui.test.isToggleable
import androidx.compose.ui.test.junit4.ComposeContentTestRule
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performScrollTo
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.DataReferenceTestHelper
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.PegaCase
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.runAndroidTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlinx.serialization.json.Json
import kotlin.test.Test
import kotlin.test.assertEquals

class DataReferenceSingleRecordTest : ComposeTest(PegaVersion.v26_1) {
    private lateinit var dataReference: DataReferenceTestHelper
    private val golfRow = listOf(
        "Volkswagen", "Golf", "89320", "4.92", "2020-05-14", "true", "89200.75", "35",
        "2026-11-05T16:20:00.000Z", "katarzyna.wisniewski@motors.pl", "+48-42-890-1234",
        "https://www.motorswroclaw.pl", "09:15:48"
    )
    private val cardMatcher = expectValue(SemanticsProperties.Role, Role.RadioButton)

    @Test
    @PegaCase("OR97MD-Constell_1-Work-DataReferenceTest")
    fun test_single_record() = runAndroidTest {
        dataReference = DataReferenceTestHelper(this, "Data reference single record", cardMatcher)
        onNodeWithText("New Service").performClick()
        verifyStep("Combobox")
        assertEquals(
            Json.parseToJsonElement(
                """{"caseTypeID":"OR97MD-Constell_1-Work-DataReferenceTest","content":{}}"""
            ),
            Json.parseToJsonElement(waitForRequestBody("/cases?"))
        )
        verifyDropdownOptionsAndSelect("C-Class")
        verifyPayload("Combobox/refresh", "8495d3b2-609a-44a3-a8aa-1300db094ef7")
        submitAndVerify("Combobox", "8495d3b2-609a-44a3-a8aa-1300db094ef7", "Dropdown")

        dataReference.dropdownField().assert(hasText("C-Class"))
        verifyDropdownOptionsAndSelect("A4")
        verifyPayload("Dropdown/refresh", "067f6be1-819a-41ab-b0a1-fc129199a074")
        submitAndVerify("Dropdown", "067f6be1-819a-41ab-b0a1-fc129199a074", "Table")

        verifyTable("A4")
        row("3 Series").performClick()
        verifySelectedRow("3 Series", dataReference.bmwRow)
        row("A4").assertIsOff()
        submitAndVerify("Table", "ad8a5b02-83fe-4bf2-a738-135d473df87a", "Simple Table")

        verifyTable("3 Series")
        row("Golf").performClick()
        verifySelectedRow("Golf", golfRow)
        row("3 Series").assertIsOff()
        submitAndVerify("SimpleTable", "c6398654-03bd-487c-a9b5-d1b474868ffc", "Cards")

        onAllNodes(cardMatcher, useUnmergedTree = true).assertCountEquals(dataReference.models.size)
        dataReference.models.forEach { dataReference.card(it).performScrollTo().assertIsDisplayed() }
        dataReference.card("Golf").assertIsSelected()
        dataReference.card("Camry").performScrollTo().performClick()
        waitUntil(timeoutMillis = 5_000) {
            onAllNodes(
                cardMatcher and hasAnyDescendant(hasText("Camry")) and
                    expectValue(SemanticsProperties.Selected, true),
                useUnmergedTree = true
            ).fetchSemanticsNodes().isNotEmpty()
        }
        dataReference.card("Camry").assertIsSelected()
        dataReference.card("Golf").assertIsNotSelected()
        dataReference.verifyCardData(
            "Camry",
            listOf(
                "Brand: Toyota", "Model: Camry", "Date of production: 2019-03-15",
                "Mileage: 45230", "Price: 45999.99"
            )
        )
        submitAndVerify("Cards", "eaf449dd-b7cc-483b-96f5-b9546336aa5d", "Readonly")

        waitForNode("Camry")
    }

    private fun ComposeContentTestRule.verifyStep(title: String) {
        waitForNode("$title (D-2004)")
        waitForNode("Data reference single record")
    }

    private fun ComposeContentTestRule.verifyDropdownOptionsAndSelect(model: String) {
        dataReference.dropdownField().performClick()
        dataReference.verifyDropdownOptions()
        dataReference.dropdownOption(model).performClick()
        waitUntil(timeoutMillis = 5_000) {
            onAllNodes(
                hasText("Data reference single record") and hasText(model) and hasClickAction()
            ).fetchSemanticsNodes().isNotEmpty()
        }
        dataReference.dropdownField().assert(hasText(model))
    }

    private fun ComposeContentTestRule.rowMatcher(model: String): SemanticsMatcher {
        val centers = onAllNodesWithText(model, useUnmergedTree = true).fetchSemanticsNodes()
            .map { it.positionInRoot.y + it.size.height / 2f }
        // DataTable exposes controls and cells as siblings, including measurement-only copies.
        return isToggleable() and SemanticsMatcher("Table row containing $model") {
            centers.any { center -> center in it.positionInRoot.y..(it.positionInRoot.y + it.size.height) }
        }
    }

    private fun ComposeContentTestRule.row(model: String) =
        onNode(rowMatcher(model), useUnmergedTree = true)

    private fun ComposeContentTestRule.verifyTable(selectedModel: String) {
        dataReference.waitForModels()
        dataReference.verifyTableColumns()
        dataReference.models.forEach { row(it).assertExists() }
        verifySelectedRow(selectedModel)
    }

    private fun ComposeContentTestRule.verifySelectedRow(model: String, values: List<String> = emptyList()) {
        waitUntil(timeoutMillis = 5_000) {
            onAllNodes(rowMatcher(model) and isOn(), useUnmergedTree = true).fetchSemanticsNodes().isNotEmpty()
        }
        row(model).assertIsOn()
        dataReference.verifyRowData(model, row(model), values)
    }

    private fun ComposeContentTestRule.submitAndVerify(action: String, guid: String, nextTitle: String) {
        onNodeWithText("Next").performClick()
        verifyPayload("$action?", guid)
        verifyStep(nextTitle)
    }

    private fun ComposeContentTestRule.verifyPayload(action: String, guid: String) {
        assertEquals(
            Json.parseToJsonElement(
                """{"content":{"DataReferenceSingleRecord":{"pyGUID":"$guid"}},"pageInstructions":[]}"""
            ),
            Json.parseToJsonElement(waitForRequestBody("/actions/$action"))
        )
    }
}
