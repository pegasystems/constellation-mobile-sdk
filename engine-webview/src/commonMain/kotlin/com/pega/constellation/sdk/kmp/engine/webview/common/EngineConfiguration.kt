package com.pega.constellation.sdk.kmp.engine.webview.common

import com.pega.constellation.sdk.kmp.core.ConstellationSdkAction
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
internal data class EngineConfiguration(
    val url: String,
    val version: String,
    val action: ConstellationSdkAction,
    val debuggable: Boolean
) {
    fun toJsonString(): String = Json.encodeToString(this)
}