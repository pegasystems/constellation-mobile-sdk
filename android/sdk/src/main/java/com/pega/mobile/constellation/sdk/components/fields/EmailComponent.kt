package com.pega.mobile.constellation.sdk.components.fields

import android.util.Log
import com.pega.mobile.constellation.sdk.bridge.ComponentEvent
import com.pega.mobile.constellation.sdk.components.containers.FieldComponent
import com.pega.mobile.constellation.sdk.viewmodel.EmailState
import com.pega.mobile.constellation.sdk.viewmodel.EmailViewModel
import org.json.JSONObject

class EmailComponent(private val sendEventCallback: (ComponentEvent) -> Unit) : FieldComponent {

    override val viewModel = EmailViewModel(
        onValueChange = {
            sendEventCallback(ComponentEvent.changeValueComponentEvent(it))
        },
        onFocusChanged = { focused, value ->
            sendEventCallback(ComponentEvent.changeValueWithFocusComponentEvent(value, focused))
        })

    override fun updateProps(propsJson: JSONObject) {
        Log.d(TAG, "updating props: $propsJson")
        viewModel.update(propsJson.toEmailState())
    }

    private fun JSONObject.toEmailState(): EmailState {
        return EmailState(
            baseFieldState = toBaseFieldState(),
            placeholder = getString("placeholder")
        )
    }

    companion object {
        private const val TAG = "EmailComponent"
    }
}
