package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getJsonObject
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.core.components.optBoolean
import com.pega.constellation.sdk.kmp.core.components.optString
import kotlinx.serialization.json.JsonObject

class CheckboxComponent(context: ComponentContext) : FieldComponent(context) {
    var caption: String by mutableStateOf("")
        private set
    var trueLabel: String by mutableStateOf("True")
        private set
    var falseLabel: String by mutableStateOf("False")
        private set
    var hideLabel: Boolean by mutableStateOf(false)
        private set

    var selectionMode: SelectionMode by mutableStateOf(SelectionMode.SINGLE)
        private set
    var checkboxGroupOptions: List<Option> by mutableStateOf(emptyList())
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)

        selectionMode = SelectionMode.valueOf(
            props.optString("selectionMode", default = "single").uppercase()
        )
        if (selectionMode == SelectionMode.SINGLE) {
            caption = props.optString("caption")
            trueLabel = props.optString("trueLabel", default = "True")
            falseLabel = props.optString("falseLabel", default = "False")
            hideLabel = props.optBoolean("hideLabel", default = false)
        } else {
            checkboxGroupOptions = props.getJSONArray("items").mapWithIndex { index ->
                getJsonObject(index).let {
                    Option(
                        key = it.getString("key"),
                        text = it.getString("text"),
                        value = it.getString("value"),
                        selected = it.getBoolean("selected"))
                }
            }
        }
    }

    fun onOptionClick(itemIndex: Int, isSelected: Boolean) {
        context.sendComponentEvent(ComponentEvent.forItemClick(itemIndex, isSelected))
    }

    data class Option(
        val key: String,
        val text: String,
        val value: String,
        val selected: Boolean
    )

    enum class SelectionMode {
        SINGLE, MULTI
    }
}
