package com.pega.constellation.sdk.kmp.engine.androidwebview

import android.content.Context
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.engine.androidwebview.internal.webview.SdkWebViewEngine
import okhttp3.OkHttpClient
import java.util.concurrent.TimeUnit

/**
 * Builds instance of [ConstellationSdkEngine] for Android platform based on WebView engine.
 *
 * @param context Android context
 * @param config configuration of Pega Constellation Mobile SDK
 * @param handler event handler which receives events from the engine
 * @param okHttpClient (optional) - OkHttp client used by the engine for network requests. If not provided, default client will be used.
 *
 * @return instance of [ConstellationSdkEngine]
 */
fun buildAndroidConstellationSdkEngine(
    context: Context,
    config: ConstellationSdkConfig,
    handler: EngineEventHandler,
    okHttpClient: OkHttpClient = defaultHttpClient()
): ConstellationSdkEngine = SdkWebViewEngine(context, config, handler, okHttpClient)

fun defaultHttpClient() = OkHttpClient.Builder()
    .connectTimeout(30, TimeUnit.SECONDS)
    .readTimeout(30, TimeUnit.SECONDS)
    .writeTimeout(30, TimeUnit.SECONDS)
    .build()
