package com.pega.constellation.sdk.kmp.test.mock.handlers

import com.pega.constellation.sdk.kmp.test.mock.MockHandler
import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Asset
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class DxCasesHandler(private val pegaVersion: PegaVersion) : MockHandler {
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
            "OAOEH9-EloEloApp-Work-CascadingDropdowns" -> Asset(versionedPath("cases/CascadingDropdowns-POST.json"))
            "OFV0MW-Marco-Work-AutoCompleteTest" -> Asset(versionedPath("cases/AutoCompleteTest-POST.json"))
            "O40M3A-MarekCo-Work-EmbeddedDataTest-RepeatingViewEditable" -> Asset(versionedPath("cases/EmbeddedDataTest-RepeatingViewEditable-POST.json"))
            "O40M3A-MarekCo-Work-EmbeddedDataTest-EditableTable" -> Asset(versionedPath("cases/EmbeddedDataTest-EditableTable-POST.json"))
            "O40M3A-MarekCo-Work-EmbeddedDataTest-Conditions" -> Asset(versionedPath("cases/EmbeddedDataTest-Conditions-POST.json"))
            "O40M3A-MarekCo-Work-DataReferenceTest2" -> Asset(versionedPath("cases/DataReferenceTest-POST.json"))
            "O40M3A-MarekCo-Work-DataReferenceListOfRecordsTest" -> Asset(versionedPath("cases/DataReferenceListOfRecordsTest-POST.json"))
            "OI1OYV-Marco2-Work-InvisibleDataReferenceTest" -> Asset(versionedPath("cases/InvisibleDataReferenceTest-POST.json"))
            "O40M3A-MarekCo-Work-DataReferenceMultiSelectTest" -> Asset(versionedPath("cases/DataReferenceMultiSelectTest-POST.json"))
            "O40M3A-MarekCo-Work-KeysAndCiphers" -> Asset(versionedPath("cases/KeysAndCiphers-POST.json"))
            "O40M3A-MarekCo-Work-GroupTest" -> Asset(versionedPath("cases/GroupTest-POST.json"))
            "O40M3A-MarekCo-Work-NestedJSON" -> Asset(versionedPath("cases/NestedJSON-POST.json"))
            "OI1OYV-Marco2-Work-DetailsTemplateTest" -> Asset(versionedPath("cases/DetailsTest-POST.json"))
            "OFV0MW-Marco-Work-EmbeddedDataTest-SingleRecord" -> Asset(versionedPath("cases/EmbeddedDataTest-SingleRecord.json"))
            "OFV0MW-Marco-Work-EmbeddedDataTest-Combobox" -> Asset(versionedPath("cases/EmbeddedDataTest-Combobox-POST.json"))
            "OI1OYV-Marco2-Work-DataReferenceTest-FieldOnly" -> Asset(versionedPath("cases/DataRefSemanticLinkTest-POST.json"))
            "OI1OYV-Marco2-Work-DataReferenceListOfRecordsCards" -> Asset(versionedPath("cases/DataReferenceMultiSelectCardsTest-POST.json"))
            "OI1OYV-Marco2-Work-DataReferenceSingleRecordCards" -> Asset(versionedPath("cases/DataReferenceSingleSelectCardsTest-POST.json"))
            "OI1OYV-Marco2-Work-SimpleTest" -> Asset(versionedPath("cases/NextPreviousTest-Step1-POST.json"))
            "OI1OYV-Marco2-Work-Invisible-Required" -> Asset(versionedPath("cases/HiddenRequiredTextInputTest-POST.json"))
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
            interestPage == ".EmbeddedDataListOfRecords(1)" && pageInstructions.size == 1 -> Asset(versionedPath("cases/views/EmbeddedDataTest-Edit-Popup-Refresh-1-PATCH.json"))
            interestPage == ".EmbeddedDataListOfRecords(1)" && pageInstructions.size == 2 -> Asset(versionedPath("cases/views/EmbeddedDataTest-Edit-Popup-Refresh-2-PATCH.json"))
            interestPage == ".EmbeddedDataListOfRecords(2)" && pageInstructions.size == 2 -> Asset(versionedPath("cases/views/EmbeddedDataTest-Add-Popup-Refresh-1-PATCH.json"))
            interestPage == ".EmbeddedDataListOfRecords(2)" && pageInstructions.size == 4 -> Asset(versionedPath("cases/views/EmbeddedDataTest-Add-Popup-Refresh-2-PATCH.json"))
            else -> Error(404, "No data for given interestPage: $interestPage and pageInstructions size: ${pageInstructions.size}")
        }
    }

    private fun handleDelete(request: MockRequest) =
        when {
            request.url.contains("S-17098") -> Asset("responses/dx/cases/SDKTesting-DELETE.json")
            request.url.contains("K-11019") -> Asset(versionedPath("cases/KeysAndCiphers-DELETE.json"))
            else -> Error(500, "Missing response for ${request.url}")
    }

    private fun versionedPath(relativePath: String) = "responses/dx/${pegaVersion.fixtureDirectory}/$relativePath"
}
