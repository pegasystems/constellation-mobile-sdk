package com.pega.constellation.sdk.kmp.engine.androidwebview

import android.content.Context
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.engine.androidwebview.internal.webview.SdkWebViewEngine

fun buildAndroidConstellationSdkEngine(
    context: Context,
    config: ConstellationSdkConfig,
    handler: EngineEventHandler
): ConstellationSdkEngine = SdkWebViewEngine(context, config, handler)
