package com.pega.constellation.sdk.kmp.test.mock.handlers

import com.pega.constellation.sdk.kmp.test.mock.MockHandler
import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.MockRequest.Companion.DX_API_PATH
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Asset
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import com.pega.constellation.sdk.kmp.test.mock.handlers.pega24.DxDataViews24Handler
import com.pega.constellation.sdk.kmp.test.mock.handlers.pega25.DxDataViews25Handler
import com.pega.constellation.sdk.kmp.test.mock.handlers.pega26.DxDataViews26Handler
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class DxDataViewsHandler(private val pegaVersion: PegaVersion) : MockHandler {
    private val versionHandler = when (pegaVersion) {
        PegaVersion.v24_1_0, PegaVersion.v24_2_2 -> DxDataViews24Handler(pegaVersion)
        PegaVersion.v25_1 -> DxDataViews25Handler()
        PegaVersion.v26_1 -> DxDataViews26Handler()
    }

    override fun canHandle(request: MockRequest) = request.isDxApi("data_views")

    override fun handle(request: MockRequest): MockResponse {
        val dataViewId = request.url.substringAfter(DX_API_PATH + "data_views/")
        return when (dataViewId) {
            "D_pxBootstrapConfig" -> versionHandler.bootstrapConfig()
            "D_CarsByMake" -> handleCarsByMake(request.body ?: "")
            "D_CarsList" -> handleCarsList(request.body ?: "")
            "D_CarsList2" -> handleCarsList2(request.body ?: "")
            "D_CarList" -> versionHandler.singleRecordCars(request)
                ?: Error(404, "Missing D_CarList response for $pegaVersion")
            "D_SampleCaseTypeList" -> Asset("responses/dx/data_views/D_SampleCaseTypeList.json")
            "D_ListOfFilteredEncryptionKeys" -> handleEncryptionKeysList(request.body ?: "")
            "D_EncryptionKeysList" -> Asset("responses/dx/data_views/D_EncryptionKeysList-all.json")
            "D_InsuranceList" -> versionHandler.insuranceList()
            else -> Error(404, "Missing response for data page $dataViewId")
        } ?: Error(404, "Missing response for data page $dataViewId")
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

    private fun handleCarsList(body: String): MockResponse {
        val params = runCatching {
            Json.parseToJsonElement(body).jsonObject["dataViewParameters"]?.jsonObject
        }.getOrElse { JsonObject(emptyMap()) }
        return if (params?.get("brand")?.jsonPrimitive?.content == "Ford") {
            Asset("responses/dx/data_views/D_CarsList-Ford.json")
        } else {
            Asset("responses/dx/data_views/D_CarsList.json")
        }
    }

    private fun handleCarsByMake(body: String): MockResponse {
        val make = runCatching {
            Json.parseToJsonElement(body).jsonObject["dataViewParameters"]
                ?.jsonObject
                ?.get("CarMake")
                ?.jsonPrimitive
                ?.content
        }.getOrNull()
        return when (make) {
            null, "" -> Error(
                400,
                """{"errorClassification":"Invalid inputs","localizedValue":"One or more inputs are invalid","errorDetails":[{"message":"Error_Invalid_Inputs_Missing_Required_Parameters","erroneousInputOutputFieldInPage":"","erroneousInputOutputIdentifier":"","errorClassification":"","localizedValue":"Required parameters for data view are missing","messageParameters":[]}]})"""
            )
            "Mazda" -> versionHandler.carsByMake(make)
                ?: Error(404, "Missing D_CarsByMake response for $pegaVersion")
            else -> Error(404, "Unexpected car make $make")
        }
    }

    private fun handleCarsList2(body: String): MockResponse {
        val brand = runCatching {
            Json.parseToJsonElement(body).jsonObject["dataViewParameters"]
                ?.jsonObject
                ?.get("brand")
                ?.jsonPrimitive
                ?.content
        }.getOrNull()
        return when (brand) {
            null, "" -> Asset("responses/dx/data_views/D_CarsList2.json")
            "Ford", "Fiat" -> versionHandler.carsList2(brand)
                ?: Error(404, "Missing D_CarsList2 response for $pegaVersion")
            else -> Error(404, "Unexpected filter value $brand")
        }
    }
}
