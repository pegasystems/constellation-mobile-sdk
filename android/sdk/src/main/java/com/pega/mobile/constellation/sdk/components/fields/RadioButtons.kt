package com.pega.mobile.constellation.sdk.components.fields

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.mapWithIndex
import com.pega.mobile.dxcomponents.compose.controls.form.RadioButtons
import org.json.JSONObject

class RadioButtonsComponent(context: ComponentContext) : FieldComponent(context) {
    override val viewModel = RadioButtonsViewModel()

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

class RadioButtonsViewModel : FieldViewModel() {
    var placeholder: String by mutableStateOf("")
    var options: List<SelectableOption> by mutableStateOf(emptyList())
}

data class SelectableOption(val key: String, val label: String)

class RadioButtonsRenderer : ComponentRenderer<RadioButtonsViewModel> {
    @Composable
    override fun Render(viewModel: RadioButtonsViewModel) {
        WithVisibility(viewModel) {
            RadioButtons(
                value = value,
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                placeholder = placeholder,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                options = options.map {
                    com.pega.mobile.dxcomponents.compose.controls.form.internal.SelectableOption(
                        it.key,
                        it.label
                    )
                },
                onValueChange = { value = it }
            )
        }
    }
}