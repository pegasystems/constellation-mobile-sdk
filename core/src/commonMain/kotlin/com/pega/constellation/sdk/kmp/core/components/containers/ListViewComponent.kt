package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.api.BaseComponent
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class ListViewComponent(context: ComponentContext) : BaseComponent(context) {
    var label by mutableStateOf("")
        private set
    var selectionMode by mutableStateOf(SelectionMode.SINGLE)
        private set
    var selectedItemId: ItemId? by mutableStateOf(null)
        private set
    var columnNames by mutableStateOf(emptyList<String>())
        private set
    var items by mutableStateOf(emptyList<Item>())
        private set

    override fun applyProps(props: JsonObject) {
        label = props.getString("label")
        selectionMode = SelectionMode.valueOf(props.getString("selectionMode").uppercase())
        selectedItemId = props.getValue("selectedItemId").jsonObject.toItemId()
        columnNames = props.getJSONArray("columnNames").map { it.jsonPrimitive.content }
        items = props.getJSONArray("items")
            .map { item ->
                item.jsonObject.entries
                    .associate { it.key to it.value.jsonPrimitive.content }
                    .let { Item(it) }
            }
    }

    enum class SelectionMode {
        SINGLE, MULTI
    }

    private fun JsonObject.toItemId() =
        ItemId(jsonObject.getString("idName"), jsonObject.getString("idValue"))

    fun selectItem(item: Item) =
        selectedItemId?.let { currentItemId ->
            val selectedIdValue = item.data[currentItemId.name] ?: ""
            currentItemId.copy(value = selectedIdValue).let { newItemId ->
                selectedItemId = newItemId
                context.sendComponentEvent(selectItemEvent(newItemId))
            }
        } ?: Log.e(TAG, "Cannot select item due to missing itemId")

    private fun selectItemEvent(itemId: ItemId) =
        ComponentEvent(type = SELECT_SINGLE_ITEM_EVENT, mapOf("idValue" to itemId.value))


    data class Item(val data: Map<String, String>)

    data class ItemId(val name: String, val value: String)

    companion object {
        private const val TAG = "ListViewComponent"
        private const val SELECT_SINGLE_ITEM_EVENT = "SelectSingleItem"
    }
}