package com.pega.mobile.constellation.sdk.components.widgets

import android.util.Log
import com.pega.mobile.constellation.sdk.components.Component
import com.pega.mobile.constellation.sdk.viewmodel.UnsupportedState
import com.pega.mobile.constellation.sdk.viewmodel.UnsupportedViewModel
import org.json.JSONObject

class UnsupportedComponent(initialState: UnsupportedState) : Component {
    val viewModel = UnsupportedViewModel()

    init {
        viewModel.update(initialState)
    }

    override fun updateProps(propsJson: JSONObject) {
        Log.i("UnsupportedComponent", "new props: $propsJson")
        viewModel.update(propsJson.toUnsupportedState())
    }

    private fun JSONObject.toUnsupportedState() =
        UnsupportedState.MissingJsComponent(componentType = getString("type"))
}
