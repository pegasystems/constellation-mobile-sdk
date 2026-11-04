package com.pega.constellation.sdk.kmp.test.mock.handlers

import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Asset
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion

internal abstract class VersionedDxHandler(private val pegaVersion: PegaVersion) {
    protected fun asset(relativePath: String) =
        Asset("responses/dx/${pegaVersion.fixtureDirectory}/$relativePath")
}

internal abstract class VersionedDxAssignmentsHandler(pegaVersion: PegaVersion) :
    VersionedDxHandler(pegaVersion) {
    open fun openAssignment(assignmentId: String): MockResponse? = null

    abstract fun handleAction(
        request: MockRequest,
        assignmentId: String,
        actionId: String
    ): MockResponse?
}

internal abstract class VersionedDxCasesHandler(pegaVersion: PegaVersion) :
    VersionedDxHandler(pegaVersion) {
    protected abstract val caseTypes: Map<String, String>

    fun createCase(caseTypeId: String): MockResponse? = caseTypes[caseTypeId]?.let { asset("cases/$it") }

    open fun getCaseActions(request: MockRequest): MockResponse? = null

    open fun getCaseView(request: MockRequest): MockResponse? = null

    open fun patchCase(request: MockRequest): MockResponse? = null

    open fun deleteCase(request: MockRequest): MockResponse? = null
}

internal abstract class VersionedDxDataViewsHandler(pegaVersion: PegaVersion) :
    VersionedDxHandler(pegaVersion) {
    fun bootstrapConfig(): MockResponse = asset("data_views/D_pxBootstrapConfig.json")

    open fun insuranceList(): MockResponse? = null

    open fun carsByMake(make: String): MockResponse? = null

    open fun carsList2(brand: String): MockResponse? = null

    open fun singleRecordCars(request: MockRequest): MockResponse? = null
}
