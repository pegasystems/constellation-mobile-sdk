package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getJsonObject
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonObject

abstract class SelectableComponent(context: ComponentContext) : FieldComponent(context) {
    var options: List<SelectableOption> by mutableStateOf(emptyList())
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        options = props.getJSONArray("options").mapWithIndex { index ->
            getJsonObject(index).let {
                SelectableOption(it.getString("key"), it.getString("label"))
            }
        }
    }
}

data class SelectableOption(val key: String, val label: String)
