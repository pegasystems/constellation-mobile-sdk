package com.pega.constellation.sdk.kmp.test.mock

interface MockHandler {
    fun canHandle(request: Request): Boolean
    fun handle(request: Request): MockResponse
}
