package com.pega.constellation.sdk.kmp.test.mock.handlers.pega26

import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import com.pega.constellation.sdk.kmp.test.mock.handlers.VersionedDxAssignmentsHandler

internal class DxAssignments26Handler : VersionedDxAssignmentsHandler(PegaVersion.v26_1) {
    override fun handleAction(
        request: MockRequest,
        assignmentId: String,
        actionId: String
    ): MockResponse? = when {
        assignmentId.contains("C-2601") && actionId == "Create/refresh" ->
            asset("assignments/CascadingDropdowns-Create-Refresh.json")

        assignmentId.contains("D-3003") -> handleListOfRecords(actionId)

        assignmentId.contains("D-2004") -> handleSingleRecord(actionId)

        else -> null
    }

    private fun handleListOfRecords(actionId: String): MockResponse {
        val response = when (actionId) {
            "Create" -> "1-Table.json"
            "Table" -> "2-SimpleTable.json"
            "SimpleTable" -> "3-CheckboxGroup.json"
            "CheckboxGroup" -> "4-Cards.json"
            "Cards" -> "5-ReadonlyField.json"
            "ReadonlyField" -> "6-ReadonlyTable.json"
            "ReadonlyTable" -> "7-ReadonlySimpletable.json"
            "ReadonlySimpletable" -> "8-ReadonlyCards.json"
            "ReadonlyCards" -> "9-Complete.json"
            else -> return Error(404, "Unexpected list-of-records action: $actionId")
        }
        return asset("assignments/DataReferenceListOfRecordsTest-ListOfRecords-$response")
    }

    private fun handleSingleRecord(actionId: String): MockResponse {
        val response = when (actionId) {
            "Combobox/refresh" -> "1-ComboboxRefresh"
            "Combobox" -> "2-Dropdown"
            "Dropdown/refresh" -> "2-DropdownRefresh"
            "Dropdown" -> "3-Table"
            "Table" -> "4-SimpleTable"
            "SimpleTable" -> "5-Cards"
            "Cards" -> "6-Readonly"
            else -> return Error(404, "Unexpected single-record action: $actionId")
        }
        return asset("assignments/DataReferenceSingleRecordTest-SingleRecord-$response.json")
    }
}
