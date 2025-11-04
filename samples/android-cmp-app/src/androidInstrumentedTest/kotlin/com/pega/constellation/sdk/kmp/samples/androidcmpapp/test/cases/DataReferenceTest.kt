package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.runComposeUiTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTestMode
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNodes
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class DataReferenceTest : ComposeTest(mode = ComposeTestMode.MockServer) {
    private val columns = listOf("Id", "Brand", "Model", "Color", "Owner")
    private val cars = listOf(
        listOf("1", "Toyota", "Corolla", "Silver", "John"),
        listOf("2", "Ford", "Fiesta", "Yellow", "Betty"),
        listOf("3", "Fiat", "126p", "Red", "Andrzej"),
        listOf("4", "Skoda", "Octavia", "Black", "Sebastian"),
        listOf("5", "Audi", "A5", "White", "Jessica"),
    )

    @Test
    fun test_embedded_data() = runComposeUiTest {
        setupApp("O40M3A-MarekCo-Work-DataReferenceTest")

        // create case
        onNodeWithText("New Service").performClick()

        // verify form title
        waitForNode("Single display as Table (D-", substring = true)

        // verify columns
        columns.forEach { waitForNodes(it, count = 2) }

        // verify data
        cars.flatten().forEach { waitForNodes(it, count = 2) }
    }
}
