package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.components.core.BaseComponent
import com.pega.constellation.sdk.kmp.core.components.core.Component
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentId
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.ui.components.cmp.containers.Column
import kotlinx.serialization.json.JsonObject

class SimpleTableComponent(context: ComponentContext) : BaseComponent(context) {
    // Child component is FieldGroupTemplateComponent
    // We will also support ListViewComponent and SimpleTableManualComponent
    var child: Component? by mutableStateOf(null)
        private set

    override fun onUpdate(props: JsonObject) {
        val childId = props.getString("child").toInt()
        child = context.componentManager.getComponent(ComponentId(childId))
    }
}

class SimpleTableRenderer : ComponentRenderer<SimpleTableComponent> {
    @Composable
    override fun SimpleTableComponent.Render() {
        Column {
            child?.Render()
        }
    }
}
