package com.pega.constellation.sdk.kmp.test.mock.handlers

import com.pega.constellation.sdk.kmp.test.mock.MockHandler
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Asset
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import com.pega.constellation.sdk.kmp.test.mock.MockRequest

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
            assignmentId.contains("N-16042") -> when (actionId) {
                "Customer" -> Asset("responses/dx/assignments/NewService-1-Customer.json")
                "Address" -> Asset("responses/dx/assignments/NewService-2-Address.json")
                "Service" -> Asset("responses/dx/assignments/NewService-3-Service.json")
                "OtherNotes" -> Asset("responses/dx/assignments/NewService-4-OtherNotes.json")
                else -> Error(404, "Invalid actionId: $actionId")
            }

            else -> Error(501, "Cannot handle assignment: $assignmentId, action: $actionId")
        }
    }
}
