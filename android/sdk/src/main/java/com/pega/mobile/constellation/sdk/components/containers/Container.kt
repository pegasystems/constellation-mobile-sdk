package com.pega.mobile.constellation.sdk.components.containers

import androidx.annotation.CallSuper
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.Component
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentId
import com.pega.mobile.constellation.sdk.components.core.ComponentState
import com.pega.mobile.constellation.sdk.components.mapWithIndex
import org.json.JSONObject

abstract class ContainerComponent(context: ComponentContext) : BaseComponent(context) {
    abstract override val state: ContainerState

    @CallSuper
    override fun onUpdate(props: JSONObject) {
        state.children = getChildren(props)
    }

    private fun getChildren(props: JSONObject): List<Component> {
        val children = props.getJSONArray("children")
        val ids = children.mapWithIndex { getString(it).toInt() }
        return context.componentManager.getComponents(ids.map { ComponentId(it) })
    }
}

abstract class ContainerState : ComponentState {
    var children: List<Component> by mutableStateOf(emptyList())
}
