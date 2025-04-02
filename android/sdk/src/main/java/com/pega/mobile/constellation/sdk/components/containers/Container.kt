package com.pega.mobile.constellation.sdk.components.containers

import androidx.annotation.CallSuper
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.Component
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentId
import com.pega.mobile.constellation.sdk.components.core.ComponentViewModel
import com.pega.mobile.constellation.sdk.components.mapWithIndex
import org.json.JSONObject

abstract class ContainerComponent(context: ComponentContext) : BaseComponent(context) {
    abstract override val viewModel: ContainerViewModel

    @CallSuper
    override fun onUpdate(props: JSONObject) {
        viewModel.children = getChildren(props)
    }

    private fun getChildren(props: JSONObject): List<Component> {
        val children = props.getJSONArray("children")
        val ids = children.mapWithIndex { getString(it).toInt() }
        return context.componentManager.getComponents(ids.map { ComponentId(it) })
    }
}

abstract class ContainerViewModel : ComponentViewModel {
    var children: List<Component> by mutableStateOf(emptyList())
}
