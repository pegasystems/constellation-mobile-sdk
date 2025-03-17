package com.pega.mobile.constellation.sdk.components.fields

import android.util.Log
import com.pega.mobile.constellation.sdk.bridge.ComponentEvent
import com.pega.mobile.constellation.sdk.components.containers.FieldComponent
import com.pega.mobile.constellation.sdk.viewmodel.CheckboxState
import com.pega.mobile.constellation.sdk.viewmodel.CheckboxViewModel
import org.json.JSONObject

class CheckboxComponent(private val sendEventCallback: (ComponentEvent) -> Unit) :
    FieldComponent {
    override val viewModel = CheckboxViewModel(
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

    private fun JSONObject.toEmailState(): CheckboxState {
        return CheckboxState(
            baseFieldState = toBaseFieldState(),
            caption = getString("caption")
        )
    }

    companion object {
        private const val TAG = "CheckboxComponent"
    }
}