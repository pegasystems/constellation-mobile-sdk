package com.pega.constellation.sdk.kmp.test.mock.handlers

import com.pega.constellation.sdk.kmp.test.mock.MockHandler
import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Asset
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import com.pega.constellation.sdk.kmp.test.mock.handlers.pega24.DxAssignments24Handler
import com.pega.constellation.sdk.kmp.test.mock.handlers.pega25.DxAssignments25Handler
import com.pega.constellation.sdk.kmp.test.mock.handlers.pega26.DxAssignments26Handler

class DxAssignmentsHandler(pegaVersion: PegaVersion) : MockHandler {
    private val versionHandler = when (pegaVersion) {
        PegaVersion.v24_1_0, PegaVersion.v24_2_2 -> DxAssignments24Handler(pegaVersion)
        PegaVersion.v25_1 -> DxAssignments25Handler()
        PegaVersion.v26_1 -> DxAssignments26Handler()
    }
    private val assignmentActionsRegex = Regex(".*/assignments/(.+?)[/?](?:actions/([^?]+))?")
    private val assignmentNavStepsActionsRegex =
        Regex(".*/assignments/(.+?)[/?](?:navigation_steps/([^?]+))")
    private val openAssignmentRegex = Regex(".*/assignments/([^?/]+)")

    override fun canHandle(request: MockRequest) = request.isDxApi("assignments")

    override fun handle(request: MockRequest): MockResponse = when (request.method) {
        "GET" -> handleOpenAssignment(request)
        "PATCH" -> handleAssignmentAction(request)
        else -> Error(400, "Unsupported method: ${request.method}")
    }

    private fun handleOpenAssignment(request: MockRequest): MockResponse {
        val match = openAssignmentRegex.find(request.url) ?: return Error(400, "Invalid request")
        val assignmentId = match.groupValues[1]
        return versionHandler.openAssignment(assignmentId)
            ?: Error(404, "Cannot handle open assignment: $assignmentId")
    }

    private fun handleAssignmentAction(request: MockRequest): MockResponse {
        var match = assignmentActionsRegex.find(request.url)
        if (match?.groups?.get(1) == null || match.groups.get(2) == null) {
            match = assignmentNavStepsActionsRegex.find(request.url)
                ?: return Error(400, "Invalid request")
        }
        val assignmentId = match.groupValues[1]
        val actionId = match.groupValues[2]
        return when {
            assignmentId.contains("S-17098") && actionId == "Create" -> Asset("responses/dx/assignments/SDKTesting-1-Create.json")
            assignmentId.contains("E-6026") && actionId == "Create" -> Asset("responses/dx/assignments/EmbeddedData-1-Create.json")
            assignmentId.contains("N-16042") -> handleNewService(actionId)
            else -> versionHandler.handleAction(request, assignmentId, actionId)
                ?: Error(404, "Cannot handle assignment: $assignmentId, action: $actionId")
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
