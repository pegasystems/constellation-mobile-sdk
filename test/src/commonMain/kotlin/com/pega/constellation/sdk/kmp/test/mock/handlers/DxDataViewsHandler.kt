package com.pega.constellation.sdk.kmp.test.mock.handlers

import com.pega.constellation.sdk.kmp.test.mock.MockHandler
import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.MockRequest.Companion.DX_API_PATH
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Asset
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class DxDataViewsHandler(private val pegaVersion: String) : MockHandler {
    override fun canHandle(request: MockRequest) = request.isDxApi("data_views")

    override fun handle(request: MockRequest): MockResponse {
        val dataViewId = request.url.substringAfter(DX_API_PATH + "data_views/")
        return when (dataViewId) {
            "D_pxBootstrapConfig" -> Asset("responses/dx/data_views/D_pxBootstrapConfig-$pegaVersion.json")
            "D_CarsList" -> Asset("responses/dx/data_views/D_CarsList.json")
            "D_ListOfFilteredEncryptionKeys" -> handleEncryptionKeysList(request.body ?: "")
            else -> Error(404, "Missing response for data page $dataViewId")
        }
    }

    private fun handleEncryptionKeysList(body: String): MockResponse {
        val filter = Json.parseToJsonElement(body)
            .jsonObject["dataViewParameters"]
            ?.jsonObject
            ?.get("Algo")
            ?.jsonPrimitive
            ?.content
        return when(filter) {
            null, "" -> Asset("responses/dx/data_views/D_EncryptionKeysList-all.json")
            "AES" -> Asset("responses/dx/data_views/D_EncryptionKeysList-AES.json")
            "RSA" -> Asset("responses/dx/data_views/D_EncryptionKeysList-RSA.json")
            "ECC" -> Asset("responses/dx/data_views/D_EncryptionKeysList-ECC.json")
            else -> Error(404, "Unexpected filter value $filter")
        }
    }
}
