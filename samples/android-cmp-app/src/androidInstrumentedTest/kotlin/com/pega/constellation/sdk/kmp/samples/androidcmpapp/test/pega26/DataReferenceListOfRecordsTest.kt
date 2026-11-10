package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26

import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.SemanticsProperties
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.SemanticsMatcher
import androidx.compose.ui.test.SemanticsMatcher.Companion.expectValue
import androidx.compose.ui.test.assertCountEquals
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertIsNotSelected
import androidx.compose.ui.test.assertIsOff
import androidx.compose.ui.test.assertIsOn
import androidx.compose.ui.test.assertIsSelected
import androidx.compose.ui.test.hasAnyDescendant
import androidx.compose.ui.test.hasTestTag
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.junit4.ComposeContentTestRule
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.onFirst
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performScrollTo
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.DataReferenceTestHelper
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.DataReferenceTestHelper.Companion.row
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.DataReferenceTestHelper.Companion.submitAndVerify
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.PegaCase
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.runAndroidTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlinx.serialization.json.Json
import kotlin.test.Test
import kotlin.test.assertEquals

class DataReferenceListOfRecordsTest : ComposeTest(PegaVersion.v26_1) {
    private lateinit var dataReference: DataReferenceTestHelper
    private val a4Row = mapOf(
        "Brand" to "Audi",
        "Model" to "A4",
        "Mileage" to "56780",
        "Length" to "4.78",
        "DateOfProduction" to "2017-09-30",
        "Damaged" to "No",
        "Price" to "56300.25",
        // TODO: Assert Discount after the Percentage renderer is supported.
        "CarAvailability" to "2026-10-22",
        "DealerEmail" to "jan.kaminski@vehicles.eu",
        "DealerPhone" to "+48-58-123-4567",
        "DealerWebsite" to "https://www.vehicleposnan.com",
        "DealerWorkDayStart" to "09:15"
    )
    private val camryRow = listOf(
        "Toyota", "Camry", "45230", "4.725", "2019-03-15", "false", "45999.99", "15",
        "2026-10-25T09:30:00.000Z", "marek.kowalski@dealership.pl", "+48-12-345-6789",
        "https://www.autokrakow.pl", "09:15:48"
    )
    private val checkboxRole = expectValue(SemanticsProperties.Role, Role.Checkbox)
    private val cardMatcher = checkboxRole

    @Test
    @PegaCase("OR97MD-Constell_1-Work-DataReferenceListOfRecordsTest")
    fun test_data_reference_list_of_records() = runAndroidTest {
        val readRequestBody: (String) -> String = { waitForRequestBody(it) }
        dataReference = DataReferenceTestHelper(this, "Data reference List of records", cardMatcher)
        onNodeWithText("New Service").performClick()
        verifyStep("Combobox")
        assertEquals(
            Json.parseToJsonElement(
                """{"caseTypeID":"OR97MD-Constell_1-Work-DataReferenceListOfRecordsTest","content":{}}"""
            ),
            Json.parseToJsonElement(waitForRequestBody("/cases?"))
        )

        verifyDropdownOptionsAndSelection()
        submitAndVerify("Create", expectedPayloads.getValue("Create"), readRequestBody)
        verifyStep("Table")

        verifyEditableTable(setOf("C-Class", "Golf"))
        row("Golf").performClick()
        row("Golf").assertIsOff()
        row("C-Class").assertIsOn()
        row("3 Series").performClick()
        verifyEditableTable(setOf("C-Class", "3 Series"))
        dataReference.verifyRowData("3 Series", row("3 Series"), dataReference.bmwRow)
        submitAndVerify("Table", expectedPayloads.getValue("Table"), readRequestBody)
        verifyStep("SimpleTable")

        verifyEditableTable(setOf("C-Class", "3 Series"))
        row("C-Class").performClick()
        row("C-Class").assertIsOff()
        row("3 Series").assertIsOn()
        row("Camry").performClick()
        verifyEditableTable(setOf("3 Series", "Camry"))
        dataReference.verifyRowData("Camry", row("Camry"), camryRow)
        submitAndVerify("SimpleTable", expectedPayloads.getValue("SimpleTable"), readRequestBody)
        verifyStep("Checkbox group")

        verifyCheckboxGroup(setOf("3 Series", "Camry"))
        checkboxGroupOption("3 Series").performClick()
        checkboxGroupOption("3 Series").assertIsOff()
        checkboxGroupOption("Camry").assertIsOn()
        checkboxGroupOption("A4").performClick()
        checkboxGroupOption("Golf").performClick()
        verifyCheckboxGroup(setOf("A4", "Golf", "Camry"))
        submitAndVerify("CheckboxGroup", expectedPayloads.getValue("CheckboxGroup"), readRequestBody)
        verifyStep("Cards")

        verifyCards(setOf("A4", "Golf", "Camry"))
        dataReference.card("Camry").performScrollTo().performClick()
        dataReference.card("Camry").assertIsNotSelected()
        dataReference.card("A4").assertIsSelected()
        dataReference.card("Golf").assertIsSelected()
        dataReference.card("C-Class").performScrollTo().performClick()
        verifyCards(setOf("A4", "C-Class", "Golf"))
        verifyCardData("A4")
        submitAndVerify("Cards", expectedPayloads.getValue("Cards"), readRequestBody)
        verifyStep("Readonly field")

        listOf("A4", "Golf", "C-Class").forEach { waitForNode(it) }
        submitAndVerify("ReadonlyField", expectedPayloads.getValue("ReadonlyField"), readRequestBody)
        verifyStep("Readonly table")

        verifyReadonlyTable()
        submitAndVerify("ReadonlyTable", expectedPayloads.getValue("ReadonlyTable"), readRequestBody)
        verifyStep("Readonly simpletable")

        verifyReadonlyTable()
        submitAndVerify("ReadonlySimpletable", expectedPayloads.getValue("ReadonlySimpletable"), readRequestBody)
        verifyStep("Readonly cards")

        verifyReadonlyCards()
        verifyCardData("A4")
    }

    private fun ComposeContentTestRule.verifyStep(title: String) {
        waitForNode("$title (D-3003)")
        waitUntil(timeoutMillis = 5_000) {
            onAllNodesWithText("Data reference List of records").fetchSemanticsNodes().isNotEmpty()
        }
    }

    private fun ComposeContentTestRule.checkboxGroupOption(model: String) =
        onNode(
            checkboxRole and hasTestTag("checkbox_group_[Data reference List of records]") and alignedWithText(model),
            useUnmergedTree = true
        )

    private fun ComposeContentTestRule.alignedWithText(text: String): SemanticsMatcher {
        val labelCenters = onAllNodesWithText(text, useUnmergedTree = true)
            .fetchSemanticsNodes()
            .filter { it.size.height > 0 }
            .map { it.positionInRoot.y + it.size.height / 2f }
        return SemanticsMatcher("Checkbox aligned with '$text'") { node ->
            labelCenters.any { center -> center in node.positionInRoot.y..(node.positionInRoot.y + node.size.height) }
        }
    }

    private fun ComposeContentTestRule.verifyDropdownOptionsAndSelection() {
        dataReference.dropdownField().performClick()
        dataReference.verifyDropdownOptions()

        listOf("Golf", "3 Series", "C-Class").forEach {
            dataReference.dropdownOption(it).performClick()
        }
        dataReference.dropdownField().performClick()
        waitForNode("C-Class, 3 Series, Golf")

        dataReference.dropdownField().performClick()
        dataReference.dropdownOption("3 Series").performClick()
        dataReference.dropdownField().performClick()
        waitForNode("C-Class, Golf")
    }

    private fun ComposeContentTestRule.verifyEditableTable(selectedModels: Set<String>) {
        dataReference.waitForModels()
        dataReference.verifyTableColumns()
        onAllNodesWithText("MODEL").onFirst().performScrollTo().assertIsDisplayed()
        dataReference.models.forEach { row(it).assertExists() }
        dataReference.models.forEach {
            if (it in selectedModels) row(it).assertIsOn() else row(it).assertIsOff()
        }
    }

    private fun ComposeContentTestRule.verifyCheckboxGroup(selectedModels: Set<String>) {
        dataReference.models.forEach { waitForNode(it) }
        dataReference.models.forEach {
            if (it in selectedModels) checkboxGroupOption(it).assertIsOn()
            else checkboxGroupOption(it).assertIsOff()
        }
    }

    private fun ComposeContentTestRule.verifyCards(selectedModels: Set<String>) {
        waitUntil(timeoutMillis = 5_000) {
            onAllNodes(cardMatcher, useUnmergedTree = true).fetchSemanticsNodes().size == dataReference.models.size
        }
        onAllNodes(cardMatcher, useUnmergedTree = true).assertCountEquals(dataReference.models.size)
        dataReference.models.forEach {
            dataReference.card(it).performScrollTo().assertIsDisplayed()
            if (it in selectedModels) dataReference.card(it).assertIsSelected()
            else dataReference.card(it).assertIsNotSelected()
        }
    }

    private fun verifyCardData(model: String) {
        val cardData = listOf(
            "Brand: Audi",
            "Model: A4",
            "Date of production: 2017-09-30",
            "Mileage: 56780",
            "Price: 56300.25"
        )
        dataReference.card(model).assertExists()
        dataReference.verifyCardData(model, cardData)
    }

    private fun ComposeContentTestRule.verifyReadonlyTable() {
        dataReference.verifyTableColumns()
        onAllNodesWithText("MODEL").onFirst().performScrollTo().assertIsDisplayed()
        listOf("A4", "Golf", "C-Class").forEach {
            onAllNodesWithText(it, useUnmergedTree = true).onFirst().performScrollTo().assertIsDisplayed()
        }
        verifyReadonlyRowData(0, a4Row)
    }

    private fun ComposeContentTestRule.verifyReadonlyRowData(rowIndex: Int, values: Map<String, String>) {
        values.forEach { (property, value) ->
            val field = hasTestTag("caseInfo.content.DataReferenceListOfRecords[$rowIndex].$property") and
                hasAnyDescendant(hasText(value, substring = true))
            waitUntil(timeoutMillis = 5_000) {
                onAllNodes(field, useUnmergedTree = true).fetchSemanticsNodes().isNotEmpty()
            }
        }
    }

    private fun ComposeContentTestRule.verifyReadonlyCards() {
        val readonlyModels = listOf("A4", "Golf", "C-Class")
        waitUntil(timeoutMillis = 5_000) {
            onAllNodes(cardMatcher, useUnmergedTree = true).fetchSemanticsNodes().size == readonlyModels.size
        }
        onAllNodes(cardMatcher, useUnmergedTree = true).assertCountEquals(readonlyModels.size)
        readonlyModels.forEach { dataReference.card(it).performScrollTo().assertIsDisplayed() }
    }

    private val expectedPayloads = mapOf(
        "Create" to
            """{"content":{},"pageInstructions":[{"target":".DataReferenceListOfRecords","content":{"pyGUID":"c6398654-03bd-487c-a9b5-d1b474868ffc"},"listIndex":1,"instruction":"INSERT"},{"target":".DataReferenceListOfRecords","content":{"pyGUID":"ad8a5b02-83fe-4bf2-a738-135d473df87a"},"listIndex":2,"instruction":"INSERT"},{"target":".DataReferenceListOfRecords","content":{"pyGUID":"8495d3b2-609a-44a3-a8aa-1300db094ef7"},"listIndex":3,"instruction":"INSERT"},{"target":".DataReferenceListOfRecords","listIndex":2,"instruction":"DELETE"}]}""",
        "Table" to
            """{"content":{},"pageInstructions":[{"target":".DataReferenceListOfRecords","listIndex":1,"instruction":"DELETE"},{"target":".DataReferenceListOfRecords","content":{"pyGUID":"ad8a5b02-83fe-4bf2-a738-135d473df87a"},"listIndex":2,"instruction":"INSERT"}]}""",
        "SimpleTable" to
            """{"content":{},"pageInstructions":[{"target":".DataReferenceListOfRecords","listIndex":1,"instruction":"DELETE"},{"target":".DataReferenceListOfRecords","content":{"pyGUID":"eaf449dd-b7cc-483b-96f5-b9546336aa5d"},"listIndex":2,"instruction":"INSERT"}]}""",
        "CheckboxGroup" to
            """{"content":{},"pageInstructions":[{"content":{"pyGUID":"ad8a5b02-83fe-4bf2-a738-135d473df87a"},"target":".DataReferenceListOfRecords","listIndex":1,"instruction":"UPDATE"},{"content":{"pyGUID":"eaf449dd-b7cc-483b-96f5-b9546336aa5d"},"target":".DataReferenceListOfRecords","listIndex":2,"instruction":"UPDATE"},{"content":{"pyGUID":"ad8a5b02-83fe-4bf2-a738-135d473df87a"},"target":".DataReferenceListOfRecords","listIndex":1,"instruction":"UPDATE"},{"content":{"pyGUID":"eaf449dd-b7cc-483b-96f5-b9546336aa5d"},"target":".DataReferenceListOfRecords","listIndex":2,"instruction":"UPDATE"},{"target":".DataReferenceListOfRecords","listIndex":1,"instruction":"DELETE"},{"content":{"pyGUID":"eaf449dd-b7cc-483b-96f5-b9546336aa5d"},"target":".DataReferenceListOfRecords","listIndex":1,"instruction":"UPDATE"},{"target":".DataReferenceListOfRecords","content":{"pyGUID":"067f6be1-819a-41ab-b0a1-fc129199a074"},"listIndex":2,"instruction":"INSERT"},{"content":{"pyGUID":"eaf449dd-b7cc-483b-96f5-b9546336aa5d"},"target":".DataReferenceListOfRecords","listIndex":1,"instruction":"UPDATE"},{"content":{"pyGUID":"067f6be1-819a-41ab-b0a1-fc129199a074"},"target":".DataReferenceListOfRecords","listIndex":2,"instruction":"UPDATE"},{"target":".DataReferenceListOfRecords","content":{"pyGUID":"c6398654-03bd-487c-a9b5-d1b474868ffc"},"listIndex":3,"instruction":"INSERT"},{"content":{"pyGUID":"eaf449dd-b7cc-483b-96f5-b9546336aa5d"},"target":".DataReferenceListOfRecords","listIndex":1,"instruction":"UPDATE"},{"content":{"pyGUID":"067f6be1-819a-41ab-b0a1-fc129199a074"},"target":".DataReferenceListOfRecords","listIndex":2,"instruction":"UPDATE"},{"content":{"pyGUID":"c6398654-03bd-487c-a9b5-d1b474868ffc"},"target":".DataReferenceListOfRecords","listIndex":3,"instruction":"UPDATE"}]}""",
        "Cards" to
            """{"content":{},"pageInstructions":[{"content":{"pyGUID":"eaf449dd-b7cc-483b-96f5-b9546336aa5d"},"target":".DataReferenceListOfRecords","listIndex":1,"instruction":"UPDATE"},{"content":{"pyGUID":"067f6be1-819a-41ab-b0a1-fc129199a074"},"target":".DataReferenceListOfRecords","listIndex":2,"instruction":"UPDATE"},{"content":{"pyGUID":"c6398654-03bd-487c-a9b5-d1b474868ffc"},"target":".DataReferenceListOfRecords","listIndex":3,"instruction":"UPDATE"},{"content":{"pyGUID":"eaf449dd-b7cc-483b-96f5-b9546336aa5d"},"target":".DataReferenceListOfRecords","listIndex":1,"instruction":"UPDATE"},{"content":{"pyGUID":"067f6be1-819a-41ab-b0a1-fc129199a074"},"target":".DataReferenceListOfRecords","listIndex":2,"instruction":"UPDATE"},{"content":{"pyGUID":"c6398654-03bd-487c-a9b5-d1b474868ffc"},"target":".DataReferenceListOfRecords","listIndex":3,"instruction":"UPDATE"},{"target":".DataReferenceListOfRecords","listIndex":1,"instruction":"DELETE"},{"content":{"pyGUID":"067f6be1-819a-41ab-b0a1-fc129199a074"},"target":".DataReferenceListOfRecords","listIndex":1,"instruction":"UPDATE"},{"content":{"pyGUID":"c6398654-03bd-487c-a9b5-d1b474868ffc"},"target":".DataReferenceListOfRecords","listIndex":2,"instruction":"UPDATE"},{"target":".DataReferenceListOfRecords","content":{"pyGUID":"8495d3b2-609a-44a3-a8aa-1300db094ef7"},"listIndex":3,"instruction":"INSERT"},{"content":{"pyGUID":"067f6be1-819a-41ab-b0a1-fc129199a074"},"target":".DataReferenceListOfRecords","listIndex":1,"instruction":"UPDATE"},{"content":{"pyGUID":"c6398654-03bd-487c-a9b5-d1b474868ffc"},"target":".DataReferenceListOfRecords","listIndex":2,"instruction":"UPDATE"},{"content":{"pyGUID":"8495d3b2-609a-44a3-a8aa-1300db094ef7"},"target":".DataReferenceListOfRecords","listIndex":3,"instruction":"UPDATE"}]}""",
        "ReadonlyField" to """{"content":{},"pageInstructions":[]}""",
        "ReadonlyTable" to """{"content":{},"pageInstructions":[]}""",
        "ReadonlySimpletable" to """{"content":{},"pageInstructions":[]}"""
    )
}
