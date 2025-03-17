/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sample.components

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.pega.mobile.constellation.sdk.bridge.ComponentEvent
import com.pega.mobile.constellation.sdk.components.containers.FieldComponent
import com.pega.mobile.constellation.sdk.components.fields.toBaseFieldState
import com.pega.mobile.constellation.sdk.viewmodel.FieldState
import com.pega.mobile.constellation.sdk.viewmodel.BaseFieldState
import com.pega.mobile.constellation.sdk.viewmodel.FieldViewModel
import org.json.JSONObject

class CustomSliderComponent(private val sendEventCallback: (ComponentEvent) -> Unit) :
    FieldComponent {
    override val viewModel = CustomSliderViewModel(
        onValueChange = {
            sendEventCallback(ComponentEvent.changeValueComponentEvent(it))
        },
        onFocusChanged = { focused, value ->
            sendEventCallback(ComponentEvent.changeValueWithFocusComponentEvent(value, focused))
        })

    override fun updateProps(propsJson: JSONObject) {
        Log.d(TAG, "updating props: $propsJson")
        viewModel.update(propsJson.toSliderState())
    }

    private fun JSONObject.toSliderState(): SliderState {
        return SliderState(
            baseFieldState = toBaseFieldState()
        )
    }

    companion object {
        private const val TAG = "CustomEmailComponent"
    }
}

data class SliderState(
    val baseFieldState: BaseFieldState
) : FieldState by baseFieldState

class CustomSliderViewModel(
    private val onValueChange: (String) -> Unit,
    private val onFocusChanged: (Boolean, String) -> Unit
) : FieldViewModel {
    private val _state = MutableLiveData<SliderState>()
    override val state: LiveData<SliderState>
        get() = _state
    private var _focused: Boolean by mutableStateOf(false)

    override fun update(state: FieldState) {
        _state.postValue(state as SliderState)
    }

    override fun setValue(value: String) {
        _state.value?.let { stateValue ->
            _state.value = stateValue.copy(baseFieldState = stateValue.baseFieldState.copy(value = value))
        }
        onValueChange(value)
    }

    override fun setFocus(focused: Boolean) {
        if (focused != _focused) {
            _focused = focused
            onFocusChanged(focused, state.value?.value ?: "")
        }

    }
}
