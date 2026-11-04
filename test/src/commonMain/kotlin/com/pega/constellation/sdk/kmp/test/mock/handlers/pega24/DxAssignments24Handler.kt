package com.pega.constellation.sdk.kmp.test.mock.handlers.pega24

import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import com.pega.constellation.sdk.kmp.test.mock.handlers.VersionedDxAssignmentsHandler
import com.pega.constellation.sdk.kmp.test.mock.handlers.getContentPageKey
import com.pega.constellation.sdk.kmp.test.mock.handlers.getPageInstructions

internal class DxAssignments24Handler(private val pegaVersion: PegaVersion) :
    VersionedDxAssignmentsHandler(pegaVersion) {

    override fun openAssignment(assignmentId: String): MockResponse? {
        if (pegaVersion != PegaVersion.v24_1_0) return null
        return when {
            assignmentId.contains("K-11018") -> asset("assignments/KeysAndCiphers-OpenAssignment-11018.json")
            assignmentId.contains("K-11019") -> asset("assignments/KeysAndCiphers-OpenAssignment-11019.json")
            else -> null
        }
    }

    override fun handleAction(
        request: MockRequest,
        assignmentId: String,
        actionId: String
    ): MockResponse? = when (pegaVersion) {
        PegaVersion.v24_1_0 -> when {
            assignmentId.contains("D-2036") -> handleDataReferenceTest(request, actionId)
            assignmentId.contains("D-1014611") -> handleInvisibleDataReferenceTest(actionId)
            else -> null
        }

        PegaVersion.v24_2_2 -> when {
            assignmentId.contains("K-10048") -> handleKeysAndCiphers(request, actionId)
            assignmentId.contains("G-3025") -> handleGroupTest(actionId)
            assignmentId.contains("E-22056") -> handleEmbeddedDataRepeatingViewTest(actionId)
            assignmentId.contains("E-24003") -> handleEmbeddedDataTableSimpleTableTest(request, actionId)
            assignmentId.contains("E-26028") -> handleEmbeddedDataConditionsTest(actionId)
            else -> null
        }

        else -> null
    }

    private fun handleDataReferenceTest(request: MockRequest, actionId: String): MockResponse {
        val carId = request.getContentPageKey("CarsDataReferenceSingle", "Id")
            ?: return Error(400, "Missing request body")
        return when (actionId) {
            "SingleDisplayAsTable" -> asset("assignments/DataReferenceTest-1-Review.json")
            "Create/refresh" -> asset("assignments/refresh/DataReferenceTest-Refresh-$carId.json")
            else -> Error(404, "Invalid actionId: $actionId")
        }
    }

    private fun handleInvisibleDataReferenceTest(actionId: String): MockResponse = when (actionId) {
        "Create" -> asset("assignments/InvisibleDataReferenceTest-1-Visible.json")
        else -> Error(404, "Invalid actionId: $actionId")
    }

    private fun handleEmbeddedDataRepeatingViewTest(actionId: String): MockResponse = when (actionId) {
        "EDRepeatingViewEditable" -> asset("assignments/EmbeddedDataTest-1-RepeatingViewReadonly.json")
        else -> Error(404, "Invalid actionId: $actionId")
    }

    private fun handleEmbeddedDataTableSimpleTableTest(
        request: MockRequest,
        actionId: String
    ): MockResponse = when (actionId) {
        "EmbeddedDataDisplayAsRepeatingViewEdit" -> asset("assignments/EmbeddedDataTest-EditableTablePopup.json")
        "EDTableEditablePopup/refresh" -> {
            val pageInstructions = request.getPageInstructions()
                ?: return Error(400, "Missing request body or pageInstructions")
            when (pageInstructions.size) {
                2 -> asset("assignments/refresh/EmbeddedDataTest-EditableTable-Popup-Refresh-1.json")
                4 -> asset("assignments/refresh/EmbeddedDataTest-EditableTable-Popup-Refresh-2.json")
                else -> Error(
                    404,
                    "No data for given pageInstructions size: ${pageInstructions.size} for actionId: $actionId"
                )
            }
        }

        "EDTableEditablePopup" -> asset("assignments/EmbeddedDataTest-ReadonlySimpleTable.json")
        "EDSimpleTableReadonly" -> asset("assignments/EmbeddedDataTest-ReadonlyTable.json")
        else -> Error(404, "Invalid actionId: $actionId")
    }

    private fun handleEmbeddedDataConditionsTest(actionId: String): MockResponse = when (actionId) {
        "EDCheckAddeditremoveConditions" -> asset("assignments/EmbeddedDataTest-Conditions.json")
        else -> Error(404, "Invalid actionId: $actionId")
    }

    private fun handleGroupTest(actionId: String): MockResponse = when (actionId) {
        "Create" -> asset("assignments/GroupTest-1-Create.json")
        "Step2/refresh" -> asset("assignments/refresh/GroupTest-Step2-Refresh-1.json")
        else -> Error(404, "Invalid actionId: $actionId")
    }

    private fun handleKeysAndCiphers(request: MockRequest, actionId: String): MockResponse =
        when (actionId) {
            "SimpleTable" -> asset("assignments/KeysCiphers-Table.json")
            "Table" -> asset("assignments/KeysCiphers-Dropdown.json")
            "Dropdown/refresh" -> request.getContentPageKey("KeySelector", "Identifier")?.let {
                asset("assignments/KeysCiphers-Dropdown-Refresh-$it.json")
            } ?: Error(400, "Missing request body")

            else -> Error(404, "Invalid actionId for K-10048: $actionId")
        }
}
