package com.pega.mobile.constellation.sdk.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import org.json.JSONObject

abstract class SelectableComponent(context: ComponentContext) : FieldComponent(context) {
    var options: List<SelectableOption> by mutableStateOf(emptyList())
        private set

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        options = props.getJSONArray("options").mapWithIndex { index ->
            getJSONObject(index).let {
                SelectableOption(it.getString("key"), it.getString("label"))
            }
        }
    }
}

data class SelectableOption(val key: String, val label: String)
