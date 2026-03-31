package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ComposeUiTest
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.runComposeUiTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNodes
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class DataReferenceListOfRecordsTest  : ComposeTest(PegaVersion.v25_1) {
    val columns = listOf("BRAND", "MODEL")

    @Test
    fun test_table_simple_table() = runComposeUiTest {
        val cars = listOf(
            listOf("Ford", "Focus"),
            listOf("Toyota", "Corolla"),
            listOf("Fiat", "126p"),
            listOf("Skoda", "Octavia"),
            listOf("Audi", "A5")
        )
        val cars2 = listOf(
            listOf("Ford", "Focus"),
            listOf("Fiat", "126p"),
        )

        setupApp("O40M3A-MarekCo-Work-DataReferenceListOfRecordsTest")

        // create case
        onNodeWithText("New Service").performClick()

        // Editable Table
        waitForNode("DataReference ListOfRecords - Table", substring = true)
        waitForNodes("DataReferenceListOfRecordsCars", count = 1)
        verifyTable(cars)
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

    private fun ComposeUiTest.verifyTable(data: List<List<String>>) {
        columns.forEach { waitForNodes(it, 2) }
        data.flatten().forEach { waitForNodes(it, 2) }
    }
}
