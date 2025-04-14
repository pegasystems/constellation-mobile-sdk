package com.pega.mobile.constellation.sdk.components.fields

import androidx.annotation.CallSuper
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.runtime.snapshotFlow
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentEvent
import com.pega.mobile.constellation.sdk.components.core.ComponentState
import kotlinx.coroutines.flow.drop
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.merge
import kotlinx.coroutines.flow.onEach
import org.json.JSONObject

abstract class FieldComponent(context: ComponentContext) : BaseComponent(context) {
    abstract override val state: FieldState

    @CallSuper
    override fun onUpdate(props: JSONObject) {
        with(state) {
            with(props) {
                value = getString("value")
                label = getString("label")
                visible = getString("visible").toBoolean()
                required = getString("required").toBoolean()
                disabled = getString("disabled").toBoolean()
                readOnly = getString("readOnly").toBoolean()
                helperText = getString("helperText")
                validateMessage = getString("validateMessage")
            }
        }
    }
}

abstract class FieldState(context: ComponentContext) : ComponentState {
    init {
        merge(valueEvents(), focusEvents())
            .onEach { context.sendComponentEvent(it) }
            .launchIn(context.scope)
    }

    var value: String by mutableStateOf("")
    var label: String by mutableStateOf("")
    var visible: Boolean by mutableStateOf(false)
    var required: Boolean by mutableStateOf(false)
    var disabled: Boolean by mutableStateOf(false)
    var readOnly: Boolean by mutableStateOf(false)
    var helperText: String by mutableStateOf("")
    var validateMessage: String by mutableStateOf("")
    var focused: Boolean by mutableStateOf(false)

    private fun valueEvents() = snapshotFlow { value }.drop(1)
        .map { ComponentEvent.forFieldChange(it) }

    private fun focusEvents() = snapshotFlow { focused }.drop(1)
        .map { ComponentEvent.forFieldChangeWithFocus(value, it) }
}

@Composable
fun <T : FieldState> WithVisibility(state: T, content: @Composable T.() -> Unit) {
    AnimatedVisibility(state.visible) { content.invoke(state) }
}
