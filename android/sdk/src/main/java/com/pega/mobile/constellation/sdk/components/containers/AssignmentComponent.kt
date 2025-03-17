package com.pega.mobile.constellation.sdk.components.containers

import com.pega.mobile.constellation.sdk.components.Component
import com.pega.mobile.constellation.sdk.renderer.toComponentsList
import com.pega.mobile.constellation.sdk.viewmodel.AssignmentState
import com.pega.mobile.constellation.sdk.viewmodel.AssignmentViewModel
import org.json.JSONObject

class AssignmentComponent : Component {
    val viewModel = AssignmentViewModel()

    override fun updateProps(propsJson: JSONObject) {
        val newState = propsJson.toAssignmentState()
        viewModel.update(newState)
    }

    private fun JSONObject.toAssignmentState(): AssignmentState {
        val childrenJsonArray = getJSONArray("children")
        return AssignmentState(childrenJsonArray.toComponentsList())
    }
}


