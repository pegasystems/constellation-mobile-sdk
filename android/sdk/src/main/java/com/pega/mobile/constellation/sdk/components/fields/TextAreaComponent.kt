package com.pega.mobile.constellation.sdk.components.fields

import android.util.Log
import com.pega.mobile.constellation.sdk.bridge.ComponentEvent
import com.pega.mobile.constellation.sdk.components.containers.FieldComponent
import com.pega.mobile.constellation.sdk.viewmodel.TextAreaState
import com.pega.mobile.constellation.sdk.viewmodel.TextAreaViewModel
import org.json.JSONObject

class TextAreaComponent(private val sendEventCallback: (ComponentEvent) -> Unit) : FieldComponent {
    override val viewModel = TextAreaViewModel(
        onValueChange = {
            sendEventCallback(ComponentEvent.changeValueComponentEvent(it))
        },
        onFocusChanged = { focused, value ->
            sendEventCallback(ComponentEvent.changeValueWithFocusComponentEvent(value, focused))
        })

    override fun updateProps(propsJson: JSONObject) {
        Log.d(TAG, "updating props: $propsJson")
        viewModel.update(propsJson.toTextAreaState())
    }

    private fun JSONObject.toTextAreaState(): TextAreaState {
        return TextAreaState(
            baseFieldState = toBaseFieldState(),
            placeholder = getString("placeholder"),
            maxLength = getString("maxLength").toInt()
        )
    }

    companion object {
        private const val TAG = "TextAreaComponent"
    }
}