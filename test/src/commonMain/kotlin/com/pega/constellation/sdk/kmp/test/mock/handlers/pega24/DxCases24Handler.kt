package com.pega.constellation.sdk.kmp.test.mock.handlers.pega24

import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import com.pega.constellation.sdk.kmp.test.mock.handlers.VersionedDxCasesHandler
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

internal class DxCases24Handler(private val pegaVersion: PegaVersion) :
    VersionedDxCasesHandler(pegaVersion) {
    override val caseTypes = when (pegaVersion) {
        PegaVersion.v24_1_0 -> mapOf(
            "O40M3A-MarekCo-Work-DataReferenceTest2" to "DataReferenceTest-POST.json",
            "OI1OYV-Marco2-Work-InvisibleDataReferenceTest" to "InvisibleDataReferenceTest-POST.json"
        )

        PegaVersion.v24_2_2 -> mapOf(
            "O40M3A-MarekCo-Work-EmbeddedDataTest-RepeatingViewEditable" to "EmbeddedDataTest-RepeatingViewEditable-POST.json",
            "O40M3A-MarekCo-Work-EmbeddedDataTest-EditableTable" to "EmbeddedDataTest-EditableTable-POST.json",
            "O40M3A-MarekCo-Work-EmbeddedDataTest-Conditions" to "EmbeddedDataTest-Conditions-POST.json",
            "O40M3A-MarekCo-Work-KeysAndCiphers" to "KeysAndCiphers-POST.json",
            "O40M3A-MarekCo-Work-GroupTest" to "GroupTest-POST.json",
            "O40M3A-MarekCo-Work-NestedJSON" to "NestedJSON-POST.json"
        )

        else -> emptyMap()
    }

    override fun patchCase(request: MockRequest): MockResponse? =
        if (pegaVersion == PegaVersion.v24_2_2 && request.url.contains("E-24003/views/Create2/refresh")) {
            handleEmbeddedDataPopupRefresh(request)
        } else {
            null
        }

    override fun deleteCase(request: MockRequest): MockResponse? =
        if (pegaVersion == PegaVersion.v24_1_0 && request.url.contains("K-11019")) {
            asset("cases/KeysAndCiphers-DELETE.json")
        } else {
            null
        }

    private fun handleEmbeddedDataPopupRefresh(request: MockRequest): MockResponse {
        val body = request.body ?: return Error(400, "Missing request body")
        val bodyJson = Json.parseToJsonElement(body).jsonObject
        val pageInstructions = bodyJson.getValue("pageInstructions").jsonArray
        val interestPage = bodyJson.getValue("interestPage").jsonPrimitive.content
        return when {
            interestPage == ".EmbeddedDataListOfRecords(1)" && pageInstructions.size == 1 -> asset("cases/views/EmbeddedDataTest-Edit-Popup-Refresh-1-PATCH.json")
            interestPage == ".EmbeddedDataListOfRecords(1)" && pageInstructions.size == 2 -> asset("cases/views/EmbeddedDataTest-Edit-Popup-Refresh-2-PATCH.json")
            interestPage == ".EmbeddedDataListOfRecords(2)" && pageInstructions.size == 2 -> asset("cases/views/EmbeddedDataTest-Add-Popup-Refresh-1-PATCH.json")
            interestPage == ".EmbeddedDataListOfRecords(2)" && pageInstructions.size == 4 -> asset("cases/views/EmbeddedDataTest-Add-Popup-Refresh-2-PATCH.json")
            else -> Error(404, "No data for given interestPage: $interestPage and pageInstructions size: ${pageInstructions.size}")
        }
    }
}
