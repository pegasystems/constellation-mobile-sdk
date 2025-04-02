package com.pega.mobile.constellation.sdk.components.widgets

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.ButtonDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.BaseViewModel
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentEvent
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.mapWithIndex
import com.pega.mobile.dxcomponents.compose.containers.Row
import com.pega.mobile.dxcomponents.compose.controls.form.Button
import org.json.JSONArray
import org.json.JSONObject

class ActionButtonsComponent(context: ComponentContext) : BaseComponent(context) {
    override val viewModel = ActionButtonsViewModel()

    override fun onUpdate(props: JSONObject) {
        with(viewModel) {
            primaryButtons = props.getJSONArray(MAIN_BUTTONS).toActionButtons()
            secondaryButtons = props.getJSONArray(SECONDARY_BUTTONS).toActionButtons()
        }
    }

    private fun JSONArray.toActionButtons() = mapWithIndex {
        getJSONObject(it).run {
            ActionButton(
                type = getString("type"),
                name = getString("name"),
                jsAction = getString("jsAction")
            )
        }
    }

    companion object {
        private const val MAIN_BUTTONS = "mainButtons"
        private const val SECONDARY_BUTTONS = "secondaryButtons"
    }
}

class ActionButtonsViewModel : BaseViewModel() {
    var primaryButtons: List<ActionButton> by mutableStateOf(emptyList())
    var secondaryButtons: List<ActionButton> by mutableStateOf(emptyList())

    fun onClick(button: ActionButton) {
        _events.tryEmit(ComponentEvent.forActionButtonClick(button.type, button.jsAction))
    }
}

data class ActionButton(
    val type: String,
    val name: String,
    val jsAction: String,
)

class ActionButtonsRenderer : ComponentRenderer<ActionButtonsViewModel> {
    @Composable
    override fun Render(viewModel: ActionButtonsViewModel) {
        Row(modifier = Modifier.fillMaxWidth()) {
            viewModel.primaryButtons.forEach {
                Button(title = it.name.trimEnd(), modifier = Modifier.weight(1f)) {
                    viewModel.onClick(it)
                }
            }
        }
        Row(modifier = Modifier.fillMaxWidth()) {
            viewModel.secondaryButtons.forEach {
                Button(
                    title = it.name,
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color.Gray, contentColor = Color.White
                    )
                ) {
                    viewModel.onClick(it)
                }
            }
        }
    }
}
