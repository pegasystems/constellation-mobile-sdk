package com.pega.mobile.constellation.sdk.components.fields

import androidx.annotation.CallSuper
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.DisplayMode
import com.pega.mobile.constellation.sdk.components.DisplayMode.Companion.toDisplayMode
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentEvent
import com.pega.mobile.constellation.sdk.components.helpers.WithDisplayMode
import com.pega.mobile.constellation.sdk.components.helpers.WithVisibility
import com.pega.mobile.dxcomponents.compose.controls.form.FieldValue
import org.json.JSONObject

abstract class FieldComponent(context: ComponentContext) : BaseComponent(context) {
    private var focused by mutableStateOf(false)
    var value: String by mutableStateOf("")
        private set
    var label: String by mutableStateOf("")
        private set
    var visible: Boolean by mutableStateOf(false)
        private set
    var required: Boolean by mutableStateOf(false)
        private set
    var disabled: Boolean by mutableStateOf(false)
        private set
    var readOnly: Boolean by mutableStateOf(false)
        private set
    var placeholder: String by mutableStateOf("")
        private set
    var helperText: String by mutableStateOf("")
        private set
    var validateMessage: String by mutableStateOf("")
        private set
    var displayMode: DisplayMode by mutableStateOf(DisplayMode.EDITABLE)
        private set

    @CallSuper
    override fun onUpdate(props: JSONObject) {
        with(props) {
            value = getString("value")
            label = getString("label")
            visible = getBoolean("visible")
            required = getBoolean("required")
            disabled = getBoolean("disabled")
            readOnly = getBoolean("readOnly")
            helperText = getString("helperText")
            placeholder = optString("placeholder")
            validateMessage = getString("validateMessage")
            displayMode = getString("displayMode").toDisplayMode()
        }
    }

    fun updateValue(value: String) {
        if (this.value != value) {
            this.value = value
            context.sendComponentEvent(ComponentEvent.forFieldChange(value))
        }
    }

    fun updateFocus(focused: Boolean) {
        if (this.focused != focused) {
            this.focused = focused
            context.sendComponentEvent(ComponentEvent.forFieldChangeWithFocus(value, focused))
        }
    }
}

@Composable
fun <T : FieldComponent> T.WithFieldHelpers(
    displayOnly: @Composable T.() -> Unit = { FieldValue(label, value) },
    editable: @Composable T.() -> Unit,
) {
    WithVisibility(visible) {
        WithDisplayMode(
            displayMode = displayMode,
            label = label,
            value = value,
            editable = { editable.invoke(this) },
            displayOnly = { displayOnly.invoke(this) }
        )
    }
}
