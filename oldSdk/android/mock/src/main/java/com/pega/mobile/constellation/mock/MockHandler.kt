package com.pega.mobile.constellation.mock

import okhttp3.Request

interface MockHandler {
    fun canHandle(request: Request): Boolean
    fun handle(request: Request): MockResponse
}
