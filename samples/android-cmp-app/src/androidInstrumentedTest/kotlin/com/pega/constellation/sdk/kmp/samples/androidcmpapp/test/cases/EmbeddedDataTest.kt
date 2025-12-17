package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ComposeUiTest
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.SemanticsMatcher
import androidx.compose.ui.test.SemanticsNodeInteractionCollection
import androidx.compose.ui.test.filter
import androidx.compose.ui.test.hasAnyAncestor
import androidx.compose.ui.test.hasContentDescription
import androidx.compose.ui.test.hasTestTag
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.onFirst
import androidx.compose.ui.test.onNodeWithContentDescription
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.onSiblings
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performScrollTo
import androidx.compose.ui.test.performTextInput
import androidx.compose.ui.test.runComposeUiTest
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
        setupApp("O40M3A-MarekCo-Work-EmbeddedDataTest")

        // create case
        onNodeWithText("New Service").performClick()

        // verify form title and instruction
        waitForNode("ED repeating view editable (", substring = true)
        waitForNode("ED repeating view editable & readonly instruction")

        // verify repeating views presence
        waitForNode("Cars repeating view editable")
        waitForNode("Cars repeating view readonly")

        // remove and verify empty list
        onNodeWithContentDescription("Delete item 1").performClick()
        waitForNodes("No items", count = 2)
        waitUntilNodeCount(hasContentDescription("No items"), count = 2)
        onNodeWithText("Add", substring = true).performClick()

        // verify error banner
        onNodeWithText("Next").performClick()
        waitForNode("brand: Cannot be blank", substring = true)

        // enter data in row 1 and verify
        onAllNodes(hasAnyAncestor(hasTestTag("field_group_template_[Cars repeating view editable]"))).let {
            it.findFirstWithText("brand").performTextInput("Audi")
            it.findFirstWithText("model").performTextInput("A5")
            it.findFirstWithText("Price").performTextInput("123000")
            it.findFirstWithText("IsFirstOwner").onSiblings().onFirst().performClick()
            it.findFirstWithText("interior").performClick()
            onNodeWithText("comfort").performClick()
            it.findFirstWithText("Insurance").performClick()
            onNodeWithText("gold").performClick()
            it.findFirstWithText("client meeting date").performClick()
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
            verifyEmbeddedDataRecord(
                nodes = it,
                expectedDate = LocalDateTime.now().toString().substring(0, 10),
                isEditable = true
            )
        }
        // verify if row 1 data propagated to readonly duplicated view
        onAllNodes(hasAnyAncestor(hasTestTag("field_group_template_[Cars repeating view readonly]"))).let {
            verifyEmbeddedDataRecord(
                nodes = it,
                expectedDate = LocalDateTime.now().toString().substring(0, 10),
                isEditable = false
            )
        }

        // adding row 2
        onNodeWithText("Add", substring = true).performClick()

        // enter data in row 2
        waitForNodes("cars 2", count = 2)
        onAllNodes(hasAnyAncestor(hasTestTag("field_group_template_[Cars repeating view editable]"))).let { nodes ->
            nodes.filter(hasAnyAncestor(hasTestTag("field_group_item_2"))).let {
                it.findFirstWithText("brand").performTextInput("Ford")
                nodes.findFirstWithText("cars 2").performClick() // remove focus to propagate data
                it.findFirstWithText("Ford").assertExists()
            }
        }
        // verify data in row 2 propagated to duplicated
        onAllNodes(hasAnyAncestor(hasTestTag("field_group_template_[Cars repeating view readonly]"))).let { nodes ->
            nodes.filter(hasAnyAncestor(hasTestTag("field_group_item_2"))).let {
                it.findFirstWithText("Ford").assertExists()
            }
        }

        // 2nd step
        onNodeWithText("Next").performClick()
        waitForNode("ED repeating view readonly (", substring = true)

        // verify row 1 on second step
        onAllNodes(hasAnyAncestor(hasTestTag("field_group_template_[Cars repeating view readonly]"))).let {
            verifyEmbeddedDataRecord(it, expectedDate = "2025-12-16", isEditable = false)
        }
    }

    fun ComposeUiTest.verifyEmbeddedDataRecord(
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

    fun SemanticsNodeInteractionCollection.findFirstWithText(text: String) =
        this.filter(hasText(text)).onFirst()

    fun ComposeUiTest.waitUntilAtLeastOneExists(
        nodes: SemanticsNodeInteractionCollection,
        matcher: SemanticsMatcher,
        timeoutMillis: Long = 5000L
    ) {
        waitUntil("exactly 1 nodes match (${matcher.description})", timeoutMillis) {
            nodes.filter(matcher).fetchSemanticsNodes().size == 1
        }
    }
}
