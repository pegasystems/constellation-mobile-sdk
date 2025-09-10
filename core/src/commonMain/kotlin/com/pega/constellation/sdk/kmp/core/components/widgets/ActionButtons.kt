package com.pega.constellation.sdk.kmp.core.components.widgets

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.BaseComponent
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getJsonObject
import com.pega.constellation.sdk.kmp.core.components.getString
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


