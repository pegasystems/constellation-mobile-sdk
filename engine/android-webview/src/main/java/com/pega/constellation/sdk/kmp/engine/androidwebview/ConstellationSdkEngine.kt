package com.pega.constellation.sdk.kmp.engine.androidwebview

import android.content.Context
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.engine.androidwebview.internal.webview.SdkWebViewEngine
import okhttp3.OkHttpClient
import java.util.concurrent.TimeUnit

fun buildAndroidConstellationSdkEngine(
    context: Context,
    config: ConstellationSdkConfig,
    handler: EngineEventHandler,
    okHttpClient: OkHttpClient = defaultHttpClient()
): ConstellationSdkEngine = SdkWebViewEngine(context, config, okHttpClient, handler)

fun defaultHttpClient() = OkHttpClient.Builder()
    .connectTimeout(30, TimeUnit.SECONDS)
    .readTimeout(30, TimeUnit.SECONDS)
    .writeTimeout(30, TimeUnit.SECONDS)
    .build()
