package com.pega.mobile.constellation.sdk.components.fields

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.TextArea
import org.json.JSONObject

class TextAreaComponent(context: ComponentContext) : FieldComponent(context) {
    var maxLength: Int by mutableIntStateOf(0)
        private set

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        maxLength = props.getString("maxLength").toInt()
    }
}

class TextAreaRenderer : ComponentRenderer<TextAreaComponent> {
    @Composable
    override fun TextAreaComponent.Render() {
        WithVisibility {
            WithDisplayMode(
                editable = {
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
            )
        }
    }
}