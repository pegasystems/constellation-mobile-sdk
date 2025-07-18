package com.pega.mobile.constellation.sdk

import com.pega.mobile.constellation.sdk.ConstellationSdkConfig.Companion.defaultHttpClient
import com.pega.mobile.constellation.sdk.components.core.ComponentManager
import okhttp3.OkHttpClient
import java.util.concurrent.TimeUnit

/**
 * Configuration of Pega Constellation Mobile SDK.
 *
 * @param pegaUrl URL to Pega server
 * @param pegaVersion version of Pega server e.g.: *24.1.0*. Determines Constellation Core JS library version used by SDK.
 * @param httpConfig (optional) - instance of HttpConfig which contains OkHttpClient instances used for requests to Pega and non-Pega servers.
 * @param componentManager (optional) - instance of ComponentManager which is responsible for providing component definitions and manages them in the runtime
 * @param debuggable (optional) - flag which allows for debugging of underlying WebView engine
 */
data class ConstellationSdkConfig(
    val pegaUrl: String,
    val pegaVersion: String,
    val httpConfig: HttpConfig = HttpConfig(),
    val componentManager: ComponentManager = ComponentManager.create(),
    val debuggable: Boolean = false
) {
    companion object {
        fun defaultHttpClient() = OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .build()
    }
}

/**
 * Configuration of HTTP clients used by Pega Constellation Mobile SDK.
 *
 * @param pegaOkHttpClient OkHttpClient instance used for requests to Pega server
 * @param nonPegaOkHttpClient OkHttpClient instance used for requests to non-Pega servers
 */
data class HttpConfig(
    val pegaOkHttpClient: OkHttpClient = defaultHttpClient(),
    val nonPegaOkHttpClient: OkHttpClient = defaultHttpClient()
)
