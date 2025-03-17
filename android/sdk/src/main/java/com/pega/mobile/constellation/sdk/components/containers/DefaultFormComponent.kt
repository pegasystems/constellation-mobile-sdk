package com.pega.mobile.constellation.sdk.components.containers

import com.pega.mobile.constellation.sdk.components.Component
import com.pega.mobile.constellation.sdk.renderer.toComponentsList
import com.pega.mobile.constellation.sdk.viewmodel.DefaultFormState
import com.pega.mobile.constellation.sdk.viewmodel.DefaultFormViewModel
import org.json.JSONObject

class DefaultFormComponent : Component {
    val viewModel = DefaultFormViewModel()

    override fun updateProps(propsJson: JSONObject) {
        val newState = propsJson.toDefaultFormState()
        viewModel.update(newState)
    }

    private fun JSONObject.toDefaultFormState(): DefaultFormState {
        val childrenJsonArray = getJSONArray("children")
        val instructions = getString("instructions")
        return DefaultFormState(childrenJsonArray.toComponentsList(), instructions)
    }
}
