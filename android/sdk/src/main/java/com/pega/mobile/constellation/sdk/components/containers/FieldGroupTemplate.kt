package com.pega.mobile.constellation.sdk.components.containers

import android.util.Log
import androidx.compose.material3.Text
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

class FieldGroupTemplateComponent(context: ComponentContext) : BaseComponent(context) {
    var items by mutableStateOf(emptyList<Item>())
        private set

    override fun onUpdate(props: JSONObject) {
        Log.d("FieldGroupTemplateComponent", "props: $props")
        val itemsJsonList = props.getJSONArray("items").mapWithIndex { getJSONObject(it) }
        items = itemsJsonList.mapNotNull { itemJson ->
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

    companion object {
        private const val TAG = "FieldGroupTemplateComponent"
    }
}

class FieldGroupTemplateRenderer : ComponentRenderer<FieldGroupTemplateComponent> {
    @Composable
    override fun FieldGroupTemplateComponent.Render() {
        Column {
            Text("FieldGroupTemplate")
            items.forEach {
                Column {
                    Text("${it.id}: ${it.heading}")
                    it.component.Render()
                }

            }
        }
    }
}
