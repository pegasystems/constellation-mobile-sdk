package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonObject

class ModalViewContainerComponent(context: ComponentContext) : ContainerComponent(context) {
    var visible by mutableStateOf(false)
    var title by mutableStateOf("")
        private set
    var cancelButtonLabel by mutableStateOf("")
        private set
    var submitButtonLabel by mutableStateOf("")
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        visible = props.getBoolean("visible")
        title = props.getString("title")
        cancelButtonLabel = props.getString("cancelLabel")
        submitButtonLabel = props.getString("submitLabel")
    }

    fun onCancelClick() {
        context.sendComponentEvent(cancelEvent())
    }

    fun onSubmitClick() {
        context.sendComponentEvent(submitEvent())
    }

    fun cancelEvent() = ComponentEvent(
        type = "ModalViewContainerEvent",
        eventData = mapOf("type" to "cancel")
    )
    fun submitEvent() = ComponentEvent(
        type = "ModalViewContainerEvent",
        eventData = mapOf("type" to "submit")
    )
}
