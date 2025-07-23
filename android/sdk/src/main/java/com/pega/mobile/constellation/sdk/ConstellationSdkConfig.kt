package com.pega.mobile.constellation.sdk

import com.pega.mobile.constellation.sdk.components.core.ComponentManager
import okhttp3.OkHttpClient
import java.util.concurrent.TimeUnit

/**
 * Configuration of Pega Constellation Mobile SDK.
 *
 * @param pegaUrl URL to Pega server
 * @param pegaVersion version of Pega server e.g.: *24.1.0*. Determines Constellation Core JS library version used by SDK.
 * @param okHttpClient (optional) - instance of OkHttpClient used for Pega DX API communication.
 * @param componentManager (optional) - instance of ComponentManager which is responsible for providing component definitions and manages them in the runtime
 * @param debuggable (optional) - flag which allows for debugging of underlying WebView engine
 */
data class ConstellationSdkConfig(
    val pegaUrl: String,
    val pegaVersion: String,
    val okHttpClient: OkHttpClient = defaultHttpClient(),
    val componentManager: ComponentManager = ComponentManager.create(),
    val debuggable: Boolean = false
) {
    internal var nonDxOkHttpClient: OkHttpClient = defaultHttpClient()

    companion object {
        fun defaultHttpClient() = OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .build()
    }
}
