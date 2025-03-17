package com.pega.mobile.constellation.sdk.components.widgets

import android.util.Log
import com.pega.mobile.constellation.sdk.bridge.ComponentEvent
import com.pega.mobile.constellation.sdk.components.Component
import com.pega.mobile.constellation.sdk.viewmodel.ActionButton
import com.pega.mobile.constellation.sdk.viewmodel.ActionButtonsState
import com.pega.mobile.constellation.sdk.viewmodel.ActionButtonsViewModel
import org.json.JSONArray
import org.json.JSONObject

class ActionButtonsComponent(private val sendEventCallback: (ComponentEvent) -> Unit) : Component {
    val viewModel = ActionButtonsViewModel(
        onClick = { type, jsAction ->
            sendEventCallback(ComponentEvent.actionButtonClick(type, jsAction))
        }
    )

    override fun updateProps(propsJson: JSONObject) {
        Log.d(TAG, "Updating props: $propsJson")
        viewModel.update(propsJson.toActionButtonsState())
    }

    private fun JSONObject.toActionButtonsState(): ActionButtonsState {
        val mainButtons = getJSONArray(MAIN_BUTTONS).toActionButtons()
        val secondaryButtons = getJSONArray(SECONDARY_BUTTONS).toActionButtons()
        return ActionButtonsState(mainButtons, secondaryButtons)
    }

    private fun JSONArray.toActionButtons(): List<ActionButton> {
        val buttons = mutableListOf<ActionButton>()
        for (i in 0 ..<this.length()) {
            val buttonJson = this[i] as JSONObject
            buttons.add(
                ActionButton(
                    type = buttonJson.getString("type"),
                    name = buttonJson.getString("name"),
                    jsAction = buttonJson.getString("jsAction")
                )
            )
        }
        return buttons
    }

    companion object {
        private const val TAG = "ActionButtonsComponent"
        private const val MAIN_BUTTONS = "mainButtons"
        private const val SECONDARY_BUTTONS = "secondaryButtons"
    }
}