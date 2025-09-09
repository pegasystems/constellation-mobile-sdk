package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Phone
import kotlinx.serialization.json.JsonObject

class PhoneComponent(context: ComponentContext) : FieldComponent(context) {
    var showCountryCode: Boolean by mutableStateOf(true)
        private set

    override fun onUpdate(props: JsonObject) {
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
