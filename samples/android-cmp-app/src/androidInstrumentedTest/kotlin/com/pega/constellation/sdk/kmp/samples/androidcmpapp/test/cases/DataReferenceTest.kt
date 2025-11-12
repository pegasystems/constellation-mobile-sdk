package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.hasClickAction
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.runComposeUiTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.PegaVersion
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNodes
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class DataReferenceTest : ComposeTest() {
    private val columns = listOf("ID", "BRAND", "MODEL", "COLOR")
    private val cars = listOf(
        listOf("1", "Ford", "Focus", "Silver"),
        listOf("2", "Toyota", "Corolla", "Yellow"),
        listOf("3", "Fiat", "126p", "Red"),
        listOf("4", "Skoda", "Octavia", "Black"),
        listOf("5", "Audi", "A5", "White"),
    )

    @Test
    fun test_simple_table() = runComposeUiTest {
        setupApp("O40M3A-MarekCo-Work-DataReferenceTest2", PegaVersion.v24_1_0)

        // create case
        onNodeWithText("New Service").performClick()

        // verify form title
        waitForNode("Rent a car (D-", substring = true)
        waitForNodes("Select your car", count = 2)

        // verify columns
        columns.forEach { waitForNodes(it, count = 2) }

        // verify data
        cars.flatten().forEach { waitForNodes(it, count = 2) }
    }

    @Test
    fun test_dropdown() = runComposeUiTest {
        setupApp("O40M3A-MarekCo-Work-DataReferenceTest2", PegaVersion.v24_1_0)

        // create case
        onNodeWithText("New Service").performClick()

        // select best car
        waitForNodes("Audi", count = 2)
        onAllNodesWithText("Audi")[0].performClick()

        // go to next step
        onNodeWithText("Next").performClick()

        // verify selected car
        waitForNodes("Car for rent", count = 2)
        waitForNode("A5")
        waitForNode("Car details")
        waitForNode("Brand", substring = true)
        waitForNode("Audi")
        waitForNode("Color", substring = true)
        waitForNode("White")

        // select each car and verify its details
        cars.forEach {
            onNode(hasText("Car for rent") and hasClickAction()).performClick()
            // select model
            onNodeWithText(it[2]).performClick()
            // verify brand & color
            waitForNode(it[1])
            waitForNode(it[3])
        }
    }
}
