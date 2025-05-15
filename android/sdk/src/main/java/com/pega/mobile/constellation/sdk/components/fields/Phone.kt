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
    var showCountryCode: Boolean by mutableStateOf(true)
        private set

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        showCountryCode = props.getBoolean("showCountryCode")
    }
}

class PhoneRenderer : ComponentRenderer<PhoneComponent> {
    @Composable
    override fun PhoneComponent.Render() {
        WithFieldHelpers {
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
                onValueChange = { updateValue(it) },
                onFocusChange = { updateFocus(it) }
            )
        }
    }
}