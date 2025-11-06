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

            else -> Error(501, "Cannot handle assignment: $assignmentId, action: $actionId")
        }
    }

    private fun handleDataReferenceTest(request: MockRequest, actionId: String): MockResponse {
        val body = request.body ?: return Error(400, "Missing request body")
        val bodyJson = Json.parseToJsonElement(body).jsonObject
        val content = bodyJson.getValue("content").jsonObject
        val carRef = content.getValue("CarsDataReferenceSingle").jsonObject
        val carId = carRef.getValue("Id").jsonPrimitive.int

        return when (actionId) {
            "SingleDisplayAsTable" -> Asset("responses/dx/assignments/DataReferenceTest-1-Review.json")
            "Create/refresh" -> Asset("responses/dx/assignments/refresh/DataReferenceTest-Refresh-$carId.json")
            else -> Error(404, "Invalid actionId: $actionId")
        }
    }

    private fun handleNewService(actionId: String) = when (actionId) {
        "Customer" -> Asset("responses/dx/assignments/NewService-1-Customer.json")
        "Address" -> Asset("responses/dx/assignments/NewService-2-Address.json")
        "Service" -> Asset("responses/dx/assignments/NewService-3-Service.json")
        "OtherNotes" -> Asset("responses/dx/assignments/NewService-4-OtherNotes.json")
        else -> Error(404, "Invalid actionId: $actionId")
    }
}
