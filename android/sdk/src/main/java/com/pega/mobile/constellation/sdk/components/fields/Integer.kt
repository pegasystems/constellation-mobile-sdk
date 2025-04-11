package com.pega.mobile.constellation.sdk.components.fields

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.Integer
import org.json.JSONObject

class IntegerComponent(context: ComponentContext) : FieldComponent(context) {
    override val viewModel = IntegerViewModel()

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        viewModel.placeholder = props.getString("placeholder")
    }
}

class IntegerViewModel : FieldViewModel() {
    var placeholder: String by mutableStateOf("")
}

class IntegerRenderer : ComponentRenderer<IntegerViewModel> {
    @Composable
    override fun Render(viewModel: IntegerViewModel) {
        WithVisibility(viewModel) {
            Integer(
                value = value,
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                placeholder = placeholder,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                onValueChange = { value = it },
                onFocusChange = { focused = it }
            )
        }
    }
}