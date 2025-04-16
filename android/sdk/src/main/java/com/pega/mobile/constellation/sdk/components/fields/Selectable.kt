package com.pega.mobile.constellation.sdk.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import org.json.JSONObject

abstract class SelectableComponent(context: ComponentContext) : FieldComponent(context) {
    var placeholder: String by mutableStateOf("")
        private set
    var options: List<SelectableOption> by mutableStateOf(emptyList())
        private set

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        placeholder = props.getString("placeholder")
        options = props.getJSONArray("options").mapWithIndex { index ->
            getJSONObject(index).let {
                SelectableOption(it["key"].toString(), it["label"].toString())
            }
        }
    }
}

data class SelectableOption(val key: String, val label: String)
