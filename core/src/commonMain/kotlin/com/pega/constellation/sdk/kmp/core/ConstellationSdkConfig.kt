package com.pega.constellation.sdk.kmp.core

import com.pega.constellation.sdk.kmp.core.api.ComponentManager

/**
 * Configuration of Pega Constellation Mobile SDK.
 *
 * @param pegaUrl URL to Pega server
 * @param componentManager (optional) - instance of ComponentManager which is responsible for providing component definitions and manages them in the runtime
 * @param debuggable (optional) - flag which allows for debugging of underlying WebView engine
 */
data class ConstellationSdkConfig(
    val pegaUrl: String,
    val componentManager: ComponentManager = ComponentManager.create(),
    val debuggable: Boolean = false
)
