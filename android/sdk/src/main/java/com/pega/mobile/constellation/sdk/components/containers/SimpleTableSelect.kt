package com.pega.mobile.constellation.sdk.components.containers

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.Component
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentId
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.dxcomponents.compose.containers.Column
import org.json.JSONObject

class SimpleTableSelectComponent(context: ComponentContext) : BaseComponent(context) {
    var child: Component? by mutableStateOf(null)
        private set

    override fun onUpdate(props: JSONObject) {
        val childId = props.getString("child").toInt()
        child = context.componentManager.getComponent(ComponentId(childId))
    }
}

class SimpleTableSelectRenderer : ComponentRenderer<SimpleTableSelectComponent> {
    @Composable
    override fun SimpleTableSelectComponent.Render() {
        Column {
            child?.Render()
        }
    }
}
