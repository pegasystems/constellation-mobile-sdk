package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonObject

class ViewComponent(context: ComponentContext) : ContainerComponent(context) {
    var visible: Boolean by mutableStateOf(false)
        private set
    var label: String by mutableStateOf("")
        private set
    var showLabel: Boolean by mutableStateOf(false)
        private set

    override fun onUpdate(props: JsonObject) {
        super.onUpdate(props)
        visible = props.getString("visible").toBoolean()
        label = props.getString("label")
        showLabel = props.getString("showLabel").toBoolean()
    }
}
