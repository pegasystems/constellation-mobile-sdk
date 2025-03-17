package com.pega.mobile.constellation.sdk.components.fields

import android.util.Log
import com.pega.mobile.constellation.sdk.bridge.ComponentEvent
import com.pega.mobile.constellation.sdk.components.containers.FieldComponent
import com.pega.mobile.constellation.sdk.viewmodel.TextInputState
import com.pega.mobile.constellation.sdk.viewmodel.TextInputViewModel
import org.json.JSONObject

class TextInputComponent(private val sendEventCallback: (ComponentEvent) -> Unit) : FieldComponent {
    override val viewModel = TextInputViewModel(
        onValueChange = {
            sendEventCallback(ComponentEvent.changeValueComponentEvent(it))
        },
        onFocusChanged = { focused, value ->
            sendEventCallback(ComponentEvent.changeValueWithFocusComponentEvent(value, focused))
        })

    override fun updateProps(propsJson: JSONObject) {
        Log.d(TAG, "updating props: $propsJson")
        viewModel.update(propsJson.toTextInputState())
    }

    private fun JSONObject.toTextInputState(): TextInputState {
        return TextInputState(
            baseFieldState = toBaseFieldState(),
            placeholder = getString("placeholder")
        )
    }

    companion object {
        private const val TAG = "TextInputComponent"
    }
}