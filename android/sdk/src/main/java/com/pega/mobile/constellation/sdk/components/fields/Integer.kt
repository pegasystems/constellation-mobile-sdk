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
    override val state = IntegerState(context)

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        state.placeholder = props.getString("placeholder")
    }
}

class IntegerState(context: ComponentContext) : FieldState(context) {
    var placeholder: String by mutableStateOf("")
}

class IntegerRenderer : ComponentRenderer<IntegerComponent> {
    @Composable
    override fun Render(component: IntegerComponent) {
        WithVisibility(component.state) {
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