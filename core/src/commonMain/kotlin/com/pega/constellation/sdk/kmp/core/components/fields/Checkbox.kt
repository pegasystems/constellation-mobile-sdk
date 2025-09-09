package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.optString
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Checkbox
import kotlinx.serialization.json.JsonObject

class CheckboxComponent(context: ComponentContext) : FieldComponent(context) {
    var caption: String by mutableStateOf("")
        private set

    override fun onUpdate(props: JsonObject) {
        super.onUpdate(props)
        caption = props.optString("caption")
    }
}

class CheckboxRenderer : ComponentRenderer<CheckboxComponent> {
    @Composable
    override fun CheckboxComponent.Render() {
        WithFieldHelpers {
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
