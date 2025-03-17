package com.pega.mobile.constellation.sdk.components.containers

import com.pega.mobile.constellation.sdk.bridge.ComponentsManager
import com.pega.mobile.constellation.sdk.components.Component
import com.pega.mobile.constellation.sdk.components.widgets.ActionButtonsComponent
import com.pega.mobile.constellation.sdk.renderer.toComponentsList
import com.pega.mobile.constellation.sdk.viewmodel.AssignmentCardState
import com.pega.mobile.constellation.sdk.viewmodel.AssignmentCardViewModel
import org.json.JSONObject


class AssignmentCardComponent : Component {
    val viewModel = AssignmentCardViewModel()

    override fun updateProps(propsJson: JSONObject) {
        val newState = propsJson.toAssignmentCardState()
        viewModel.update(newState)
    }

    private fun JSONObject.toAssignmentCardState(): AssignmentCardState {
        val childrenJsonArray = getJSONArray("children")
        val actionButtonsId = getString("actionButtons").toInt()
        return AssignmentCardState(
            children = childrenJsonArray.toComponentsList(),
            actionButtons = ComponentsManager.getComponent(actionButtonsId) as ActionButtonsComponent
        )
    }
}


