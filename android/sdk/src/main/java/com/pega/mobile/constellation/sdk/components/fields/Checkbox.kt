package com.pega.mobile.constellation.sdk.components.fields

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.Checkbox
import org.json.JSONObject

class CheckboxComponent(context: ComponentContext) : FieldComponent(context) {
    var caption: String by mutableStateOf("")
        private set

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        caption = props.getString("caption")
    }
}

class CheckboxRenderer : ComponentRenderer<CheckboxComponent> {
    @Composable
    override fun CheckboxComponent.Render() {
        WithVisibility {
            Checkbox(
                value = value.toBoolean(),
                caption = caption,
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                onValueChange = { updateValue(it.toString()) },
            )
        }
    }
}
