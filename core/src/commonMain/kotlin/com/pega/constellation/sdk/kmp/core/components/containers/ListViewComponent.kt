package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.api.BaseComponent
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.ActionButtons
import com.pega.constellation.sdk.kmp.core.components.containers.ListViewComponent.SelectionMode.MULTI
import com.pega.constellation.sdk.kmp.core.components.containers.ListViewComponent.SelectionMode.SINGLE
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.core.components.widgets.ActionButtonsComponent
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

class ListViewComponent(context: ComponentContext) : BaseComponent(context) {
    enum class SelectionMode { SINGLE, MULTI }
    data class Item(val data: Map<String, String>)

    var label by mutableStateOf("")
        private set
    var selectionMode by mutableStateOf(SINGLE)
        private set
    var selectedItemIndex: Int? by mutableStateOf(null)
        private set
    var columnNames by mutableStateOf(emptyList<String>())
        private set
    var columnLabels by mutableStateOf(emptyList<String>())
        private set
    var items by mutableStateOf(emptyList<Item>())
        private set
    private var selectedItemIndexToSubmit: Int? = null
    var updateIndex by mutableStateOf(0L)
        private set

    override fun applyProps(props: JsonObject) {
        label = props.getString("label")
        if (props.selectionMode() != SINGLE) {
            Log.w(TAG, "Only SINGLE selection mode is supported. Defaulting to SINGLE.")
        }
        selectionMode = SINGLE
        selectedItemIndex = props.getIntOrNull("selectedItemIndex")
        columnNames = props.getJSONArray("columnNames").map { it.jsonPrimitive.content }
        columnLabels = props.getJSONArray("columnLabels").map { it.jsonPrimitive.content }
        items = props.getJSONArray("items")
            .map {
                Item(it.toFoldedItemContent(emptyMap(), ""))
            }
        ++updateIndex
    }

    fun onItemSelected(itemIndex: Int) {
        selectedItemIndex = itemIndex
        context.sendComponentEvent(itemSelectedEvent(itemIndex))
    }

    fun setValueToAutoSubmit(selectedItemIndex: Int) {
        selectedItemIndexToSubmit = selectedItemIndex
    }

    fun checkAutoSubmit() {
        if (selectedItemIndexToSubmit != null && selectedItemIndex == selectedItemIndexToSubmit) {
            selectedItemIndexToSubmit = null
            val actionButtons = context.componentManager.getComponents()
                .first { it.context.type == ActionButtons } as? ActionButtonsComponent
            actionButtons?.primaryButtons?.firstOrNull()?.let {
                actionButtons.onClick(it)
            }
        }
    }

    private fun itemSelectedEvent(itemIndex: Int) =
        ComponentEvent(
            type = SELECT_SINGLE_ITEM_EVENT,
            mapOf("selectedItemIndex" to itemIndex.toString())
        )


    private fun JsonObject.selectionMode() =
        getString("selectionMode").toSelectionMode()

    private fun JsonObject.getIntOrNull(key: String): Int? =
        get(key)?.jsonPrimitive?.content?.takeIf { it.isNotBlank() }?.toIntOrNull()

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
        private const val SELECT_SINGLE_ITEM_EVENT = "SelectSingleItem"
    }
}
