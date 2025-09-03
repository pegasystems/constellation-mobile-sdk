package com.pega.mobile.constellation.mock.handlers

import com.pega.mobile.constellation.mock.MockHandler
import com.pega.mobile.constellation.mock.MockInterceptor.Companion.isDxApi
import com.pega.mobile.constellation.mock.MockInterceptor.Companion.string
import com.pega.mobile.constellation.mock.MockResponse
import com.pega.mobile.constellation.mock.MockResponse.Asset
import com.pega.mobile.constellation.mock.MockResponse.Error
import okhttp3.Request
import org.json.JSONObject

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
        val body = request.body?.string() ?: return Error(400, "Missing request body")
        val caseTypeId = JSONObject(body).getString("caseTypeID")
        return when (caseTypeId) {
            "DIXL-MediaCo-Work-SDKTesting" -> Asset("responses/dx/cases/SDKTesting-POST.json")
            "DIXL-MediaCo-Work-NewService" -> Asset("responses/dx/cases/NewService-POST.json")
            "DIXL-MediaCo-Work-EmbeddedData" -> Asset("responses/dx/cases/EmbeddedData-POST.json")
            else -> Error(500, "Missing response for case $caseTypeId")
        }
    }

    private fun handleDelete(request: Request) =
        if (request.url.encodedPath.contains("S-17098")) {
            Asset("responses/dx/cases/SDKTesting-DELETE.json")
        } else {
            Error(500, "Missing response for ${request.url}")
        }
}



