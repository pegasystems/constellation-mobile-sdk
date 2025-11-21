package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.annotation.CallSuper
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.BaseComponent
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import com.pega.constellation.sdk.kmp.core.api.HideableComponent
import com.pega.constellation.sdk.kmp.core.components.DisplayMode
import com.pega.constellation.sdk.kmp.core.components.DisplayMode.Companion.toDisplayMode
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.core.components.optBoolean
import com.pega.constellation.sdk.kmp.core.components.optString
import kotlinx.serialization.json.JsonObject

abstract class FieldComponent(context: ComponentContext) : BaseComponent(context), HideableComponent {
    private var focused by mutableStateOf(false)
    var value: String by mutableStateOf("")
        private set
    var label: String by mutableStateOf("")
        private set
    override var visible: Boolean by mutableStateOf(false)
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
    override fun applyProps(props: JsonObject) {
        with(props) {
            value = getString("value")
            label = getString("label")
            visible = optBoolean("visible", true)
            required = optBoolean("required", false)
            disabled = optBoolean("disabled", false)
            readOnly = optBoolean("readOnly", false)
            helperText = optString("helperText")
            placeholder = optString("placeholder")
            validateMessage = optString("validateMessage")
            displayMode = optString("displayMode").toDisplayMode()
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

