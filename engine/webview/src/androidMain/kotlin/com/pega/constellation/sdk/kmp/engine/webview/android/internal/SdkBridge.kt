package com.pega.constellation.sdk.kmp.engine.webview.android.internal

import android.webkit.JavascriptInterface
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.api.ComponentType
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent.AddComponent
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent.OnCancelled
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent.OnError
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent.OnFinished
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent.OnReady
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent.RemoveComponent
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent.SetRequestBody
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent.UpdateComponent
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject

@Suppress("unused")
internal class SdkBridge(private val handler: BridgeEventHandler) {
    @JavascriptInterface
    fun addComponent(id: Int, type: String) = handle(
        AddComponent(
            id = ComponentId(id),
            type = ComponentType(type)
        )
    )

    @JavascriptInterface
    fun removeComponent(id: Int) = handle(RemoveComponent(ComponentId(id)))

    @JavascriptInterface
    fun updateComponent(id: Int, propsJson: String) = handle(
        UpdateComponent(
            id = ComponentId(id),
            propsJson = Json.parseToJsonElement(propsJson).jsonObject
        )
    )

    @JavascriptInterface
    fun setRequestBody(body: String) = handle(SetRequestBody(body))

    @JavascriptInterface
    fun onReady() = handle(OnReady)

    @JavascriptInterface
    fun onFinished(successMessage: String?) = handle(OnFinished(successMessage))

    @JavascriptInterface
    fun onCancelled() = handle(OnCancelled)

    @JavascriptInterface
    fun onError(error: String?) = handle(OnError(error))

    private fun handle(event: BridgeEvent) = handler.handle(event)

    fun interface BridgeEventHandler {
        fun handle(event: BridgeEvent)
    }

    sealed class BridgeEvent {
        data class AddComponent(val id: ComponentId, val type: ComponentType) : BridgeEvent()
        data class RemoveComponent(val id: ComponentId) : BridgeEvent()
        data class UpdateComponent(val id: ComponentId, val propsJson: JsonObject) : BridgeEvent()
        data class SetRequestBody(val body: String) : BridgeEvent()
        data object OnReady : BridgeEvent()
        data class OnFinished(val successMessage: String?) : BridgeEvent()
        data object OnCancelled : BridgeEvent()
        data class OnError(val error: String?) : BridgeEvent()
    }
}
