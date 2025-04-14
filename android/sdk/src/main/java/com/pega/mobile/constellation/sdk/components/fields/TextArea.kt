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
    override val state = TextAreaState(context)

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        with(state) {
            placeholder = props.getString("placeholder")
            maxLength = props.getString("maxLength").toInt()
        }
    }
}

class TextAreaState(context: ComponentContext) : FieldState(context) {
    var placeholder: String by mutableStateOf("")
    var maxLength: Int by mutableIntStateOf(0)
}

class TextAreaRenderer : ComponentRenderer<TextAreaComponent> {
    @Composable
    override fun Render(component: TextAreaComponent) {
        WithVisibility(component.state) {
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