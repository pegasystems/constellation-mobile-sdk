package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.Component
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import com.pega.constellation.sdk.kmp.core.components.getInt
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getJsonObject
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.core.components.optString
import kotlinx.serialization.json.JsonObject

class FieldGroupTemplateComponent(context: ComponentContext) : ContainerComponent(context) {
    var items by mutableStateOf(emptyList<Item>())
        private set
    var label by mutableStateOf("")
        private set
    var showLabel by mutableStateOf(true)
        private set
    var allowAddItems by mutableStateOf(false)
        private set
    var addButtonLabel by mutableStateOf("")
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        items = props.getJSONArray("items")
            .mapWithIndex { getJsonObject(it) }
            .mapNotNull { itemJson ->
                val componentId = ComponentId(itemJson.getString("componentId").toInt())
                children.firstOrNull { it.context.id == componentId }?.let {
                    Item(
                        id = itemJson.getInt("id"),
                        pyReference = itemJson.optString("pyReference"),
                        heading = itemJson.getString("heading"),
                        component = it,
                        // TODO: perhaps make allowEdit configurable through Pega?
                        allowEdit = itemJson.optString("pyReference").isNotEmpty(),
                        allowDelete = itemJson.getBoolean("allowDelete"),
                    )
                }
            }
        label = props.getString("label")
        showLabel = props.getString("showLabel").toBoolean()
        allowAddItems = props.getBoolean("allowAddItems")
        addButtonLabel = props.getString("addButtonLabel")
    }

    fun addItem() = context.sendComponentEvent(ComponentEvent.fieldGroupAddItem())
    // TODO: maybe this lookup and call should be implemented on some other layer (or by the consumer app)?
    fun editItem(item: Item) {
        val assignmentComponent = context.componentManager.getComponents()
            .find { it.context.type == ComponentTypes.Assignment } as? AssignmentComponent
        println("item.pyReference: ${item.pyReference}, assignmentComponent: $assignmentComponent")
        assignmentComponent?.navigateToStep(item.pyReference)
    }
    fun deleteItem(item: Item) =
        context.sendComponentEvent(ComponentEvent.fieldGroupDeleteItem(item.id))

    data class Item(
        val id: Int,
        val pyReference: String,
        val heading: String,
        val component: Component,
        val allowEdit: Boolean,
        val allowDelete: Boolean
    )
}

private fun ComponentEvent.Companion.fieldGroupAddItem() =
    ComponentEvent("FieldGroupTemplateEvent", eventData = mapOf("type" to "addItem"))

private fun ComponentEvent.Companion.fieldGroupDeleteItem(itemId: Int) =
    ComponentEvent(
        "FieldGroupTemplateEvent",
        eventData = mapOf("type" to "deleteItem", "itemId" to itemId.toString())
    )
