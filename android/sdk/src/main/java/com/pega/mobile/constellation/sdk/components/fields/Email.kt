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
    override val state = EmailState(context)

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        state.placeholder = props.getString("placeholder")
    }
}

class EmailState(context: ComponentContext) : FieldState(context) {
    var placeholder: String by mutableStateOf("")
}

class EmailRenderer : ComponentRenderer<EmailComponent> {
    @Composable
    override fun Render(component: EmailComponent) {
        WithVisibility(component.state) {
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
