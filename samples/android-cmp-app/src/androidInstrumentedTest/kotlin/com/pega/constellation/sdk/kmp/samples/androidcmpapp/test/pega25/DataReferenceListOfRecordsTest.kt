package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega25

import androidx.compose.ui.test.junit4.ComposeContentTestRule
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.PegaCase
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.runAndroidTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNodes
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class DataReferenceListOfRecordsTest : ComposeTest(PegaVersion.v25_1) {
    val columns = listOf("BRAND", "MODEL")

    @Test
    @PegaCase("O40M3A-MarekCo-Work-DataReferenceListOfRecordsTest")
    fun test_table_simple_table() = runAndroidTest {
        val cars = listOf(
            listOf("Audi", "A4", "30000"),
            listOf("Ford", "Focus", "25000"),
            listOf("Fiat", "Panda", "10000"),
            listOf("Skoda", "Octavia", "35000")
        )
        val cars2 = listOf(
            listOf("Ford", "Focus", "$ 25000"),
            listOf("Fiat", "Panda", "$ 10000")
        )

        // create case
        onNodeWithText("New Service").performClick()

        // Editable Table
        waitForNode("DataReference ListOfRecords - Table", substring = true)
        waitForNodes("DataReferenceListOfRecordsCars", count = 1)
        verifyTable(cars)
        onAllNodesWithText("Focus")[0].performClick()
        onAllNodesWithText("Panda")[0].performClick()
        onNodeWithText("Next").performClick()

        // Editable SimpleTable
        waitForNode("DataReference ListOfRecords - SimpleTable", substring = true)
        waitForNode("DataReferenceListOfRecordsCars")
        verifyTable(cars)
        onNodeWithText("Next").performClick()

        // Readonly Table
        waitForNode("DataReference ListOfRecords - Table readonly", substring = true)
        waitForNode("DataReferenceListOfRecordsCars")
        verifyTable(cars2)
        onNodeWithText("Next").performClick()

        // Readonly SimpleTable
        waitForNode("DataReference ListOfRecords - SimpleTable readonly", substring = true)
        waitForNode("DataReferenceListOfRecordsCars")
        verifyTable(cars2)
    }

    private fun ComposeContentTestRule.verifyTable(data: List<List<String>>) {
        columns.forEach { waitForNodes(it, 2) }
        data.flatten().forEach { waitForNodes(it, 2) }
    }

    @Test
    @PegaCase("O40M3A-MarekCo-Work-DataReferenceListOfRecordsTest")
    fun test_field_value_display() = runAndroidTest {

        // create case
        onNodeWithText("New Service").performClick()

        // Step 1: Editable Table - select items and proceed
        waitForNode("DataReference ListOfRecords - Table", substring = true)
        onAllNodesWithText("Focus")[0].performClick()
        onAllNodesWithText("Panda")[0].performClick()
        onNodeWithText("Next").performClick()

        // Step 2: Editable SimpleTable - proceed
        waitForNode("DataReference ListOfRecords - SimpleTable", substring = true)
        onNodeWithText("Next").performClick()

        // Step 3: Readonly Table - proceed
        waitForNode("DataReference ListOfRecords - Table readonly", substring = true)
        onNodeWithText("Next").performClick()

        // Step 4: Readonly SimpleTable - proceed
        waitForNode("DataReference ListOfRecords - SimpleTable readonly", substring = true)
        onNodeWithText("Next").performClick()

        // Step 5: FieldValue - verify display-only multi values (comma-separated SemanticLinks)
        waitForNode("DataReference ListOfRecords FieldValue", substring = true)
        waitForNode("FieldValue Cars")
        waitForNode("A4")
        waitForNode(", ")
        waitForNode("Focus")
    }

    @Test
    @PegaCase("O40M3A-MarekCo-Work-DataReferenceMultiSelectTest")
    fun test_combo_box() = runAndroidTest {

        // Create case
        onNodeWithText("New Service").performClick()

        // Wait for multiselect to appear
        waitForNode("Cars Selection")

        // Open dropdown by clicking on the field
        onNodeWithText("Cars Selection").performClick()

        // Verify options are loaded from D_carsList
        waitForNode("Focus")
        waitForNode("Corolla")
        waitForNode("126p")
        waitForNode("Octavia")

        // Test search functionality - type to filter, verify only matching option visible
        onNodeWithText("Cars Selection").performTextInput("oct")
        waitForNode("Octavia")

        // Close dropdown (clears search via onExpandedChange), reopen, then select multiple items
        onNodeWithText("Cars Selection").performClick()
        waitUntilDoesNotExist(hasText("Octavia"))
        onNodeWithText("Cars Selection").performClick()
        waitForNode("Focus")
        onNodeWithText("Focus").performClick()
        onNodeWithText("Octavia").performClick()

        // Close dropdown by clicking on the field again
        onNodeWithText("Cars Selection").performClick()
        waitForNode("Focus, Octavia")

        onNodeWithText("Submit").performClick()
        waitForNode("Thanks for registration")
    }
}
