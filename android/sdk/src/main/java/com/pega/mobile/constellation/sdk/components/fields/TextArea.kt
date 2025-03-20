package com.pega.mobile.constellation.sdk.components.fields

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.TextArea
import org.json.JSONObject

class TextAreaComponent(context: ComponentContext) : FieldComponent(context) {
    override val viewModel = TextAreaViewModel()

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        with(viewModel) {
            placeholder = props.getString("placeholder")
            maxLength = props.getString("maxLength").toInt()
        }
    }
}

class TextAreaViewModel : FieldViewModel() {
    var placeholder: String by mutableStateOf("")
    var maxLength: Int by mutableIntStateOf(0)
}

class TextAreaRenderer : ComponentRenderer<TextAreaViewModel> {
    @Composable
    override fun Render(viewModel: TextAreaViewModel) {
        WithVisibility(viewModel) {
            TextArea(
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