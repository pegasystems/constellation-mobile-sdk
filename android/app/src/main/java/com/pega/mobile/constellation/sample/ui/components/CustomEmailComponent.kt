package com.pega.mobile.constellation.sample.ui.components

import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.fields.FieldComponent
import com.pega.mobile.constellation.sdk.components.fields.WithVisibility
import com.pega.mobile.dxcomponents.compose.controls.form.Email
import org.json.JSONObject

class CustomEmailComponent(context: ComponentContext) : FieldComponent(context) {
    var placeholder: String by mutableStateOf("")
        private set

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        placeholder = props.getString("placeholder")
    }
}

class CustomEmailRenderer : ComponentRenderer<CustomEmailComponent> {
    @Composable
    override fun CustomEmailComponent.Render() {
        WithVisibility {
            Column {
                Email(
                    value = value,
                    label = "Custom $label",
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
}
