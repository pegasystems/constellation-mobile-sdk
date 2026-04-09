package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonPrimitive
import kotlinx.serialization.json.JsonObject

class MultiselectComponent(context: ComponentContext) : SelectableComponent(context) {
    var selectedKeys: List<String> by mutableStateOf(emptyList())
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        selectedKeys = props["selectedKeys"]?.jsonArray
            ?.map { it.jsonPrimitive.content }
            ?: emptyList()
    }

    fun addSelection(key: String) {
        if (selectedKeys.contains(key)) return
        selectedKeys = selectedKeys + key
        context.sendComponentEvent(ComponentEvent.multiselectAddItem(key))
    }

    fun removeSelection(key: String) {
        if (!selectedKeys.contains(key)) return
        selectedKeys = selectedKeys - key
        context.sendComponentEvent(ComponentEvent.multiselectRemoveItem(key))
    }
}

private fun ComponentEvent.Companion.multiselectAddItem(key: String) =
    ComponentEvent("MultiselectEvent", eventData = mapOf("type" to "addItem", "key" to key))

private fun ComponentEvent.Companion.multiselectRemoveItem(key: String) =
    ComponentEvent("MultiselectEvent", eventData = mapOf("type" to "removeItem", "key" to key))