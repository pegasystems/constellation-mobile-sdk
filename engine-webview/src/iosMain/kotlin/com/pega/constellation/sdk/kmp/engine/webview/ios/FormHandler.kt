package com.pega.constellation.sdk.kmp.engine.webview.ios

import com.pega.constellation.sdk.kmp.core.EngineEvent
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.api.ComponentManager
import com.pega.constellation.sdk.kmp.core.api.ComponentType
import com.pega.constellation.sdk.kmp.engine.webview.common.JsError
import com.pega.constellation.sdk.kmp.engine.webview.common.JsErrorType.Companion.toJsErrorType
import com.pega.constellation.sdk.kmp.engine.webview.common.toEnvironmentInfo
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import platform.WebKit.*
import platform.darwin.NSObject

private const val TAG = "FormHandler"
class FormHandler() : NSObject(), WKScriptMessageHandlerProtocol {
    lateinit var eventHandler: EngineEventHandler
    lateinit var componentManager: ComponentManager
    private val passthroughSubject = MutableSharedFlow<ComponentEvent>(extraBufferCapacity = 64)
    val eventStream: SharedFlow<ComponentEvent> = passthroughSubject

    override fun userContentController(
        userContentController: WKUserContentController,
        didReceiveScriptMessage: WKScriptMessage
    ) {
        val array = didReceiveScriptMessage.body as? List<Any?> ?: run {
            Log.w(TAG, "Cannot decode message")
            return
        }
        val type = array.getOrNull(0) as? String ?: run {
            Log.w(TAG, "Cannot decode message type")
            return
        }
        when (type) {
            "updateComponent" -> handleUpdateComponent(array)
            "addComponent" -> handleAddComponent(array)
            "removeComponent" -> handleRemoveComponent(array)
            "ready" -> handleOnReady(array)
            "finished" -> eventHandler.handle(EngineEvent.Finished(array.getOrNull(1) as? String))
            "cancelled" -> eventHandler.handle(EngineEvent.Cancelled)
            "error" -> {
                val type = array.getOrNull(1) as String
                val message = array.getOrNull(2) as String
                eventHandler.handle(EngineEvent.Error(JsError(type.toJsErrorType(), message)))
            }
            else -> Log.w(TAG, "Unexpected message type: $type")
        }
    }

    fun handleLoading() {
        eventHandler.handle(EngineEvent.Loading)
    }

    private fun handleUpdateComponent(input: List<Any?>) {
        val cId = input.componentId
        val props = input.getOrNull(2) as? String
        if (cId != null && props != null) {
            val propsJson = Json.parseToJsonElement(props).jsonObject
            componentManager.updateComponent(ComponentId(cId), propsJson)
        } else {
            Log.w(TAG, "Unexpected parameters types in updateComponent")
        }
    }

    private fun handleAddComponent(input: List<Any?>) {
        val cId = input.componentId
        val cType = input.getOrNull(2) as? String
        if (cId == null || cType == null) {
            Log.w(TAG, "Unexpected input for addComponent.")
            return
        }

        val context = WKWebViewEngineComponentContext(
            ComponentId(cId),
            ComponentType(cType),
            componentManager) { eventContent ->
                passthroughSubject.tryEmit(ComponentEvent(cId, eventContent))
        }
        componentManager.addComponent(context)
    }

    private fun handleRemoveComponent(input: List<Any?>) {
        val cId = input.componentId
        if (cId == null) {
            Log.w(TAG, "Unexpected input for removeComponent.")
            return
        }
        componentManager.removeComponent(ComponentId(cId))
    }

    private fun handleOnReady(input: List<Any?>) {
        (input.getOrNull(1) as? String)?.let {
            val envInfoJson = Json.parseToJsonElement(it).jsonObject
            eventHandler.handle(EngineEvent.Ready(envInfoJson.toEnvironmentInfo()))
        } ?: Log.w(TAG, "Unexpected input for onReady")
    }
}

val List<Any?>.componentId: Int?
    get() = when (val value = this.getOrNull(1)) {
        is Int -> value
        is String -> value.toIntOrNull()
        else -> null
    }

