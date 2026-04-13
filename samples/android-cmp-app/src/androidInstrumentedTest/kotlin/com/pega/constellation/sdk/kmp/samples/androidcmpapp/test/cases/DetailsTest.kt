package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ComposeUiTest
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.runComposeUiTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.find
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.onAllDescendantsOf
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import org.junit.Test

@OptIn(ExperimentalTestApi::class)
class DetailsTest : ComposeTest(PegaVersion.v25_1) {

    private val expectedFields = mapOf(
        "name" to "John",
        "date of birth" to "1987-04-01",
        "is adult" to "No",
        "salary" to "$ 12345",
        "Working start time" to "02:30 AM",
        "meeting date time" to "2026-04-14 02:00 PM",
        "phone" to "+48521521521",
        "Description" to "Some description\nabout this person",
        "Rich description" to "Somedescription1. about2. this3. person", // rich text has new lines, but they are not visible for test
    )

    @Test
    fun test_details_template() = runComposeUiTest {
        setupApp(caseClassName = "OI1OYV-Marco2-Work-DetailsTemplateTest")

        onNodeWithText("New Service").performClick()
        waitForNode("Details template", substring = true)
        waitForNode("Details")

        verifyExpectedFields("details_highlightedFields")
        verifyExpectedFields("details_children")
    }

    private fun ComposeUiTest.verifyExpectedFields(testTag: String) {
        onAllDescendantsOf(testTag).let { nodes ->
            expectedFields.forEach { (label, value) ->
                nodes.find(label).assertExists()
                nodes.find(value).assertExists()
            }
        }
    }
}
