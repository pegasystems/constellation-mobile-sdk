package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.BaseComponent
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.core.components.widgets.AlertBannerComponent
import com.pega.constellation.sdk.kmp.core.internal.ComponentManagerImpl.Companion.getComponentTyped
import kotlinx.serialization.json.JsonObject

class FlowContainerComponent(context: ComponentContext) : BaseComponent(context) {
    var title: String by mutableStateOf("")
        private set
    var assignment: AssignmentComponent? by mutableStateOf(null)
        private set
    var alertBanners: List<AlertBannerComponent> by mutableStateOf(emptyList())
        private set

    override fun applyProps(props: JsonObject) {
        val manager = context.componentManager
        val assignmentId = ComponentId(props.getString("assignment").toInt())
        val banners = props.getJSONArray("alertBanners")
        val bannersIds = banners.mapWithIndex { getString(it).toInt() }
        title = props.getString("title")
        assignment = manager.getComponentTyped(assignmentId)
        alertBanners = bannersIds.mapNotNull { manager.getComponentTyped(ComponentId(it)) }
    }
}
