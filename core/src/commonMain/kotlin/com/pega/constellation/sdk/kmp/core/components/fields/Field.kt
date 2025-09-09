package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.annotation.CallSuper
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.components.DisplayMode
import com.pega.constellation.sdk.kmp.core.components.DisplayMode.Companion.toDisplayMode
import com.pega.constellation.sdk.kmp.core.components.core.BaseComponent
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentEvent
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.core.components.helpers.WithDisplayMode
import com.pega.constellation.sdk.kmp.core.components.helpers.WithVisibility
import com.pega.constellation.sdk.kmp.core.components.optBoolean
import com.pega.constellation.sdk.kmp.core.components.optString
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.FieldValue
import kotlinx.serialization.json.JsonObject

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
    override fun onUpdate(props: JsonObject) {
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
