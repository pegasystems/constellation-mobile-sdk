package com.pega.constellation.sdk.kmp.test.mock.handlers

import com.pega.constellation.sdk.kmp.test.mock.MockHandler
import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Asset
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class DxAssignmentsHandler : MockHandler {
    private val regex = Regex(".*/assignments/(.*)/actions/([^?]+)")

    override fun canHandle(request: MockRequest) = request.isDxApi("assignments")

    override fun handle(request: MockRequest): MockResponse {
        // we should check path
        val match = regex.find(request.url) ?: return Error(400, "Invalid request")
        val assignmentId = match.groupValues[1]
        val actionId = match.groupValues[2]

        return when {
            assignmentId.contains("S-17098") && actionId == "Create" -> Asset("responses/dx/assignments/SDKTesting-1-Create.json")
            assignmentId.contains("E-6026") && actionId == "Create" -> Asset("responses/dx/assignments/EmbeddedData-1-Create.json")
            assignmentId.contains("N-16042") -> handleNewService(actionId)
            assignmentId.contains("D-2036") -> handleDataReferenceTest(request, actionId)
            assignmentId.contains("K-10048") -> handleKeysAndCiphers(request, actionId)

            else -> Error(501, "Cannot handle assignment: $assignmentId, action: $actionId")
        }
    }

    private fun handleDataReferenceTest(request: MockRequest, actionId: String): MockResponse {
        val carId = request.getContentPageKey("CarsDataReferenceSingle", "Id") ?: return Error(400, "Missing request body")

        return when (actionId) {
            "SingleDisplayAsTable" -> Asset("responses/dx/assignments/DataReferenceTest-1-Review.json")
            "Create/refresh" -> Asset("responses/dx/assignments/refresh/DataReferenceTest-Refresh-$carId.json")
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
    Json.parseToJsonElement(it)
        .jsonObject
        .getValue("content")
        .jsonObject
        .getValue(page)
        .jsonObject
        .getValue(key)
        .jsonPrimitive
        .int
}