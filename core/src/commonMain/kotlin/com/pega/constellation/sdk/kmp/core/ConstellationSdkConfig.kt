package com.pega.constellation.sdk.kmp.core

import com.pega.constellation.sdk.kmp.core.api.ComponentManager

//import okhttp3.OkHttpClient
//import java.util.concurrent.TimeUnit

/**
 * Configuration of Pega Constellation Mobile SDK.
 *
 * @param pegaUrl URL to Pega server
 * @param pegaVersion version of Pega server e.g.: *24.1.0*. Determines Constellation Core JS library version used by SDK.
 * @param componentManager (optional) - instance of ComponentManager which is responsible for providing component definitions and manages them in the runtime
 * @param debuggable (optional) - flag which allows for debugging of underlying WebView engine
 */
data class ConstellationSdkConfig(
    val pegaUrl: String,
    val pegaVersion: String,
    val componentManager: ComponentManager = ComponentManager.create(),
    val debuggable: Boolean = false
)
