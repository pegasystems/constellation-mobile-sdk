package com.pega.constellation.sdk.kmp.test.mock.handlers

import com.pega.constellation.sdk.kmp.test.mock.MockHandler
import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Asset
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class DxAssignmentsHandler : MockHandler {
    private val regex = Regex(".*/assignments/(.+?)[/?](?:actions/([^?]+))?")

    override fun canHandle(request: MockRequest) = request.isDxApi("assignments")

    override fun handle(request: MockRequest): MockResponse {
        val match = regex.find(request.url) ?: return Error(400, "Invalid request")
        val assignmentId = match.groupValues[1]
        val actionId = match.groupValues[2]

        return when {
            assignmentId.contains("K-11018") && actionId.isEmpty() -> Asset("responses/dx/assignments/KeysAndCiphers-OpenAssignment-11018.json")
            assignmentId.contains("K-11019") && actionId.isEmpty() -> Asset("responses/dx/assignments/KeysAndCiphers-OpenAssignment-11019.json")
            assignmentId.contains("S-17098") && actionId == "Create" -> Asset("responses/dx/assignments/SDKTesting-1-Create.json")
            assignmentId.contains("E-6026") && actionId == "Create" -> Asset("responses/dx/assignments/EmbeddedData-1-Create.json")
            assignmentId.contains("N-16042") -> handleNewService(actionId)
            assignmentId.contains("D-2036") -> handleDataReferenceTest(request, actionId)
            assignmentId.contains("K-10048") -> handleKeysAndCiphers(request, actionId)
            assignmentId.contains("G-3025") -> handleGroupTest(actionId)
            assignmentId.contains("E-22056") -> handleEmbeddedDataRepeatingViewTest(actionId)
            assignmentId.contains("E-24003") -> handleEmbeddedDataTableSimpleTableTest(request, actionId)
            assignmentId.contains("E-26028") -> handleEmbeddedDataConditionsTest(actionId)

            else -> Error(501, "Cannot handle assignment: $assignmentId, action: $actionId")
        }
    }

    private fun handleDataReferenceTest(request: MockRequest, actionId: String): MockResponse {
        val carId = request.getContentPageKey("CarsDataReferenceSingle", "Id")
            ?: return Error(400, "Missing request body")

        return when (actionId) {
            "SingleDisplayAsTable" -> Asset("responses/dx/assignments/DataReferenceTest-1-Review.json")
            "Create/refresh" -> Asset("responses/dx/assignments/refresh/DataReferenceTest-Refresh-$carId.json")
            else -> Error(404, "Invalid actionId: $actionId")
        }
    }

    private fun handleEmbeddedDataRepeatingViewTest(actionId: String): MockResponse {
        return when (actionId) {
            "EDRepeatingViewEditable" -> Asset("responses/dx/assignments/EmbeddedDataTest-1-RepeatingViewReadonly.json")
            else -> Error(404, "Invalid actionId: $actionId")
        }
    }

    private fun handleEmbeddedDataTableSimpleTableTest(request: MockRequest, actionId: String): MockResponse {
        return when (actionId) {
            "EmbeddedDataDisplayAsRepeatingViewEdit" -> Asset("responses/dx/assignments/EmbeddedDataTest-EditableTablePopup.json")
            "EDTableEditablePopup/refresh" -> {
                val body = request.body ?: return Error(400, "Missing request body")
                val bodyJson = Json.parseToJsonElement(body).jsonObject
                val pageInstructions = bodyJson.getValue("pageInstructions").jsonArray
                return when (pageInstructions.size) {
                    2 -> Asset("responses/dx/assignments/refresh/EmbeddedDataTest-EditableTable-Popup-Refresh-1.json")
                    4 -> Asset("responses/dx/assignments/refresh/EmbeddedDataTest-EditableTable-Popup-Refresh-2.json")
                    else -> Error(404, "No data for given pageInstructions size: ${pageInstructions.size} for actionId: $actionId")
                }
            }
            "EDTableEditablePopup" -> Asset("responses/dx/assignments/EmbeddedDataTest-ReadonlySimpleTable.json")
            "EDSimpleTableReadonly" -> Asset("responses/dx/assignments/EmbeddedDataTest-ReadonlyTable.json")
            else -> Error(404, "Invalid actionId: $actionId")
        }
    }

    private fun handleEmbeddedDataConditionsTest(actionId: String): MockResponse {
        return when (actionId) {
            "EDCheckAddeditremoveConditions" -> Asset("responses/dx/assignments/EmbeddedDataTest-Conditions.json")
            else -> Error(404, "Invalid actionId: $actionId")
        }
    }

    private fun handleGroupTest(actionId: String): MockResponse {
        return when (actionId) {
            "Create" -> Asset("responses/dx/assignments/GroupTest-1-Create.json")
            "Step2/refresh" -> Asset("responses/dx/assignments/refresh/GroupTest-Step2-Refresh-1.json")
            else -> Error(404, "Invalid actionId: $actionId")
        }
    }

    private fun handleKeysAndCiphers(request: MockRequest, actionId: String) =
        when (actionId) {
            "SimpleTable" -> Asset("responses/dx/assignments/KeysCiphers-Table.json")
            "Table" -> Asset("responses/dx/assignments/KeysCiphers-Dropdown.json")
            "Dropdown/refresh" -> request.getContentPageKey("KeySelector", "Identifier")?.let {
                Asset("responses/dx/assignments/KeysCiphers-Dropdown-Refresh-$it.json")
            } ?: Error(400, "Missing request body")

            else -> Error(404, "Invalid actionId for K-10048: $actionId")
        }

    private fun handleNewService(actionId: String) = when (actionId) {
        "Customer" -> Asset("responses/dx/assignments/NewService-1-Customer.json")
        "Address" -> Asset("responses/dx/assignments/NewService-2-Address.json")
        "Service" -> Asset("responses/dx/assignments/NewService-3-Service.json")
        "OtherNotes" -> Asset("responses/dx/assignments/NewService-4-OtherNotes.json")
        else -> Error(404, "Invalid actionId: $actionId")
    }
}

private fun MockRequest.getContentPageKey(page: String, key: String) = body?.let {
    Json.parseToJsonElement(it).jsonObject
        .getValue("content").jsonObject
        .getValue(page).jsonObject
        .getValue(key).jsonPrimitive
        .int
}