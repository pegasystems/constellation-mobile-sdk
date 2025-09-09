package com.pega.constellation.sdk.kmp.core.components.widgets

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.ButtonDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.pega.constellation.sdk.kmp.core.components.core.BaseComponent
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentEvent
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getJsonObject
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Button
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject

class ActionButtonsComponent(context: ComponentContext) : BaseComponent(context) {
    var primaryButtons: List<ActionButton> by mutableStateOf(emptyList())
        private set
    var secondaryButtons: List<ActionButton> by mutableStateOf(emptyList())
        private set

    override fun onUpdate(props: JsonObject) {
        primaryButtons = props.getJSONArray(MAIN_BUTTONS).toActionButtons()
        secondaryButtons = props.getJSONArray(SECONDARY_BUTTONS).toActionButtons()
    }

    fun onClick(button: ActionButton) {
        context.sendComponentEvent(
            ComponentEvent.forActionButtonClick(button.type, button.jsAction)
        )
    }

    private fun JsonArray.toActionButtons() = mapWithIndex {
        getJsonObject(it).run {
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


data class ActionButton(
    val type: String,
    val name: String,
    val jsAction: String,
)

class ActionButtonsRenderer : ComponentRenderer<ActionButtonsComponent> {
    @Composable
    override fun ActionButtonsComponent.Render() {
        Row(modifier = Modifier.fillMaxWidth()) {
            secondaryButtons.forEach {
                Button(
                    title = it.name,
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color.White,
                        contentColor = Color.Black
                    ),
                    onClick = { onClick(it) }
                )
            }
            primaryButtons.forEach {
                Button(
                    title = it.name.trimEnd(),
                    modifier = Modifier.weight(1f),
                    onClick = { onClick(it) }
                )
            }
        }
    }
}
