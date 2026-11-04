package com.pega.constellation.sdk.kmp.test.mock.handlers.pega25

import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import com.pega.constellation.sdk.kmp.test.mock.handlers.VersionedDxDataViewsHandler

internal class DxDataViews25Handler : VersionedDxDataViewsHandler(PegaVersion.v25_1) {
    override fun carsList2(brand: String): MockResponse? = when (brand) {
        "Ford", "Fiat" -> asset("data_views/D_CarsList2-$brand.json")
        else -> null
    }
}
