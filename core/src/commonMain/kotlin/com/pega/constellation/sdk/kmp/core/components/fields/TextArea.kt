package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.optString
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.TextArea
import kotlinx.serialization.json.JsonObject

class TextAreaComponent(context: ComponentContext) : FieldComponent(context) {
    var maxLength: Int by mutableIntStateOf(0)
        private set

    override fun onUpdate(props: JsonObject) {
        super.onUpdate(props)
        maxLength = props.optString("maxLength").ifEmpty { "100" }.toInt()
    }
}

class TextAreaRenderer : ComponentRenderer<TextAreaComponent> {
    @Composable
    override fun TextAreaComponent.Render() {
        WithFieldHelpers {
            TextArea(
                value = value,
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                placeholder = placeholder,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                onValueChange = { updateValue(it) },
                onFocusChange = { updateFocus(it) }
            )
        }
    }
}
