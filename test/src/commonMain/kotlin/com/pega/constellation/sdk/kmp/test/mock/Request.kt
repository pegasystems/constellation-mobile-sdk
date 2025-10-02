package com.pega.constellation.sdk.kmp.test.mock

data class Request(val method: String, val url: String, val body: String?) {
    fun isDxApi(path: String) = url.contains(DX_API_PATH + path)

    companion object {
        const val DX_API_PATH = "/prweb/api/application/v2/"
    }
}