package com.pega.mobile.constellation.sdk.components.fields

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.TextInput
import org.json.JSONObject

class TextInputComponent(context: ComponentContext) : FieldComponent(context) {
    override val viewModel = TextInputViewModel()

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        viewModel.placeholder = props.getString("placeholder")
    }
}

class TextInputViewModel : FieldViewModel() {
    var placeholder: String by mutableStateOf("")
}

class TextInputRenderer : ComponentRenderer<TextInputViewModel> {
    @Composable
    override fun Render(viewModel: TextInputViewModel) {
        WithVisibility(viewModel) {
            TextInput(
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