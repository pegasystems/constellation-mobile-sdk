package com.pega.constellation.sdk.kmp.test.mock.handlers.pega26

import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import com.pega.constellation.sdk.kmp.test.mock.handlers.VersionedDxCasesHandler

internal class DxCases26Handler : VersionedDxCasesHandler(PegaVersion.v26_1) {
    private val singleRecordSummarySteps = ArrayDeque(
        listOf("Dropdown", "Table", "SimpleTable", "Cards", "Readonly")
    )
    private val listOfRecordsSummarySteps = ArrayDeque(
        listOf(
            "Table",
            "SimpleTable",
            "CheckboxGroup",
            "Cards",
            "ReadonlyField",
            "ReadonlyTable",
            "ReadonlySimpletable",
            "ReadonlyCards",
            "Complete"
        )
    )

    override val caseTypes = mapOf(
        "OAOEH9-EloEloApp-Work-CascadingDropdowns" to "CascadingDropdowns-POST.json",
        "OR97MD-Constell_1-Work-DataReferenceTest" to "DataReferenceSingleRecordTest-SingleRecord-Combobox.json",
        "OR97MD-Constell_1-Work-DataReferenceListOfRecordsTest" to
            "DataReferenceListOfRecordsTest-ListOfRecords-Combobox.json"
    )

    override fun getCaseActions(request: MockRequest): MockResponse? =
        when {
            request.url.contains("D-3003") ->
                asset("cases/DataReferenceListOfRecordsTest-ListOfRecords-Actions.json")
            request.url.contains("D-2004") ->
                asset("cases/DataReferenceSingleRecordTest-SingleRecord-Actions.json")
            else -> null
        }

    override fun getCaseView(request: MockRequest): MockResponse? =
        when {
            request.url.contains("D-2004") && request.url.contains("pyCaseSummary") -> {
                val step = singleRecordSummarySteps.removeFirstOrNull()
                if (step == null) {
                    Error(404, "No recorded single-record case summary remaining")
                } else {
                    asset("cases/DataReferenceSingleRecordTest-SingleRecord-${step}Summary.json")
                }
            }
            request.url.contains("D-3003") && request.url.contains("pyCaseSummary") -> {
                val step = listOfRecordsSummarySteps.removeFirstOrNull()
                if (step == null) {
                    Error(404, "No recorded list-of-records case summary remaining")
                } else {
                    asset("cases/DataReferenceListOfRecordsTest-ListOfRecords-${step}Summary.json")
                }
            }
            else -> null
        }
}
