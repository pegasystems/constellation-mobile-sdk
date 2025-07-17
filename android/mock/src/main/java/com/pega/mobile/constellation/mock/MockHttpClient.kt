package com.pega.mobile.constellation.mock

import android.content.Context
import okhttp3.OkHttpClient

@Suppress("FunctionName")
fun MockHttpClient(context: Context, pegaUrl: String) = OkHttpClient.Builder()
    .addInterceptor(MockInterceptor(context, pegaUrl))
    .build()