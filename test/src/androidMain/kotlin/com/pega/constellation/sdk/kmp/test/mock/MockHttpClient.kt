package com.pega.constellation.sdk.kmp.test.mock

import android.content.Context
import okhttp3.OkHttpClient

@Suppress("FunctionName")
fun MockHttpClient(context: Context, pegaVersion: String) = OkHttpClient.Builder()
    .addInterceptor(MockInterceptor(context, pegaVersion))
    .build()