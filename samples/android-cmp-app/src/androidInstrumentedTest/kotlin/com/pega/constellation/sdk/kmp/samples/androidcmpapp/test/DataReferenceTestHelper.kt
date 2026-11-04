package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test

import androidx.compose.ui.test.SemanticsMatcher
import androidx.compose.ui.test.SemanticsNodeInteraction
import androidx.compose.ui.test.assert
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.filter
import androidx.compose.ui.test.hasAnyAncestor
import androidx.compose.ui.test.hasAnyDescendant
import androidx.compose.ui.test.hasClickAction
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.isPopup
import androidx.compose.ui.test.junit4.ComposeContentTestRule
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.onFirst
import androidx.compose.ui.test.performScrollTo

internal class DataReferenceTestHelper(
    private val rule: ComposeContentTestRule,
    private val label: String,
    private val cardMatcher: SemanticsMatcher
) {
    val models = listOf("A4", "C-Class", "3 Series", "Golf", "Camry")
    val bmwRow = listOf(
        "BMW", "3 Series", "78950", "4.85", "2021-07-22", "true", "78500", "22",
        "2026-11-12T14:15:00.000Z", "anna.nowak@autohouse.pl", "+48-22-567-8901",
        "https://www.dealerwarsaw.com", "09:15:48"
    )
    private val columns = listOf(
        "BRAND", "MODEL", "MILEAGE", "LENGTH", "DATE OF PRODUCTION", "DAMAGED", "PRICE", "DISCOUNT",
        "CAR AVAILABILITY", "DEALER EMAIL", "DEALER PHONE", "DEALER WEBSITE", "DEALER WORK DAY START"
    )

    fun dropdownField() = rule.onNode(hasText(label) and hasClickAction())

    fun dropdownOption(model: String) =
        rule.onNode(hasText(model) and hasClickAction() and hasAnyAncestor(isPopup()))

    fun verifyDropdownOptions() {
        models.forEach { dropdownOption(it).assertExists() }
    }

    fun waitForModels() {
        rule.waitUntil(timeoutMillis = 5_000) {
            models.all {
                rule.onAllNodesWithText(it, useUnmergedTree = true).fetchSemanticsNodes().isNotEmpty()
            }
        }
    }

    fun verifyTableColumns() {
        columns.forEach { rule.onAllNodesWithText(it).onFirst().performScrollTo().assertIsDisplayed() }
    }

    fun verifyRowData(model: String, row: SemanticsNodeInteraction, values: List<String>) {
        val selectedRow = row.fetchSemanticsNode()
        val top = selectedRow.positionInRoot.y
        val bottom = top + selectedRow.size.height
        values.forEach { value ->
            rule.onAllNodesWithText(value, useUnmergedTree = true).filter(
                SemanticsMatcher("Cell in the $model row") {
                    (it.positionInRoot.y + it.size.height / 2f) in top..bottom
                }
            ).onFirst().performScrollTo().assertIsDisplayed()
        }
    }

    fun card(model: String) =
        rule.onNode(cardMatcher and hasAnyDescendant(hasText(model)), useUnmergedTree = true)

    fun verifyCardData(model: String, values: List<String>) {
        values.forEach { card(model).assert(hasAnyDescendant(hasText(it))) }
    }
}
