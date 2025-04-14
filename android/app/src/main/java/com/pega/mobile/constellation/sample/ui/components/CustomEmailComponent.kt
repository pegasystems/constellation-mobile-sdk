package com.pega.mobile.constellation.sample.ui.components

import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.fields.EmailState
import com.pega.mobile.constellation.sdk.components.fields.FieldComponent
import com.pega.mobile.dxcomponents.compose.controls.form.Email
import org.json.JSONObject

class CustomEmailComponent(context: ComponentContext) : FieldComponent(context) {
    override val state = EmailState(context)

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        state.placeholder = props.getString("placeholder")
    }
}

class CustomEmailRenderer : ComponentRenderer<CustomEmailComponent> {
    @Composable
    override fun Render(component: CustomEmailComponent) {
        with(component.state) {
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
                    onValueChange = { value = it },
                    onFocusChange = { focused = it }
                )
            }
        }
    }
}
