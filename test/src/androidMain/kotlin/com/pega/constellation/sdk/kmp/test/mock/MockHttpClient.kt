package com.pega.constellation.sdk.kmp.test.mock

import okhttp3.OkHttpClient

@Suppress("FunctionName")
fun MockHttpClient(mockInterceptor: MockInterceptor) = OkHttpClient.Builder()
    .addInterceptor(mockInterceptor)
    .build()
