package com.pega.constellation.sdk.kmp.test.mock.handlers

import com.pega.constellation.sdk.kmp.test.mock.MockHandler
import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.MockRequest.Companion.DX_API_PATH
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Asset
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import com.pega.constellation.sdk.kmp.test.mock.handlers.pega24.DxCases24Handler
import com.pega.constellation.sdk.kmp.test.mock.handlers.pega25.DxCases25Handler
import com.pega.constellation.sdk.kmp.test.mock.handlers.pega26.DxCases26Handler
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class DxCasesHandler(pegaVersion: PegaVersion) : MockHandler {
    private val versionHandler = when (pegaVersion) {
        PegaVersion.v24_1_0, PegaVersion.v24_2_2 -> DxCases24Handler(pegaVersion)
        PegaVersion.v25_1 -> DxCases25Handler()
        PegaVersion.v26_1 -> DxCases26Handler()
    }

    override fun canHandle(request: MockRequest) = request.isDxApi("cases")

    override fun handle(request: MockRequest): MockResponse {
        val pathSegments = request.url.substringAfter(DX_API_PATH).substringBefore("?").split("/")
        return when (request.method) {
            "POST" -> if (pathSegments.last() == "cases") {
                createCase(request)
            } else {
                Error(500, "Missing response for ${request.url}")
            }
            "GET" -> when (pathSegments.getOrNull(2)) {
                "actions" -> versionHandler.getCaseActions(request)
                "views" -> versionHandler.getCaseView(request)
                else -> null
            } ?: Error(500, "Missing response for ${request.url}")
            "DELETE" -> deleteCase(request)
            "PATCH" -> versionHandler.patchCase(request)
                ?: Error(500, "Missing response for ${request.url}")
            else -> Error(500, "Method ${request.method} not supported")
        }
    }

    private fun createCase(request: MockRequest): MockResponse {
        val body = request.body ?: return Error(400, "Missing request body")
        val bodyJson = Json.parseToJsonElement(body).jsonObject
        val caseTypeId = bodyJson.getValue("caseTypeID").jsonPrimitive.content
        return when (caseTypeId) {
            "DIXL-MediaCo-Work-SDKTesting" -> Asset("responses/dx/cases/SDKTesting-POST.json")
            "DIXL-MediaCo-Work-NewService" -> Asset("responses/dx/cases/NewService-POST.json")
            else -> versionHandler.createCase(caseTypeId)
                ?: Error(500, "Missing response for case $caseTypeId")
        }
    }

    private fun deleteCase(request: MockRequest): MockResponse = when {
        request.url.contains("S-17098") -> Asset("responses/dx/cases/SDKTesting-DELETE.json")
        else -> versionHandler.deleteCase(request)
            ?: Error(500, "Missing response for ${request.url}")
    }
}
