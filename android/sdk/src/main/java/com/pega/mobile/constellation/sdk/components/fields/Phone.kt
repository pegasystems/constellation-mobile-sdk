package com.pega.mobile.constellation.sdk.components.fields

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.Phone
import org.json.JSONObject

class PhoneComponent(context: ComponentContext) : FieldComponent(context) {
    override val viewModel = PhoneViewModel()

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        viewModel.placeholder = props.getString("placeholder")
        viewModel.showCountryCode = props.getBoolean("showCountryCode")
    }
}

class PhoneViewModel : FieldViewModel() {
    var placeholder: String by mutableStateOf("")
    var showCountryCode: Boolean by mutableStateOf(true)
}

class PhoneRenderer : ComponentRenderer<PhoneViewModel> {
    @Composable
    override fun Render(viewModel: PhoneViewModel) {
        WithVisibility(viewModel) {
            Phone(
                value = value,
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                placeholder = placeholder,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                showCountryFlag = showCountryCode,
                onValueChange = { value = it },
                onFocusChange = { focused = it }
            )
        }
    }
}