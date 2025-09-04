package com.pega.mobile.constellation.mock

sealed class MockResponse {
    data class Asset(val path: String) : MockResponse()
    data class Error(val code: Int = 500, val message: String = "Internal error") : MockResponse()
}
