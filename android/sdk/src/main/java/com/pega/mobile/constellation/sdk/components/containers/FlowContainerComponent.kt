package com.pega.mobile.constellation.sdk.components.containers

import com.pega.mobile.constellation.sdk.components.Component
import com.pega.mobile.constellation.sdk.renderer.toComponentsList
import com.pega.mobile.constellation.sdk.viewmodel.FlowContainerViewModel
import com.pega.mobile.constellation.sdk.viewmodel.FlowContainerState
import org.json.JSONObject

class FlowContainerComponent : Component {
    val viewModel = FlowContainerViewModel()

    override fun updateProps(propsJson: JSONObject) {
        val newState = propsJson.toFlowContainerState()
        viewModel.update(newState)
    }

    private fun JSONObject.toFlowContainerState(): FlowContainerState {
        val title = getString("title")
        val childrenJsonArray = getJSONArray("children")
        return FlowContainerState(title, childrenJsonArray.toComponentsList())
    }
}


