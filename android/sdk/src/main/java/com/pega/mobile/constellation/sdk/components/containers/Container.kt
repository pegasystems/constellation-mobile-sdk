package com.pega.mobile.constellation.sdk.components.containers

import androidx.annotation.CallSuper
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.Component
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentId
import org.json.JSONObject

abstract class ContainerComponent(context: ComponentContext) : BaseComponent(context) {
    var children: List<Component> by mutableStateOf(emptyList())
        private set

    @CallSuper
    override fun onUpdate(props: JSONObject) {
        children = getChildren(props)
    }

    private fun getChildren(props: JSONObject): List<Component> {
        val children = props.getJSONArray("children")
        val ids = children.mapWithIndex { getString(it).toInt() }
        return context.componentManager.getComponents(ids.map { ComponentId(it) })
    }
}
