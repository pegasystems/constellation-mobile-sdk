package com.pega.mobile.constellation.sdk.components.containers

import com.pega.mobile.constellation.sdk.components.Component
import com.pega.mobile.constellation.sdk.renderer.toComponentsList
import com.pega.mobile.constellation.sdk.viewmodel.RegionState
import com.pega.mobile.constellation.sdk.viewmodel.RegionViewModel
import org.json.JSONObject

class RegionComponent : Component {
    val viewModel = RegionViewModel()

    override fun updateProps(propsJson: JSONObject) {
        val newState = propsJson.toViewState()
        viewModel.update(newState)
    }

    private fun JSONObject.toViewState(): RegionState {
        val childrenJsonArray = getJSONArray("children")
        return RegionState(childrenJsonArray.toComponentsList())
    }
}
