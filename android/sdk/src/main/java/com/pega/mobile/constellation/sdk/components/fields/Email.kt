package com.pega.mobile.constellation.sdk.components.fields

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.Email
import org.json.JSONObject

class EmailComponent(context: ComponentContext) : FieldComponent(context) {
    override val viewModel = EmailViewModel()

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        viewModel.placeholder = props.getString("placeholder")
    }
}

class EmailViewModel : FieldViewModel() {
    var placeholder: String by mutableStateOf("")
}

class EmailRenderer : ComponentRenderer<EmailViewModel> {
    @Composable
    override fun Render(viewModel: EmailViewModel) {
        WithVisibility(viewModel) {
            Email(
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
