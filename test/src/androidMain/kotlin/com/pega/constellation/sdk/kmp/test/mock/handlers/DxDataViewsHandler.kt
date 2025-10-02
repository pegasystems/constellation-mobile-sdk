package com.pega.constellation.sdk.kmp.test.mock.handlers

import com.pega.constellation.sdk.kmp.test.mock.MockHandler
import com.pega.constellation.sdk.kmp.test.mock.MockInterceptor.Companion.DX_API_PATH
import com.pega.constellation.sdk.kmp.test.mock.MockInterceptor.Companion.isDxApi
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Asset
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import okhttp3.Request

class DxDataViewsHandler : MockHandler {
    override fun canHandle(request: Request) = request.isDxApi("data_views")

    override fun handle(request: Request): MockResponse {
        val dataViewId = request.url.encodedPath.removePrefix(DX_API_PATH + "data_views/")
        return when (dataViewId) {
            "D_pxBootstrapConfig" -> Asset("responses/dx/data_views/D_pxBootstrapConfig.json")
            else -> Error(404, "Missing response for data page $dataViewId")
        }
    }
}
