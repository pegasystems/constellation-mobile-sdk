package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.SemanticsProperties
import androidx.compose.ui.test.ComposeUiTest
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.SemanticsMatcher.Companion.expectValue
import androidx.compose.ui.test.assertCountEquals
import androidx.compose.ui.test.assertIsNotEnabled
import androidx.compose.ui.test.assertIsNotSelected
import androidx.compose.ui.test.assertIsSelected
import androidx.compose.ui.test.hasAnyDescendant
import androidx.compose.ui.test.hasContentDescription
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performScrollTo
import androidx.compose.ui.test.waitUntilNodeCount
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.runAndroidTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalTestApi::class)
class DataReferenceCardsTest : ComposeTest() {
    private val cars = listOf(
        "A4" to "Audi",
        "Focus" to "Ford",
        "Panda" to "Fiat",
        "Octavia" to "Skoda"
    )

    @Test
    fun test_multiselect_card_content_and_visible_required_disabled() = runAndroidTest {
        setupApp(
            "OI1OYV-Marco2-Work-DataReferenceListOfRecordsCards",
            pegaVersion = PegaVersion.v25_1
        )

        onNodeWithText("New Service").performClick()
        waitForNode("Verify Card Content and Visible Required Disabled", substring = true)
        waitForNode("CarsDataReferenceList")
        verifyCards(cars)
        cars.forEach { (model, _) ->
            onNode(hasContentDescription("$model Image description")).assertDoesNotExist()
        }

        onNodeWithText("invisible").performClick()
        onNodeWithText("CarsDataReferenceList").assertDoesNotExist()
        onAllNodes(cardMatcher).assertCountEquals(0)

        onNodeWithText("disabled").performClick()
        verifyCardCount(4)
        verifyCards(cars)
        with(onAllNodes(cardMatcher)) {
            (0..3).forEach {
                this[it].assertIsNotEnabled()
            }
        }

        onNodeWithText("required").performClick()
        waitForNode("*", substring = true)
        onNodeWithText("Next").performClick()
        waitForNode("Cannot be blank")

        listOf("A4", "Panda", "Focus").forEach { card(it).performScrollTo().performClick() }
        listOf("A4", "Panda", "Focus").forEach { card(it).assertIsSelected() }
        card("Panda").performClick()
        listOf("A4", "Focus").forEach { card(it).assertIsSelected() }
    }

    @Test
    fun test_multiselect_data_page_parameter_change() = runAndroidTest {
        setupApp(
            "OI1OYV-Marco2-Work-DataReferenceListOfRecordsCards",
            pegaVersion = PegaVersion.v25_1
        )

        onNodeWithText("New Service").performClick()
        waitForNode("Verify Card Content and Visible Required Disabled", substring = true)
        onNodeWithText("Next").performClick()

        waitForNode("Verify DataPage Param Change", substring = true)
        card("A4").assertIsSelected()
        card("Focus").assertIsSelected()

        onNodeWithText("Ford").performClick()
        verifyCards(listOf("Focus" to "Ford"))
        onNodeWithText("Fiat").performClick()
        verifyCards(listOf("Panda" to "Fiat"))
    }

    @Test
    fun test_multiselect_hide_field_labels_and_image_and_readonly_display_only_modes() = runAndroidTest {
        setupApp(
            "OI1OYV-Marco2-Work-DataReferenceListOfRecordsCards",
            pegaVersion = PegaVersion.v25_1
        )

        onNodeWithText("New Service").performClick()
        waitForNode("Verify Card Content and Visible Required Disabled", substring = true)
        onNodeWithText("Next").performClick()
        waitForNode("Verify DataPage Param Change", substring = true)
        onNodeWithText("Next").performClick()

        waitForNode("Verify Hide field labels and image", substring = true)
        verifyCardCount(4)
        cars.forEach { (model, _) ->
            onNodeWithTag(
                "selectable_card_image_$model Image description",
                useUnmergedTree = true
            ).assertExists()
        }

        onNodeWithText("Next").performClick()
        waitForNode("Verify Readonly mode", substring = true)
        verifyCards(listOf("A4" to "Audi", "Panda" to "Fiat"))
        onNodeWithText("Submit").performClick()
        assertEquals(
            """{"content":{},"pageInstructions":[]}""",
            waitForRequestBody("/actions/VerifyReadonlyMode")
        )
        waitForNode("Display-only cards", substring = true)
        waitForNode("CarsDataReferenceList")
        waitForNode("Panda")
        waitForNode("A4")
    }

    @Test
    fun test_single_select_card_content_and_visible_required_disabled() = runAndroidTest {
        setupApp(
            "OI1OYV-Marco2-Work-DataReferenceSingleRecordCards",
            pegaVersion = PegaVersion.v25_1
        )

        onNodeWithText("New Service").performClick()
        waitForNode("Verify Card Content and Visible Required Disabled", substring = true)
        waitForNode("CarsDataReferenceSingle")
        verifySingleSelectCards(cars)

        onNodeWithText("invisible").performClick()
        onNodeWithText("CarsDataReferenceSingle").assertDoesNotExist()
        onAllNodes(singleSelectCardMatcher).assertCountEquals(0)

        onNodeWithText("disabled").performClick()
        verifySingleSelectCardCount(4)
        verifySingleSelectCards(cars)
        with(onAllNodes(singleSelectCardMatcher)) {
            (0..3).forEach { this[it].assertIsNotEnabled() }
        }

        onNodeWithText("required").performClick()
        waitForNode("*", substring = true)
        onNodeWithText("Next").performClick()
        waitForNode("Cannot be blank")

        singleSelectCard("A4").performClick()
        singleSelectCard("A4").assertIsSelected()
        singleSelectCard("A4").performClick()
        singleSelectCard("A4").assertIsSelected()
        singleSelectCard("Focus").performClick()
        singleSelectCard("Focus").assertIsSelected()
        singleSelectCard("A4").assertIsNotSelected()
    }

    @Test
    fun test_single_select_data_page_parameter_change() = runAndroidTest {
        setupApp(
            "OI1OYV-Marco2-Work-DataReferenceSingleRecordCards",
            pegaVersion = PegaVersion.v25_1
        )

        onNodeWithText("New Service").performClick()
        waitForNode("Verify Card Content and Visible Required Disabled", substring = true)
        onNodeWithText("Next").performClick()

        waitForNode("Verify DataPage Param Change", substring = true)
        singleSelectCard("Focus").assertIsSelected()

        onNodeWithText("Ford").performClick()
        verifySingleSelectCards(listOf("Focus" to "Ford"))
        onNodeWithText("Fiat").performClick()
        verifySingleSelectCards(listOf("Panda" to "Fiat"))
    }

    private fun ComposeUiTest.verifyCards(expectedCars: List<Pair<String, String>>) {
        verifyCardCount(expectedCars.size)
        expectedCars.forEach { (model, brand) ->
            waitForNode(model)
            waitForNode("brand: $brand")
            waitForNode("model: $model")
        }
    }

    private fun ComposeUiTest.verifyCardCount(count: Int) {
        waitUntilNodeCount(cardMatcher, count)
    }

    private fun ComposeUiTest.verifySingleSelectCards(expectedCars: List<Pair<String, String>>) {
        verifySingleSelectCardCount(expectedCars.size)
        expectedCars.forEach { (model, brand) ->
            waitForNode(model)
            waitForNode("brand: $brand")
            waitForNode("model: $model")
        }
    }

    private fun ComposeUiTest.verifySingleSelectCardCount(count: Int) {
        waitUntilNodeCount(singleSelectCardMatcher, count)
    }

    private fun ComposeUiTest.card(model: String) =
        onNode(cardMatcher and hasAnyDescendant(hasText(model)), useUnmergedTree = true)

    private fun ComposeUiTest.singleSelectCard(model: String) =
        onNode(singleSelectCardMatcher and hasAnyDescendant(hasText(model)), useUnmergedTree = true)

    private companion object {
        val cardMatcher = expectValue(SemanticsProperties.Role, Role.Checkbox)
        val singleSelectCardMatcher =
            expectValue(SemanticsProperties.Role, Role.RadioButton) and
                    expectValue(SemanticsProperties.IsContainer, true)
    }

}
