package com.pega.constellation.sdk.kmp.test.mock.handlers.pega24

import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import com.pega.constellation.sdk.kmp.test.mock.handlers.VersionedDxDataViewsHandler

internal class DxDataViews24Handler(private val pegaVersion: PegaVersion) :
    VersionedDxDataViewsHandler(pegaVersion) {
    override fun insuranceList(): MockResponse? =
        if (pegaVersion == PegaVersion.v24_2_2) asset("data_views/D_InsuranceList.json") else null
}
