package com.pega.mobile.constellation.mock.handlers

import com.pega.mobile.constellation.mock.MockHandler
import com.pega.mobile.constellation.mock.MockInterceptor.Companion.isDxApi
import com.pega.mobile.constellation.mock.MockResponse
import com.pega.mobile.constellation.mock.MockResponse.Asset
import com.pega.mobile.constellation.mock.MockResponse.Error
import okhttp3.Request

class DxAssignmentsHandler : MockHandler {
    private val regex = Regex(".*/assignments/(.*)/actions/(.*)")

    override fun canHandle(request: Request) = request.isDxApi("assignments")

    override fun handle(request: Request): MockResponse {
        val match = regex.find(request.url.encodedPath) ?: return Error(400, "Invalid request")
        val assignmentId = match.groupValues[1]
        val actionId = match.groupValues[2]

        return when {
            assignmentId.contains("S-17098") && actionId == "Create" -> Asset("responses/dx/assignments/SDKTesting-1-Create.json")
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
