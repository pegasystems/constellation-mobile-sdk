package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.api.BaseComponent
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import com.pega.constellation.sdk.kmp.core.components.containers.ListViewComponent.SelectionMode.MULTI
import com.pega.constellation.sdk.kmp.core.components.containers.ListViewComponent.SelectionMode.SINGLE
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class ListViewComponent(context: ComponentContext) : BaseComponent(context) {
    enum class SelectionMode {
        SINGLE, MULTI;
    }

    var label by mutableStateOf("")
        private set
    var selectionMode by mutableStateOf(SINGLE)
        private set
    var selectedItemIndex: Int? by mutableStateOf(null)
        private set
    var columnNames by mutableStateOf(emptyList<String>())
        private set
    var items by mutableStateOf(emptyList<Item>())
        private set

    override fun applyProps(props: JsonObject) {
        label = props.getString("label")
        if (props.selectionMode() != SINGLE) {
            Log.w(TAG, "Only SINGLE selection mode is supported. Defaulting to SINGLE.")
        }
        selectionMode = SINGLE
        selectedItemIndex = props.getIntOrNull("selectedItemIndex")
        columnNames = props.getJSONArray("columnNames").map { it.jsonPrimitive.content }
        items = props.getJSONArray("items")
            .map { item ->
                item.jsonObject.entries
                    .associate { it.key to it.value.jsonPrimitive.content }
                    .let { Item(it) }
            }
    }

    fun onItemSelected(itemIndex: Int) {
        selectedItemIndex = itemIndex
        context.sendComponentEvent(itemSelectedEvent(itemIndex))
    }

    private fun itemSelectedEvent(itemIndex: Int) =
        ComponentEvent(
            type = SELECT_SINGLE_ITEM_EVENT,
            mapOf("selectedItemIndex" to itemIndex.toString())
        )

    data class Item(val data: Map<String, String>)

    private fun JsonObject.selectionMode() =
        getString("selectionMode").toSelectionMode()

    private fun JsonObject.getIntOrNull(key: String): Int? =
        get(key)?.jsonPrimitive?.content?.takeIf { it.isNotBlank() }?.toIntOrNull()

    private fun String.toSelectionMode() =
        when (this.uppercase()) {
            "SINGLE" -> SINGLE
            "MULTI" -> MULTI
            else -> {
                Log.w(TAG, "Unknown selection mode '$this', defaulting to SINGLE")
                SINGLE
            }
        }

    companion object {
        private const val TAG = "ListViewComponent"
        private const val SELECT_SINGLE_ITEM_EVENT = "SelectSingleItem"
    }
}