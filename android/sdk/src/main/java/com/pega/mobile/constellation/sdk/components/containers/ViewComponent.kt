package com.pega.mobile.constellation.sdk.components.containers

import com.pega.mobile.constellation.sdk.components.Component
import com.pega.mobile.constellation.sdk.renderer.toComponentsList
import com.pega.mobile.constellation.sdk.viewmodel.ViewState
import com.pega.mobile.constellation.sdk.viewmodel.ViewViewModel
import org.json.JSONObject

class ViewComponent : Component {
    val viewModel = ViewViewModel()

    override fun updateProps(propsJson: JSONObject) {
        val newState = propsJson.toViewState()
        viewModel.update(newState)
    }

    private fun JSONObject.toViewState(): ViewState {
        val childrenJsonArray = getJSONArray("children")
        return ViewState(
            children = childrenJsonArray.toComponentsList(),
            visible = getString("visible").toBoolean(),
            label = getString("label"),
            showLabel = getString("showLabel").toBoolean()
        )
    }
}


