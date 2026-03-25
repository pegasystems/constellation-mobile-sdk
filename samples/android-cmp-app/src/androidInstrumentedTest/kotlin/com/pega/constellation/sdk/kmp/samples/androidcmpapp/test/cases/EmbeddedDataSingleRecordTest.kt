package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ComposeUiTest
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performScrollTo
import androidx.compose.ui.test.performTextInput
import androidx.compose.ui.test.runComposeUiTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.find
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.onAllDescendantsOf
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import java.time.LocalDateTime
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class EmbeddedDataSingleRecordTest : ComposeTest(PegaVersion.v25_1) {

    @Test
    fun test_embedded_data_single_record() = runComposeUiTest {
        setupApp("OFV0MW-Marco-Work-EmbeddedDataTest-SingleRecord")

        onNodeWithText("New Service").performClick()

        // verify form title
        waitForNode("Embedded Data Single Record (", substring = true)

        val carView = "view_[Embedded Data Single Record - Car]"
        onAllDescendantsOf(carView).let {
            it.find("brand").performTextInput("Audi")
            it.find("model").performTextInput("A5")
            it.find("year").performScrollTo().performClick()
            onNodeWithText("Today, ", substring = true).performClick()
            onNodeWithText("OK").performClick()
            it.find("price").performTextInput("123000")
        }
        // remove focus to propagate data
        onNodeWithText("Embedded Data Single Record - Car").performClick()

        val expectedDate = LocalDateTime.now().toString().substring(0, 10)

        // Check if the same values appears inside inputs in view "Embedded Data - Car single fields"
        val singleFieldsView = "group_[Embedded Data - Car single fields]"
        checkCarDetails(singleFieldsView, expectedDate)

        // Check if the same values appears inside "Embedded Data - Car Details"
        val carDetailsView = "view_[Embedded Data - Car Details]"
        checkCarDetails(carDetailsView, expectedDate)
    }

    private fun ComposeUiTest.checkCarDetails(viewName: String, expectedDate: String) {
        onAllDescendantsOf(viewName).let {
            it.find("Audi").assertExists()
            it.find("A5").assertExists()
            it.find(expectedDate).assertExists()
            it.find("123000").assertExists()
        }
    }
}
