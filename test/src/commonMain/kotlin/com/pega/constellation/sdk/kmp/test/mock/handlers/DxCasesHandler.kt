package com.pega.constellation.sdk.kmp.test.mock.handlers

import com.pega.constellation.sdk.kmp.test.mock.MockHandler
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Asset
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import com.pega.constellation.sdk.kmp.test.mock.Request
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class DxCasesHandler : MockHandler {
    override fun canHandle(request: Request) = request.isDxApi("cases")

    override fun handle(request: Request): MockResponse {
        return when (request.method) {
            "POST" -> handlePost(request)
            "DELETE" -> handleDelete(request)
            else -> Error(500, "Method ${request.method} not supported")
        }
    }

    private fun handlePost(request: Request): MockResponse {
        val body = request.body ?: return Error(400, "Missing request body")
        val caseTypeId =
            Json.parseToJsonElement(body).jsonObject.getValue("caseTypeID").jsonPrimitive.content
        return when (caseTypeId) {
            "DIXL-MediaCo-Work-SDKTesting" -> Asset("responses/dx/cases/SDKTesting-POST.json")
            "DIXL-MediaCo-Work-NewService" -> Asset("responses/dx/cases/NewService-POST.json")
            "DIXL-MediaCo-Work-EmbeddedData" -> Asset("responses/dx/cases/EmbeddedData-POST.json")
            else -> Error(500, "Missing response for case $caseTypeId")
        }
    }

    private fun handleDelete(request: Request) =
        if (request.url.contains("S-17098")) {
            Asset("responses/dx/cases/SDKTesting-DELETE.json")
        } else {
            Error(500, "Missing response for ${request.url}")
        }
}



