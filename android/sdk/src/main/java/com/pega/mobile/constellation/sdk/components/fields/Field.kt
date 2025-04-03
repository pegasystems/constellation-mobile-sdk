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
import com.pega.mobile.constellation.sdk.components.core.ComponentViewModel
import kotlinx.coroutines.flow.drop
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.merge
import org.json.JSONObject

abstract class FieldComponent(context: ComponentContext) : BaseComponent(context) {
    abstract override val viewModel: FieldViewModel

    @CallSuper
    override fun onUpdate(props: JSONObject) {
        with(viewModel) {
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

abstract class FieldViewModel : ComponentViewModel {
    override val events = merge(
        snapshotFlow { value }.drop(1).map { ComponentEvent.forFieldChange(it) },
        snapshotFlow { focused }.drop(1).map { ComponentEvent.forFieldChangeWithFocus(value, it) }
    )

    var value: String by mutableStateOf("")
    var label: String by mutableStateOf("")
    var visible: Boolean by mutableStateOf(false)
    var required: Boolean by mutableStateOf(false)
    var disabled: Boolean by mutableStateOf(false)
    var readOnly: Boolean by mutableStateOf(false)
    var helperText: String by mutableStateOf("")
    var validateMessage: String by mutableStateOf("")
    var focused: Boolean by mutableStateOf(false)
}

@Composable
fun <T : FieldViewModel> WithVisibility(viewModel: T, content: @Composable T.() -> Unit) {
    AnimatedVisibility(viewModel.visible) { content.invoke(viewModel) }
}
