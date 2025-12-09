package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.core.components.widgets.AlertBannerComponent
import com.pega.constellation.sdk.kmp.core.internal.ComponentManagerImpl.Companion.getComponentTyped
import kotlinx.serialization.json.JsonObject

class ModalViewContainerComponent(context: ComponentContext) : ContainerComponent(context) {
    var visible by mutableStateOf(false)
    var title by mutableStateOf("")
        private set
    var cancelButtonLabel by mutableStateOf("")
        private set
    var submitButtonLabel by mutableStateOf("")
        private set
    var alertBanners: List<AlertBannerComponent> by mutableStateOf(emptyList())
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        visible = props.getBoolean("visible")
        title = props.getString("title")
        cancelButtonLabel = props.getString("cancelLabel")
        submitButtonLabel = props.getString("submitLabel")
        val banners = props.getJSONArray("alertBanners")
        val bannersIds = banners.mapWithIndex { getString(it).toInt() }
        alertBanners =
            bannersIds.mapNotNull { context.componentManager.getComponentTyped(ComponentId(it)) }
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
