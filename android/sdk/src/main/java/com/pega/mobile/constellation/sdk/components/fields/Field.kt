package com.pega.mobile.constellation.sdk.components.fields

import androidx.annotation.CallSuper
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentEvent
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

    @CallSuper
    override fun onUpdate(props: JSONObject) {
        with(props) {
            value = getString("value")
            label = getString("label")
            visible = getString("visible").toBoolean()
            required = getString("required").toBoolean()
            disabled = getString("disabled").toBoolean()
            readOnly = getString("readOnly").toBoolean()
            helperText = getString("helperText")
            validateMessage = getString("validateMessage")
            placeholder = optString("placeholder")
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
fun <T : FieldComponent> T.WithVisibility(content: @Composable T.() -> Unit) {
    AnimatedVisibility(visible) { content.invoke(this@WithVisibility) }
}