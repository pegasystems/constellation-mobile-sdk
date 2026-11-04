package com.pega.constellation.sdk.kmp.test.mock.handlers.pega25

import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Asset
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import com.pega.constellation.sdk.kmp.test.mock.handlers.VersionedDxAssignmentsHandler
import com.pega.constellation.sdk.kmp.test.mock.handlers.getPageInstructions
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

internal class DxAssignments25Handler : VersionedDxAssignmentsHandler(PegaVersion.v25_1) {
    private val nextPreviousTestStack = ArrayDeque<Asset>()

    override fun handleAction(
        request: MockRequest,
        assignmentId: String,
        actionId: String
    ): MockResponse? = when {
        assignmentId.contains("A-22") -> asset("assignments/AutoCompleteTest-DataRef.json")
        assignmentId.contains("D-7004") -> handleDataReferenceListOfRecordsTest(actionId)
        assignmentId.contains("D-17009") -> handleDataReferenceMultiSelectTest(request, actionId)
        assignmentId.contains("D-32087") -> handleDataReferenceListOfRecordsCardsTest(actionId)
        assignmentId.contains("D-32116") -> handleDataReferenceSingleRecordCardsTest(actionId)
        assignmentId.contains("D-9001") -> handleDetailsTemplateTest(actionId)
        assignmentId.contains("D-12038") -> handleDataRefSemanticLinkTest(actionId)
        assignmentId.contains("S-10029") -> handleNextPreviousTest(actionId)
        assignmentId.contains("S-19004") && actionId == "Create" ->
            asset("assignments/HiddenRequiredTextInputTest-1-Step2.json")

        else -> null
    }

    private fun handleDataReferenceListOfRecordsTest(actionId: String): MockResponse = when (actionId) {
        "Create" -> asset("assignments/DataReferenceListOfRecordsTest-1-SimpleTable.json")
        "DataReferenceListOfRecordsSimpleTable" -> asset("assignments/DataReferenceListOfRecordsTest-2-TableReadonly.json")
        "DataReferenceListOfRecordsTableReadonly" -> asset("assignments/DataReferenceListOfRecordsTest-3-SimpleTableReadonly.json")
        "DataReferenceListOfRecordsSimpleTableReadonly" -> asset("assignments/DataReferenceListOfRecordsTest-4-FieldValue.json")
        else -> Error(404, "Invalid actionId: $actionId")
    }

    private fun handleDataReferenceMultiSelectTest(
        request: MockRequest,
        actionId: String
    ): MockResponse {
        if (actionId != "Create") return Error(404, "Invalid actionId: $actionId")
        val pageInstructions = request.getPageInstructions()
            ?: return Error(400, "Missing request body or pageInstructions")
        val validInsertCount = pageInstructions.count {
            val obj = it.jsonObject
            obj["instruction"]?.jsonPrimitive?.content == "INSERT" &&
                obj["target"]?.jsonPrimitive?.content == ".CarsSelection" &&
                obj["content"]?.jsonObject?.containsKey("Id") == true
        }
        if (validInsertCount < 2) return Error(
            400,
            "Expected at least 2 valid INSERT instructions for .CarsSelection, got $validInsertCount"
        )
        return asset("assignments/DataReferenceMultiSelectTest-1-Create.json")
    }

    private fun handleDataReferenceListOfRecordsCardsTest(actionId: String): MockResponse = when (actionId) {
        "Create" -> asset("assignments/DataReferenceMultiSelectCardsTest-1-DataPageParam.json")
        "DataPageParamChange" -> asset("assignments/DataReferenceMultiSelectCardsTest-2-HideLabelsAndImage.json")
        "VerifyCardContent" -> asset("assignments/DataReferenceMultiSelectCardsTest-3-ReadOnly.json")
        "VerifyReadonlyMode" -> asset("assignments/DataReferenceMultiSelectCardsTest-4-DisplayOnly.json")
        else -> Error(404, "Invalid actionId: $actionId")
    }

    private fun handleDataReferenceSingleRecordCardsTest(actionId: String): MockResponse = when (actionId) {
        "Create" -> asset("assignments/DataReferenceSingleSelectCardsTest-1-DataPageParam.json")
        else -> Error(404, "Invalid actionId: $actionId")
    }

    private fun handleDetailsTemplateTest(actionId: String): MockResponse = when (actionId) {
        "DetailsTemplate2" -> asset("assignments/DetailsTemplateTest.json")
        else -> Error(404, "Invalid actionId: $actionId")
    }

    private fun handleDataRefSemanticLinkTest(actionId: String): MockResponse = when (actionId) {
        "Create" -> asset("assignments/DataRefSemanticLinkTest-1-Create.json")
        "Create/refresh" -> asset("assignments/refresh/DataRefSemanticLinkTest-Create-Refresh.json")
        else -> Error(404, "Invalid actionId: $actionId")
    }

    private fun handleNextPreviousTest(actionId: String): MockResponse {
        val step1 = asset("cases/NextPreviousTest-Step1-POST.json")
        val step2 = asset("assignments/NextPreviousTest-1-Step2.json")
        val step3 = asset("assignments/NextPreviousTest-2-Step3.json")
        val step4 = asset("assignments/NextPreviousTest-3-Step4.json")
        return when (actionId) {
            "Create" -> step2.also { nextPreviousTestStack.addLast(step1) }
            "Step2" -> step3.also { nextPreviousTestStack.addLast(step2) }
            "Step3" -> step4.also { nextPreviousTestStack.addLast(step3) }
            "previous" -> nextPreviousTestStack.removeLastOrNull()
                ?: Error(404, "No more assets for action 'previous' (stack is empty)")
            else -> Error(404, "Invalid actionId: $actionId")
        }
    }
}
