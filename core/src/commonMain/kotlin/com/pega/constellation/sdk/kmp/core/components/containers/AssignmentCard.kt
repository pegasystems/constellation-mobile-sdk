package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.core.components.optBoolean
import com.pega.constellation.sdk.kmp.core.components.widgets.ActionButtonsComponent
import com.pega.constellation.sdk.kmp.core.internal.ComponentManagerImpl.Companion.getComponentTyped
import kotlinx.serialization.json.JsonObject

class AssignmentCardComponent(context: ComponentContext) : ContainerComponent(context) {
    var actionButtons: ActionButtonsComponent? by mutableStateOf(null)
        private set
    var loading by mutableStateOf(true)
        private set

    override fun onUpdate(props: JsonObject) {
        super.onUpdate(props)
        val actionButtonsId = ComponentId(props.getString("actionButtons").toInt())
        actionButtons = context.componentManager.getComponentTyped(actionButtonsId)
        loading = props.optBoolean("loading", false)
    }
}
