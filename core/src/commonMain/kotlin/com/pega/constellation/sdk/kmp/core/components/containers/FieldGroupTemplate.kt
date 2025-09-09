package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import kotlinx.serialization.json.JsonObject
import com.pega.constellation.sdk.kmp.core.components.core.BaseComponent
import com.pega.constellation.sdk.kmp.core.components.core.Component
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentId
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.core.Render
import com.pega.constellation.sdk.kmp.core.components.getInt
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getJsonObject
import com.pega.constellation.sdk.kmp.core.components.getString

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

class FieldGroupTemplateRenderer : ComponentRenderer<FieldGroupTemplateComponent> {
    @Composable
    override fun FieldGroupTemplateComponent.Render() {
        Column(modifier = Modifier.fillMaxWidth()) {
            items.forEach {
                Column {
                    Text(it.heading, fontSize = 16.sp, fontWeight = FontWeight.Bold)
                    it.component.Render()
                }
            }
        }
    }
}
