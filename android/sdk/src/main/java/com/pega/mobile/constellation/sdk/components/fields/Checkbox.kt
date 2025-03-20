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
    override val viewModel = CheckboxViewModel()

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        viewModel.caption = props.getString("caption")
    }
}

class CheckboxViewModel : FieldViewModel() {
    var caption: String by mutableStateOf("")
}

class CheckboxRenderer : ComponentRenderer<CheckboxViewModel> {
    @Composable
    override fun Render(viewModel: CheckboxViewModel) {
        WithVisibility(viewModel) {
            Checkbox(
                value = value.toBoolean(),
                caption = caption,
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                onValueChange = { value = it.toString() },
            )
        }
    }
}


