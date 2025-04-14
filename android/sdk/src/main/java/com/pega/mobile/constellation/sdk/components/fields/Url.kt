package com.pega.mobile.constellation.sdk.components.fields

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.Url
import org.json.JSONObject

class UrlComponent(context: ComponentContext) : FieldComponent(context) {
    override val state = UrlState(context)

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        state.placeholder = props.getString("placeholder")
    }
}

class UrlState(context: ComponentContext) : FieldState(context) {
    var placeholder: String by mutableStateOf("")
}

class UrlRenderer : ComponentRenderer<UrlComponent> {
    @Composable
    override fun Render(component: UrlComponent) {
        WithVisibility(component.state) {
            Url(
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