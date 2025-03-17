package com.pega.mobile.constellation.sdk.components.fields

import android.util.Log
import com.pega.mobile.constellation.sdk.bridge.ComponentEvent
import com.pega.mobile.constellation.sdk.components.containers.FieldComponent
import com.pega.mobile.constellation.sdk.viewmodel.UrlState
import com.pega.mobile.constellation.sdk.viewmodel.UrlViewModel
import org.json.JSONObject

class UrlComponent(private val sendEventCallback: (ComponentEvent) -> Unit) : FieldComponent {
    override val viewModel = UrlViewModel(
        onValueChange = {
            sendEventCallback(ComponentEvent.changeValueComponentEvent(it))
        },
        onFocusChanged = { focused, value ->
            sendEventCallback(ComponentEvent.changeValueWithFocusComponentEvent(value, focused))
        })

    override fun updateProps(propsJson: JSONObject) {
        Log.d(TAG, "updating props: $propsJson")
        viewModel.update(propsJson.toUrlState())
    }

    private fun JSONObject.toUrlState() = UrlState(
        fieldState = toBaseFieldState(),
        placeholder = getString("placeholder")
    )

    companion object {
        private const val TAG = "UrlComponent"
    }
}