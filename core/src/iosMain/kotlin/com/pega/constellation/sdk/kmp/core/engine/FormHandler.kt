package com.pega.constellation.sdk.kmp.core.engine

import com.pega.constellation.sdk.kmp.core.EngineEvent
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.api.ComponentManager
import com.pega.constellation.sdk.kmp.core.api.ComponentType
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.SharedFlow
import platform.WebKit.*
import platform.darwin.NSObject

class FormHandler(
    private val eventHandler: EngineEventHandler,
    private val componentManager: ComponentManager
) : NSObject(), WKScriptMessageHandlerProtocol {

    private val passthroughSubject = MutableSharedFlow<ComponentEvent>(extraBufferCapacity = 64)
    val eventStream: SharedFlow<ComponentEvent> = passthroughSubject

    override fun userContentController(
        userContentController: WKUserContentController,
        didReceiveScriptMessage: WKScriptMessage
    ) {
        val array = didReceiveScriptMessage.body as? List<Any?> ?: run {
            println("iosMain :: DefaultProvider :: Can not decode message")
            return
        }
        val type = array.getOrNull(0) as? String ?: run {
            println("iosMain :: DefaultProvider :: Can not decode message type")
            return
        }
        println("iosMain :: DefaultProvider :: Received $type")
        when (type) {
            "updateComponent" -> handleUpdateComponent(array)
            "addComponent" -> handleAddComponent(array)
            "removeComponent" -> handleRemoveComponent(array)
            "ready" -> eventHandler.handle(EngineEvent.Ready)
            "finished" -> eventHandler.handle(EngineEvent.Finished(array.getOrNull(1) as? String))
            "cancelled" -> eventHandler.handle(EngineEvent.Cancelled)
            "error" -> eventHandler.handle(EngineEvent.Error(array.getOrNull(1) as? String))
            else -> println("iosMain :: DefaultProvider :: Unexpected message type: $type")
        }
    }

    fun handleLoading() {
        eventHandler.handle(EngineEvent.Loading)
    }

    private fun handleUpdateComponent(input: List<Any?>) {

        val cId = input.componentId
        val props = input.getOrNull(2) as? String
        if (cId != null && props != null) {
            componentManager.updateComponent(ComponentId(cId), props)
        } else {
            println("iosMain :: DefaultProvider :: Unexpected parameters types in updateComponent")
        }
    }

    private fun handleAddComponent(input: List<Any?>) {
        val cId = input.componentId
        val cType = input.getOrNull(2) as? String
        if (cId == null || cType == null) {
            println("iosMain :: DefaultProvider :: Unexpected input for addComponent.")
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
            println("iosMain :: DefaultProvider :: Unexpected input for removeComponent.")
            return
        }
        componentManager.removeComponent(ComponentId(cId))
    }
}

// Extension for componentId extraction
val List<Any?>.componentId: Int?
    get() = when (val value = this.getOrNull(1)) {
        is Int -> value
        is String -> value.toIntOrNull()
        else -> null
    }

