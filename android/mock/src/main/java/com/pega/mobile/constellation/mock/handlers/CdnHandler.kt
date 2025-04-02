package com.pega.mobile.constellation.mock.handlers

import com.pega.mobile.constellation.mock.MockHandler
import com.pega.mobile.constellation.mock.MockResponse.Asset
import com.pega.mobile.constellation.mock.MockResponse.Error
import okhttp3.Request


class CdnHandler : MockHandler {
    private val assets = mapOf(
        "https://release.constellation.pega.io/8.24.1/react/prod/bootstrap-shell.js" to "responses/cdn/bootstrap-shell.js",
        "https://staging-cdn.constellation.pega.io/8.24.2-422/react/prod/lib_asset.json" to "responses/cdn/lib_asset.json",
        "https://staging-cdn.constellation.pega.io/8.24.2-422/react/prod/prerequisite/constellation-core.ca97ba62.js" to "responses/cdn/constellation-core.js",
    ).mapValues { Asset(it.value) }

    override fun canHandle(request: Request) = assets.containsKey(request.rawUrl)

    override fun handle(request: Request) = assets[request.rawUrl] ?: Error()

    private val Request.rawUrl: String
        get() = url.newBuilder().query(null).build().toString()
}
