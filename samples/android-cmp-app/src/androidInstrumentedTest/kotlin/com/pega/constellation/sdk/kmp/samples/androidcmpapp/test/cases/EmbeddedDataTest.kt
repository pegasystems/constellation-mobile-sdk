package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ComposeUiTest
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.SemanticsMatcher
import androidx.compose.ui.test.SemanticsNodeInteractionCollection
import androidx.compose.ui.test.filter
import androidx.compose.ui.test.hasAnyAncestor
import androidx.compose.ui.test.hasClickAction
import androidx.compose.ui.test.hasContentDescription
import androidx.compose.ui.test.hasSetTextAction
import androidx.compose.ui.test.hasTestTag
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.onFirst
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.onSiblings
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performScrollTo
import androidx.compose.ui.test.performTextInput
import androidx.compose.ui.test.performTextReplacement
import androidx.compose.ui.test.runComposeUiTest
import androidx.compose.ui.test.waitUntilAtLeastOneExists
import androidx.compose.ui.test.waitUntilDoesNotExist
import androidx.compose.ui.test.waitUntilExactlyOneExists
import androidx.compose.ui.test.waitUntilNodeCount
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNodes
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import java.time.LocalDateTime
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class EmbeddedDataTest : ComposeTest(PegaVersion.v24_2_2) {

    @Test
    fun test_embedded_data_repeating_view() = runComposeUiTest {
        setupApp("O40M3A-MarekCo-Work-EmbeddedDataTest-RepeatingViewEditable")

        // create case
        onNodeWithText("New Service").performClick()

        // verify form title and instruction
        waitForNode("ED repeating view editable (", substring = true)
        waitForNode("ED repeating view editable & readonly instruction")

        // verify repeating views presence
        waitForNode("Cars repeating view editable")
        waitForNode("Cars repeating view readonly")

        // remove and verify empty list
        waitUntilExactlyOneExists(hasContentDescription("Delete item 1"))
        onNodeWithContentDescription("Delete item 1").performClick()
        waitForNodes("No items", count = 2)
        waitUntilNodeCount(hasContentDescription("No items icon"), count = 2)
        onNodeWithText("Add", substring = true).performClick()

        // verify error banner
        onNodeWithText("Next").performClick()
        waitForNode("brand: Cannot be blank", substring = true)

        // enter data in row 1 and verify
        val carsEditableFieldGroup = "field_group_template_[Cars repeating view editable]"
        allDescendantsOf(carsEditableFieldGroup).let {
            it.findFirstWithText("brand").performTextInput("Audi")
            it.findFirstWithText("model").performTextInput("A5")
            it.findFirstWithText("Price").performTextInput("123000")
            it.findFirstWithText("IsFirstOwner").onSiblings().onFirst().performClick()
            it.findFirstWithText("interior").performScrollTo().performClick()
            onNodeWithText("comfort").performClick()
            it.findFirstWithText("Insurance").performScrollTo().performClick()
            onNodeWithText("gold").performClick()
            it.findFirstWithText("client meeting date").performScrollTo().performClick()
            onNodeWithText("Today, ", substring = true).performClick()
            onNodeWithText("OK").performClick()
            it.findFirstWithText("Client meeting time").performScrollTo().performClick()
            onNodeWithText("OK").performClick()
            it.findFirstWithText("Transaction date time").performScrollTo().performScrollTo()
                .performClick()
            onNodeWithText("Today, ", substring = true).performClick()
            onNodeWithText("OK").performClick()
            onNodeWithText("OK").performClick()
            it.findFirstWithText("Notes").performScrollTo().performTextInput("This is a note")
            // remove focus to propagate data
            onNodeWithText("Cars repeating view readonly").performScrollTo().performClick()

            // verify editable data
            verifyFieldGroupItem(
                nodes = it,
                expectedDate = LocalDateTime.now().toString().substring(0, 10),
                isEditable = true
            )
        }
        // verify if row 1 data propagated to readonly duplicated view
        val carsReadonlyFieldGroup = "field_group_template_[Cars repeating view readonly]"
        verifyFieldGroupItem(
            nodes = allDescendantsOf(carsReadonlyFieldGroup),
            expectedDate = LocalDateTime.now().toString().substring(0, 10),
            isEditable = false
        )

        // adding row 2
        onNodeWithText("Add", substring = true).performScrollTo().performClick()
        // enter data in row 2
        waitForNodes("cars 2", count = 2)
        allDescendantsOf(carsEditableFieldGroup).let { nodes ->
            nodes.filterDescendantsOf("field_group_item_2").let {
                it.findFirstWithText("brand").performTextInput("Ford")
                nodes.findFirstWithText("cars 2").performClick() // remove focus to propagate data
                it.findFirstWithText("Ford").assertExists()
            }
        }
        // verify data in row 2 propagated to duplicated
        allDescendantsOf(carsReadonlyFieldGroup).filterDescendantsOf("field_group_item_2").let {
            waitUntilAtLeastOneExists(it, hasText("Ford"), timeoutMillis = 5000L)
        }

        // 2nd step
        onNodeWithText("Next").performClick()
        waitForNode("ED repeating view readonly", substring = true)

        // verify row 1 on second step
        verifyFieldGroupItem(
            allDescendantsOf(carsReadonlyFieldGroup),
            expectedDate = "2025-12-16",
            isEditable = false
        )
    }

    @Test
    fun test_embedded_data_table_simple_table() = runComposeUiTest {
        setupApp("O40M3A-MarekCo-Work-EmbeddedDataTest-EditableTable")

        val columnValues = mutableMapOf(
            "brand" to "Ford",
            "model" to "Focus",
            "Price" to "123456",
            "IsFirstOwner" to "Yes",
            "interior" to "comfort",
            "Insurance" to "gold",
            "client meeting date" to "2026-01-08",
            "Client meeting time" to "12:00 AM",
            "Transaction date time" to "2026-01-08 12:00 AM",
            "Notes" to "This is a note"
        )
        val edContext = "caseInfo.content.EmbeddedDataListOfRecords"

        // create case
        onNodeWithText("New Service").performClick()

        // Step 1 - editable table
        // verify form title
        waitForNode("ED table editable", substring = true)
        // verify table title
        waitForNode("Cars editable table")
        // verify columns
        columnValues.keys.forEach {
            waitForNodes(it.uppercase(), count = 2)
        } // despite there is only one table with column names, test sees two of them

        // verify add and delete records
        onNodeWithText("+ Add cars").performClick()
        waitUntilAtLeastOneExists(hasContentDescription("Delete item 1"))
        waitUntilAtLeastOneExists(hasContentDescription("Reorder item 1"))
        onAllNodes(hasContentDescription("Delete item 1")).onFirst().performClick()
        waitUntilDoesNotExist(hasContentDescription("Delete item 1"))
        waitUntilDoesNotExist(hasContentDescription("Reorder item 1"))
        // verify adding record with data
        onNodeWithText("+ Add cars").performClick()
        performTextInput("$edContext[0].Brand", "Ford")
        performTextInput("$edContext[0].Model", "Focus")
        performTextInput("$edContext[0].Price", "123456")
        performClick("$edContext[0].IsFirstOwner")
        performClick("$edContext[0].Interior")
        onNodeWithText("comfort").performClick()
        performClick("$edContext[0].Insurance")
        onNodeWithText("gold").performClick()
        performClick("$edContext[0].ClientMeetingDate")
        onNodeWithText("Today, ", substring = true).performClick()
        onNodeWithText("OK").performClick()
        performClick("$edContext[0].ClientMeetingTime")
        onNodeWithText("OK").performClick()
        performClick("$edContext[0].TransactionDateTime")
        onNodeWithText("Today, ", substring = true).performClick()
        onNodeWithText("OK").performClick()
        onNodeWithText("OK").performClick()
        performTextInput("$edContext[0].Notes", "This is a note")

        // Step 2 - editable table with popup
        waitForNode("Next")
        onNodeWithText("Next").performClick()
        // verify form title
        waitForNode("ED table editable popup", substring = true)
        // verify table title
        waitForNode("Cars editable table with popup")
        // verify columns
        columnValues.keys.forEach { waitForNodes(it.uppercase(), count = 2) } // despite there is only one table with column names, test sees two of them
        // verify table data
        columnValues.values.forEach { waitForNodes(it, count = 2) }
        // verify reorder icon exists
        waitUntilAtLeastOneExists(hasContentDescription("Reorder item 1"))
        // verify edit record popup
        onAllNodes(hasContentDescription("Edit item 1")).onFirst().performScrollTo().performClick()
        waitForNode("Edit Record")

        allDescendantsOf("ModalViewContainer").let { nodes ->
            columnValues.forEach {
                nodes.findFirstWithText(it.key).assertExists()
                if (it.key != "IsFirstOwner") { // not able to check checkbox state
                    nodes.findFirstWithText(it.value).assertExists()
                }
            }
            nodes.findFirstWithText("model").performTextReplacement("Fiesta")
            nodes.findFirstWithText("Submit").performScrollTo().performClick()
        }
        waitUntilDoesNotExist(hasText("Edit Record"), timeoutMillis = 3000)
        // verify updated record in table
        waitForNodes("Fiesta", count = 2)

        // adding new record via popup
        onNodeWithText("+ Add cars").performScrollTo().performClick()
        waitForNode("Add Record")
        allDescendantsOf("ModalViewContainer").let { nodes ->
            nodes.findFirstWithText("Submit").performScrollTo().performClick()
            waitUntilAtLeastOneExists(nodes, hasText("brand: Cannot be blank"))

            nodes.findFirstWithText("brand").performTextReplacement("Opel")
            nodes.findFirstWithText("model").performTextReplacement("Astra")
            nodes.findFirstWithText("Submit").performScrollTo().performClick()
        }
        waitUntilDoesNotExist(hasText("Add Record"))
        // verify new record in table
        waitForNodes("Opel", count = 2)
        waitForNodes("Astra", count = 2)

        // Step 3 - readonly simple table
        onNodeWithText("Next").performClick()
        // verify form title
        waitForNode("ED simple table readonly", substring = true)
        // verify table title
        waitForNode("Cars readonly simple table")
        verifyReadonlyTable(columnValues)

        // Step 4 - readonly table
        onNodeWithText("Next").performClick()
        // verify form title
        waitForNode("ED table readonly", substring = true)
        // verify table title
        waitForNode("Cars readonly table")
        verifyReadonlyTable(columnValues)
    }

    @Test
    fun test_embedded_data_add_edit_remove_conditions() = runComposeUiTest {
        // Step 1 - Editable table
        setupApp("O40M3A-MarekCo-Work-EmbeddedDataTest-Conditions")
        // create case
        onNodeWithText("New Service").performClick()
        // verify form title
        waitForNode("ED table editable conditions", substring = true)
        // verify table title
        waitForNode("Cars editable table")

        waitForNode("+ Add cars")
        onNodeWithText("+ Add cars").performClick()
        // verify add/edit/remove/reorder
        waitForNode("+ Add cars")
        val edContext = "caseInfo.content.EmbeddedDataListOfRecords"
        performTextInput("$edContext[0].Brand", "Ford")
        waitUntilAtLeastOneExists(hasContentDescription("Delete item 1"))
        waitUntilAtLeastOneExists(hasContentDescription("Reorder item 1"))

        onNodeWithText("disable add/edit/remove/reorder").onSiblings().onFirst().performClick()

        waitUntilDoesNotExist(hasText("+ Add cars"))
        waitUntilDoesNotExist(hasSetTextAction())
        waitUntilDoesNotExist(hasContentDescription("Delete item 1"))
        waitUntilDoesNotExist(hasContentDescription("Reorder item 1"))

        onNodeWithText("disable add/edit/remove/reorder").onSiblings().onFirst().performClick()

        // Step 2 - Editable popup table
        onNodeWithText("Next").performClick()
        // verify form title
        waitForNode("ED table editable popup conditions", substring = true)
        // verify table title
        waitForNode("Cars editable table with popup", substring = true)
        // verify add/edit/remove/reorder
        waitForNode("+ Add cars")
        waitUntilAtLeastOneExists(hasContentDescription("Edit item 1"))
        waitUntilAtLeastOneExists(hasContentDescription("Delete item 1"))
        waitUntilAtLeastOneExists(hasContentDescription("Reorder item 1"))

        onNodeWithText("disable add/edit/remove/reorder").onSiblings().onFirst().performClick()

        waitUntilDoesNotExist(hasText("+ Add cars"))
        waitUntilDoesNotExist(hasContentDescription("Edit item 1"))
        waitUntilDoesNotExist(hasContentDescription("Delete item 1"))
        waitUntilDoesNotExist(hasContentDescription("Reorder item 1"))
    }

    private fun ComposeUiTest.verifyFieldGroupItem(
        nodes: SemanticsNodeInteractionCollection,
        expectedDate: String,
        isEditable: Boolean
    ) {
        with(nodes) {
            findFirstWithText("Audi").assertExists()
            findFirstWithText("A5").assertExists()
            findFirstWithText("123000").assertExists()
            if (!isEditable) {
                findFirstWithText("Yes").assertExists()
            }
            findFirstWithText("comfort").assertExists()
            findFirstWithText("gold").assertExists()
            findFirstWithText(expectedDate).assertExists()
            findFirstWithText("12:00 AM").assertExists()
            findFirstWithText("$expectedDate 12:00 AM").assertExists()
            findFirstWithText("Notes").performScrollTo()
            waitUntilAtLeastOneExists(nodes, hasText("This is a note"), timeoutMillis = 5000L)
        }
    }

    private fun ComposeUiTest.verifyReadonlyTable(columnValues: MutableMap<String, String>) {
        // verify columns
        columnValues.keys.forEach { waitForNodes(it.uppercase(), count = 2) }
        // verify table data
        columnValues["model"] = "Fiesta" // updated model name
        columnValues.values.forEach {
            waitForNodes(it, count = 2)
        }
        waitForNodes("Opel", count = 2)
        waitForNodes("Astra", count = 2)
        // verify absence of add/edit/delete actions
        waitUntilDoesNotExist(hasText("+ Add cars"))
        waitUntilDoesNotExist(hasContentDescription("Edit item 1"))
        waitUntilDoesNotExist(hasContentDescription("Delete item 1"))
        waitUntilDoesNotExist(hasContentDescription("Reorder item 1"))
    }

    private fun ComposeUiTest.performTextInput(testTag: String, inputText: String) {
        waitUntilAtLeastOneExists(hasTestTag(testTag))
        onAllNodes(hasAnyAncestor(hasTestTag(testTag)))
            .filter(hasSetTextAction())
            .onFirst().performTextInput(inputText)
    }

    private fun ComposeUiTest.performClick(testTag: String) {
        waitUntilAtLeastOneExists(hasTestTag(testTag))
        onAllNodes(hasAnyAncestor(hasTestTag(testTag)))
            .filter(hasClickAction())
            .onFirst().performScrollTo().performClick()
    }

    private fun SemanticsNodeInteractionCollection.findFirstWithText(text: String) =
        this.filter(hasText(text)).onFirst()

    private fun ComposeUiTest.waitUntilAtLeastOneExists(
        nodes: SemanticsNodeInteractionCollection,
        matcher: SemanticsMatcher,
        timeoutMillis: Long = 5000L
    ) {
        waitUntil("exactly 1 nodes match (${matcher.description})", timeoutMillis) {
            nodes.filter(matcher).fetchSemanticsNodes().size == 1
        }
    }

    private fun ComposeUiTest.allDescendantsOf(testTag: String) =
        onAllNodes(hasAnyAncestor(hasTestTag(testTag)))

    private fun SemanticsNodeInteractionCollection.filterDescendantsOf(testTag: String) =
        filter(hasAnyAncestor(hasTestTag(testTag)))
}
