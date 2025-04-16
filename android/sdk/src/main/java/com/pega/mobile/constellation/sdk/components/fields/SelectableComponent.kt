package com.pega.mobile.constellation.sdk.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.mapWithIndex
import org.json.JSONObject

abstract class SelectableComponent(context: ComponentContext) : FieldComponent(context) {
    override val viewModel = SelectableViewModel()

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        viewModel.placeholder = props.getString("placeholder")
        viewModel.options = props.getJSONArray("options").mapWithIndex { index ->
            getJSONObject(index).let {
                SelectableOption(it["key"].toString(), it["label"].toString())
            }
        }
    }
}

class SelectableViewModel : FieldViewModel() {
    var placeholder: String by mutableStateOf("")
    var options: List<SelectableOption> by mutableStateOf(emptyList())
}

data class SelectableOption(val key: String, val label: String)
