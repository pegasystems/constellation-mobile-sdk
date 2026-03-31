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
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class ListViewComponent(context: ComponentContext) : BaseComponent(context) {
    enum class SelectionMode { SINGLE, MULTI }
    data class Item(val data: Map<String, String>, val selected: Boolean)

    var label by mutableStateOf("")
        private set
    var selectionMode by mutableStateOf(SINGLE)
        private set
    var columnNames by mutableStateOf(emptyList<String>())
        private set
    var columnLabels by mutableStateOf(emptyList<String>())
        private set
    var items by mutableStateOf(emptyList<Item>())
        private set

    override fun applyProps(props: JsonObject) {
        label = props.getString("label")
        selectionMode = props.selectionMode()
        columnNames = props.getJSONArray("columnNames").map { it.jsonPrimitive.content }
        columnLabels = props.getJSONArray("columnLabels").map { it.jsonPrimitive.content }
        items = props.getJSONArray("items")
            .map {
                Item(
                    data = it.toFoldedItemContent(emptyMap(), ""),
                    selected = it.jsonObject.getBoolean("selected")
                )
            }
    }

    fun onItemClick(itemIndex: Int, isSelected: Boolean) {
        context.sendComponentEvent(clickItemEvent(itemIndex, isSelected))
    }

    private fun clickItemEvent(itemIndex: Int, isSelected: Boolean) =
        ComponentEvent(
            type = CLICK_ITEM_EVENT,
            componentData = mapOf(
                "clickedItemIndex" to itemIndex.toString(),
                "isSelected" to isSelected.toString()
            )
        )

    private fun JsonObject.selectionMode() =
        getString("selectionMode").toSelectionMode()

    private fun JsonElement.toFoldedItemContent(
        initialResult: Map<String, String>,
        currentPath: String
    ): Map<String, String> =
        when (this) {
            is JsonObject -> jsonObject.entries.fold(initialResult) { accumulator, element ->
                val nextPath = if (currentPath.isNotEmpty()) {
                    "$currentPath.${element.key}"
                } else {
                    element.key
                }
                element.value.toFoldedItemContent(accumulator, nextPath)
            }
            is JsonArray -> jsonArray.foldIndexed(initialResult) { index, accumulator, element ->
                element.toFoldedItemContent(accumulator, "$currentPath[$index]")
            }
            else -> initialResult + mapOf(currentPath to jsonPrimitive.content)
        }

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
        private const val CLICK_ITEM_EVENT = "ClickItem"
    }
}
