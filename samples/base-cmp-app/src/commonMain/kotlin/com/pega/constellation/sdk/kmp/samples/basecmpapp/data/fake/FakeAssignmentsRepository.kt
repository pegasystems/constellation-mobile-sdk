package com.pega.constellation.sdk.kmp.samples.basecmpapp.data.fake

import com.pega.constellation.sdk.kmp.samples.basecmpapp.data.AssignmentsRepository
import com.pega.constellation.sdk.kmp.samples.basecmpapp.data.AssignmentsResponse
import kotlinx.serialization.json.Json

class FakeAssignmentsRepository : AssignmentsRepository {
    private val json = Json { ignoreUnknownKeys = true }

    override suspend fun fetchAssignments() =
        json.decodeFromString<AssignmentsResponse>(D_pyMyWorkList).data

    companion object {
        @Suppress("ConstPropertyName")
        private const val D_pyMyWorkList =
            """
            {
                "fetchDateTime": "2025-11-06T15:01:24.168Z",
                "pxObjClass": "Pega-API-DataExploration-Data",
                "resultCount": 2,
                "data": [
                    {
                        "pxUrgencyAssign": 10,
                        "pxProcessName": "Filtered",
                        "pxRefObjectInsName": "K-11019",
                        "pxFlowName": "Filtered_Flow",
                        "pxAssignedOperatorID": "rep@mediaco",
                        "pxUpdateDateTime": null,
                        "pxTaskLabel": "Simple Table 1",
                        "pxRefObjectClass": "O40M3A-MarekCo-Work-KeysAndCiphers",
                        "pyAssignmentStatus": "New",
                        "pyInstructions": null,
                        "pzInsKey": "ASSIGN-WORKLIST O40M3A-MAREKCO-WORK K-11019!FILTERED_FLOW",
                        "pxDeadlineTime": null,
                        "pxUpdateOperator": null,
                        "pxObjClass": "Assign-Worklist",
                        "pxGoalTime": null,
                        "pxCreateDateTime": "2025-11-06T15:00:53.074Z",
                        "pxRefObjectKey": "O40M3A-MAREKCO-WORK K-11019",
                        "pxAssignedUserName": "Administrator",
                        "pyLabel": "KeysAndCiphers",
                        "pyFlowType": "Filtered_Flow",
                        "pxIsMultiStep": false
                    },
                    {
                        "pxUrgencyAssign": 10,
                        "pxProcessName": "Filtered",
                        "pxRefObjectInsName": "K-11018",
                        "pxFlowName": "Filtered_Flow",
                        "pxAssignedOperatorID": "rep@mediaco",
                        "pxUpdateDateTime": null,
                        "pxTaskLabel": "Simple Table 2",
                        "pxRefObjectClass": "O40M3A-MarekCo-Work-KeysAndCiphers",
                        "pyAssignmentStatus": "New",
                        "pyInstructions": null,
                        "pzInsKey": "ASSIGN-WORKLIST O40M3A-MAREKCO-WORK K-11018!FILTERED_FLOW",
                        "pxDeadlineTime": null,
                        "pxUpdateOperator": null,
                        "pxObjClass": "Assign-Worklist",
                        "pxGoalTime": null,
                        "pxCreateDateTime": "2025-11-06T14:56:37.254Z",
                        "pxRefObjectKey": "O40M3A-MAREKCO-WORK K-11018",
                        "pxAssignedUserName": "Administrator",
                        "pyLabel": "KeysAndCiphers",
                        "pyFlowType": "Filtered_Flow",
                        "pxIsMultiStep": false
                    }
                ],
                "hasMoreResults": true
            }
            """
    }
}
