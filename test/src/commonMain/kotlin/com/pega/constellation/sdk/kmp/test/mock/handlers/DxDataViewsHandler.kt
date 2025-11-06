package com.pega.constellation.sdk.kmp.test.mock.handlers

import com.pega.constellation.sdk.kmp.test.mock.MockHandler
import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.MockRequest.Companion.DX_API_PATH
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Asset
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error

class DxDataViewsHandler : MockHandler {
    override fun canHandle(request: MockRequest) = request.isDxApi("data_views")

    override fun handle(request: MockRequest): MockResponse {
        val dataViewId = request.url.substringAfter(DX_API_PATH + "data_views/")
        return when (dataViewId) {
            "D_pxBootstrapConfig" -> Asset("responses/dx/data_views/D_pxBootstrapConfig.json")
            "D_CarsList" -> Asset("responses/dx/data_views/D_CarsList.json")
            else -> Error(404, "Missing response for data page $dataViewId")
        }
    }
}
