package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.BaseComponent
import com.pega.constellation.sdk.kmp.core.api.Component
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject

class SimpleTableManualComponent(context: ComponentContext) : BaseComponent(context) {
    var visible by mutableStateOf(false)
        private set
    var label: String by mutableStateOf("")
        private set
    var displayMode by mutableStateOf(DisplayMode.DISPLAY_ONLY)
        private set
    var allowAddRows by mutableStateOf(true)
        private set
    var allowReorderRows by mutableStateOf(true)
        private set
    var addButtonLabel by mutableStateOf("")
        private set
    var columnNames by mutableStateOf(emptyList<String>())
        private set
    var rows by mutableStateOf(emptyList<Row>())
        private set

    override fun applyProps(props: JsonObject) {
        visible = props.getBoolean("visible")
        label = props.getString("label")
        displayMode = DisplayMode.valueOf(props.getString("displayMode"))
        allowAddRows = props.getBoolean("allowAddRows")
        allowReorderRows = props.getBoolean("allowReorderRows")
        addButtonLabel = props.getString("addButtonLabel")
        columnNames = getColumnNames(props)
        rows = getRows(props)
    }

    private fun getColumnNames(props: JsonObject): List<String> {
        val columnsJsonArray = props.getJSONArray("columnLabels")
        return columnsJsonArray.mapWithIndex { getString(it) }
    }


    private fun getRows(props: JsonObject): List<Row> =
        props.getJSONArray("rows").map { jsonElement ->
            val rowJsonObject = jsonElement.jsonObject
            val componentIds = rowJsonObject.getJSONArray("cellComponentIds")
            val ids = componentIds.mapWithIndex { getString(it).toInt() }
            val cellComponents = context.componentManager.getComponents(ids.map { ComponentId(it) })
            Row(
                cells = cellComponents.map { Cell(it) },
                showEditButton = rowJsonObject.getBoolean("showEditButton"),
                showDeleteButton = rowJsonObject.getBoolean("showDeleteButton")
            )
        }

    fun addRow() = context.sendComponentEvent(simpleTableManualAddRowEvent())

    fun deleteRow(rowId: Int) =
        context.sendComponentEvent(simpleTableManualDeleteRowEvent(rowId))

    fun reorderRow(fromIndex: Int, toIndex: Int) =
        context.sendComponentEvent(simpleTableManualReorderRowEvent(fromIndex, toIndex))

    fun editRowInModal(rowId: Int) =
        context.sendComponentEvent(simpleTableManualEditRowInModalEvent(rowId))

    fun addRowInModal() =
        context.sendComponentEvent(simpleTableManualAddRowInModalEvent())

    private fun simpleTableManualAddRowEvent() =
        ComponentEvent("SimpleTableManualEvent", eventData = mapOf("type" to "addRow"))

    private fun simpleTableManualDeleteRowEvent(itemId: Int) =
        ComponentEvent(
            "SimpleTableManualEvent",
            eventData = mapOf("type" to "deleteRow", "rowId" to itemId.toString())
        )

    private fun simpleTableManualReorderRowEvent(fromIndex: Int, toIndex: Int) =
        ComponentEvent(
            "SimpleTableManualEvent", eventData = mapOf(
                "type" to "reorderRow",
                "fromIndex" to fromIndex.toString(), "toIndex" to toIndex.toString()
            )
        )

    private fun simpleTableManualEditRowInModalEvent(rowId: Int) =
        ComponentEvent(
            "SimpleTableManualEvent", eventData = mapOf(
                "type" to "editRowInModal",
                "rowId" to rowId.toString()
            )
        )

    private fun simpleTableManualAddRowInModalEvent() =
        ComponentEvent(
            "SimpleTableManualEvent", eventData = mapOf(
                "type" to "addRowInModal"
            )
        )

    data class Row(
        val cells: List<Cell>,
        val showEditButton: Boolean,
        val showDeleteButton: Boolean
    )

    data class Cell(val component: Component)

    enum class DisplayMode {
        DISPLAY_ONLY, EDITABLE_IN_MODAL, EDITABLE_IN_ROW
    }
}
