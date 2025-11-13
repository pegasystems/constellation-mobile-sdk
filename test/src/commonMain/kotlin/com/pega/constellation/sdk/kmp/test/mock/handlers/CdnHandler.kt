package com.pega.constellation.sdk.kmp.test.mock.handlers

import com.pega.constellation.sdk.kmp.test.mock.MockHandler
import com.pega.constellation.sdk.kmp.test.mock.MockResponse
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import com.pega.constellation.sdk.kmp.test.mock.MockRequest


class CdnHandler : MockHandler {
    private val assets = mapOf(
        // 8.24.1
        "https://release.constellation.pega.io/8.24.1/react/prod/bootstrap-shell.js" to "responses/cdn/8.24.1/bootstrap-shell.js",
        "https://release.constellation.pega.io/8.24.2-422/react/prod/lib_asset.json" to "responses/cdn/8.24.1/lib_asset.json",
        "https://release.constellation.pega.io/8.24.2-422/react/prod/prerequisite/constellation-core.HASH.js" to "responses/cdn/8.24.1/constellation-core.js",

        // 8.24.2
        "https://release.constellation.pega.io/8.24.2/react/prod/bootstrap-shell.js" to "responses/cdn/8.24.2/bootstrap-shell.js",
        "https://release.constellation.pega.io/8.24.52-349/react/prod/lib_asset.json" to "responses/cdn/8.24.2/lib_asset.json",
        "https://release.constellation.pega.io/8.24.52-349/react/prod/prerequisite/constellation-core.HASH.js" to "responses/cdn/8.24.2/constellation-core.js",
    ).mapValues { MockResponse.Asset(it.value) }

    override fun canHandle(request: MockRequest) = assets.containsKey(request.rawUrlWithHashPlaceholder)

    override fun handle(request: MockRequest) = assets[request.rawUrlWithHashPlaceholder] ?: Error()

    private val MockRequest.rawUrl: String
        get() = url.substringBefore("?")

    private val MockRequest.rawUrlWithHashPlaceholder: String
        get() {
            // replace hash in the JS file name to the literal string 'HASH'
            val hashRegex = "(/[A-Za-z_-]+\\.)([a-f0-9]+\\.js)".toRegex()
            val replacement = "$1HASH.js"
            return rawUrl.replace(hashRegex, replacement)
        }
}
