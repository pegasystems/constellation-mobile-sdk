package com.pega.mobile.constellation.sdk.components.containers

import com.pega.mobile.constellation.sdk.components.Component
import com.pega.mobile.constellation.sdk.renderer.toComponentsList
import com.pega.mobile.constellation.sdk.viewmodel.ViewContainerState
import com.pega.mobile.constellation.sdk.viewmodel.ViewContainerViewModel
import org.json.JSONObject

class ViewContainerComponent : Component {
    val viewModel = ViewContainerViewModel()

    override fun updateProps(propsJson: JSONObject) {
        val newState = propsJson.toViewContainerState()
        viewModel.update(newState)
    }

    private fun JSONObject.toViewContainerState(): ViewContainerState {
        val childrenJsonArray = getJSONArray("children")
        return ViewContainerState(childrenJsonArray.toComponentsList())
    }
}


