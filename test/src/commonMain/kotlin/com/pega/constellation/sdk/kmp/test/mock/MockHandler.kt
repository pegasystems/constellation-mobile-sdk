package com.pega.constellation.sdk.kmp.test.mock

interface MockHandler {
    fun canHandle(request: MockRequest): Boolean
    fun handle(request: MockRequest): MockResponse
}
