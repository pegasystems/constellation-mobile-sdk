package com.pega.constellation.sdk.kmp.test.mock.handlers

import com.pega.constellation.sdk.kmp.test.mock.MockHandler
import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Asset
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class DxCasesHandler : MockHandler {
    override fun canHandle(request: MockRequest) = request.isDxApi("cases")

    override fun handle(request: MockRequest) = when (request.method) {
        "POST" -> handlePost(request)
        "DELETE" -> handleDelete(request)
        "PATCH" -> handlePatch(request)
        else -> Error(500, "Method ${request.method} not supported")
    }

    private fun handlePost(request: MockRequest): MockResponse {
        val body = request.body ?: return Error(400, "Missing request body")
        val bodyJson = Json.parseToJsonElement(body).jsonObject
        val caseTypeId = bodyJson.getValue("caseTypeID").jsonPrimitive.content
        return when (caseTypeId) {
            "DIXL-MediaCo-Work-SDKTesting" -> Asset("responses/dx/cases/SDKTesting-POST.json")
            "DIXL-MediaCo-Work-NewService" -> Asset("responses/dx/cases/NewService-POST.json")
            "O40M3A-MarekCo-Work-EmbeddedDataTest-RepeatingViewEditable" -> Asset("responses/dx/cases/EmbeddedDataTest-RepeatingViewEditable-POST.json")
            "O40M3A-MarekCo-Work-EmbeddedDataTest-EditableTable" -> Asset("responses/dx/cases/EmbeddedDataTest-EditableTable-POST.json")
            "O40M3A-MarekCo-Work-EmbeddedDataTest-Conditions" -> Asset("responses/dx/cases/EmbeddedDataTest-Conditions-POST.json")
            "O40M3A-MarekCo-Work-DataReferenceTest2" -> Asset("responses/dx/cases/DataReferenceTest-POST.json")
            "O40M3A-MarekCo-Work-KeysAndCiphers" -> Asset("responses/dx/cases/KeysAndCiphers-POST.json")
            "O40M3A-MarekCo-Work-GroupTest" -> Asset("responses/dx/cases/GroupTest-POST.json")
            "O40M3A-MarekCo-Work-NestedJSON" -> Asset("responses/dx/cases/NestedJSON-POST.json")
            else -> Error(500, "Missing response for case $caseTypeId")
        }
    }

    private fun handlePatch(request: MockRequest) =
        when {
            request.url.contains("E-24003/views/Create2/refresh") -> handleEmbeddedDataPopupRefresh(request)
            else -> Error(500, "Missing response for ${request.url}")
        }

    private fun handleEmbeddedDataPopupRefresh(request: MockRequest): MockResponse {
        val body = request.body ?: return Error(400, "Missing request body")
        val bodyJson = Json.parseToJsonElement(body).jsonObject
        val pageInstructions = bodyJson.getValue("pageInstructions").jsonArray
        val interestPage = bodyJson.getValue("interestPage").jsonPrimitive.content
        return when {
            interestPage == ".EmbeddedDataListOfRecords(1)" && pageInstructions.size == 1 -> Asset("responses/dx/cases/views/EmbeddedDataTest-Edit-Popup-Refresh-1-PATCH.json")
            interestPage == ".EmbeddedDataListOfRecords(1)" && pageInstructions.size == 2 -> Asset("responses/dx/cases/views/EmbeddedDataTest-Edit-Popup-Refresh-2-PATCH.json")
            interestPage == ".EmbeddedDataListOfRecords(2)" && pageInstructions.size == 2 -> Asset("responses/dx/cases/views/EmbeddedDataTest-Add-Popup-Refresh-1-PATCH.json")
            interestPage == ".EmbeddedDataListOfRecords(2)" && pageInstructions.size == 4 -> Asset("responses/dx/cases/views/EmbeddedDataTest-Add-Popup-Refresh-2-PATCH.json")
            else -> Error(404, "No data for given interestPage: $interestPage and pageInstructions size: ${pageInstructions.size}")
        }
    }

    private fun handleDelete(request: MockRequest) =
        when {
            request.url.contains("S-17098") -> Asset("responses/dx/cases/SDKTesting-DELETE.json")
            request.url.contains("K-11019") -> Asset("responses/dx/cases/KeysAndCiphers-DELETE.json")
            else -> Error(500, "Missing response for ${request.url}")
        }
}



