package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.annotation.CallSuper
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.BaseComponent
import com.pega.constellation.sdk.kmp.core.api.Component
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonObject

abstract class ContainerComponent(context: ComponentContext) : BaseComponent(context) {
    var children: List<Component> by mutableStateOf(emptyList())
        private set

    @CallSuper
    override fun applyProps(props: JsonObject) {
        children = getChildren(props)
    }

    private fun getChildren(props: JsonObject): List<Component> {
        val children = props.getJSONArray("children")
        val ids = children.mapWithIndex { getString(it).toInt() }
        return context.componentManager.getComponents(ids.map { ComponentId(it) })
    }
}
