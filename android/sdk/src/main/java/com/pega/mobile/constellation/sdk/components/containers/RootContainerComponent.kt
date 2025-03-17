package com.pega.mobile.constellation.sdk.components.containers

import com.pega.mobile.constellation.sdk.components.Component
import com.pega.mobile.constellation.sdk.renderer.toComponentsList
import com.pega.mobile.constellation.sdk.viewmodel.RootContainerState
import com.pega.mobile.constellation.sdk.viewmodel.RootContainerViewModel
import org.json.JSONObject

class RootContainerComponent : Component {
    val viewModel = RootContainerViewModel()

    override fun updateProps(propsJson: JSONObject) {
        val newState = propsJson.toRootContainerState()
        viewModel.update(newState)
    }

    private fun JSONObject.toRootContainerState(): RootContainerState {
        val childrenJsonArray = getJSONArray("children")
        return RootContainerState(childrenJsonArray.toComponentsList())
    }
}


