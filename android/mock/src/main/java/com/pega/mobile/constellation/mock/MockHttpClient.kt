package com.pega.mobile.constellation.mock

import android.content.Context
import okhttp3.OkHttpClient

@Suppress("FunctionName")
fun MockHttpClient(context: Context) = OkHttpClient.Builder()
    .addInterceptor(MockInterceptor(context))
    .build()