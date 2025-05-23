package com.pega.mobile.constellation.mock.handlers

import com.pega.mobile.constellation.mock.MockHandler
import com.pega.mobile.constellation.mock.MockResponse.Asset
import com.pega.mobile.constellation.mock.MockResponse.Error
import okhttp3.Request


class CdnHandler : MockHandler {
    private val assets = mapOf(
        "https://release.constellation.pega.io/8.24.1/react/prod/bootstrap-shell.js" to "responses/cdn/bootstrap-shell.js",
        "https://staging-cdn.constellation.pega.io/8.24.2-422/react/prod/lib_asset.json" to "responses/cdn/lib_asset.json",
        "https://staging-cdn.constellation.pega.io/8.24.2-422/react/prod/prerequisite/constellation-core.HASH.js" to "responses/cdn/constellation-core.js",
    ).mapValues { Asset(it.value) }

    override fun canHandle(request: Request) = assets.containsKey(request.rawUrlWithHashPlaceholder)

    override fun handle(request: Request) = assets[request.rawUrlWithHashPlaceholder] ?: Error()

    private val Request.rawUrl: String
        get() = url.newBuilder().query(null).build().toString()

    private val Request.rawUrlWithHashPlaceholder: String
        get() {
            // replace hash in the JS file name to the literal string 'HASH'
            val hashRegex = "(/[A-Za-z_-]+\\.)([a-f0-9]+\\.js)".toRegex()
            val replacement = "$1HASH.js"
            return rawUrl.replace(hashRegex, replacement)
        }
}
