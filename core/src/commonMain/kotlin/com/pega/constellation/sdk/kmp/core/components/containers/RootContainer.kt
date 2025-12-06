package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.BaseComponent
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getJsonObject
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.core.components.widgets.Dialog
import com.pega.constellation.sdk.kmp.core.internal.ComponentManagerImpl.Companion.getComponentTyped
import kotlinx.serialization.json.JsonObject

class RootContainerComponent(context: ComponentContext) : BaseComponent(context) {
    var viewContainer: ViewContainerComponent? by mutableStateOf(null)
        private set
    var httpMessages: List<String> by mutableStateOf(emptyList())
        private set
    var dialogConfig: Dialog.Config? by mutableStateOf(null)
        private set
    var modalViewContainer: ModalViewContainerComponent? by mutableStateOf(null)
        private set

    fun presentDialog(config: Dialog.Config) {
        dialogConfig = config
        notifyObservers()
    }

    fun dismissDialog() {
        dialogConfig = null
        notifyObservers()
    }

    override fun applyProps(props: JsonObject) {
        val viewContainerId = ComponentId(props.getString("viewContainer").toInt())
        viewContainer = context.componentManager.getComponentTyped(viewContainerId)
        val modalViewContainerId = ComponentId(props.getString("modalViewContainer").toInt())
        modalViewContainer = context.componentManager.getComponentTyped(modalViewContainerId)
        val httpMessagesArray = props.getJSONArray("httpMessages")
        httpMessages = httpMessagesArray.mapWithIndex {
            val httpMessage = getJsonObject(it)
            val type = httpMessage.getString("type")
            val message = httpMessage.getString("message")
            val prefix = if (type == "error") "Http error: " else ""
            prefix + message
        }
    }

    fun clearMessages() {
        httpMessages = emptyList()
    }
}
