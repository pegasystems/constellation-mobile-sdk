package com.pega.mobile.constellation.sdk.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData

class CheckboxViewModel(
    private val onValueChange: (String) -> Unit,
    private val onFocusChanged: (Boolean, String) -> Unit
) : FieldViewModel {
    private val _state = MutableLiveData<CheckboxState>()
    override val state: LiveData<CheckboxState>
        get() = _state
    private var _focused: Boolean by mutableStateOf(false)

    override fun update(state: FieldState) {
        _state.postValue(state as CheckboxState)
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

data class CheckboxState(
    val baseFieldState: BaseFieldState,
    val caption: String
) : FieldState by baseFieldState