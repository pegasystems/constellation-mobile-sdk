package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.BaseComponent
import com.pega.constellation.sdk.kmp.core.api.Component
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.components.getInt
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getJsonObject
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonObject

class FieldGroupTemplateComponent(context: ComponentContext) : BaseComponent(context) {
    var items by mutableStateOf(emptyList<Item>())
        private set

    override fun onUpdate(props: JsonObject) {
        items = props.getJSONArray("items")
            .mapWithIndex { getJsonObject(it) }
            .mapNotNull { itemJson ->
                val componentId = itemJson.getString("componentId")
                context.componentManager.getComponent(ComponentId(componentId.toInt()))
                    ?.let { component ->
                        Item(
                            id = itemJson.getInt("id"),
                            heading = itemJson.getString("heading"),
                            component = component
                        )
                    }
            }
    }

    data class Item(val id: Int, val heading: String, val component: Component)
}
