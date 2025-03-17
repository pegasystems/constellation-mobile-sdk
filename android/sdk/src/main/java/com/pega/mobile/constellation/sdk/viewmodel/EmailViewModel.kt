package com.pega.mobile.constellation.sdk.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData

class EmailViewModel(
    private val onValueChange: (String) -> Unit,
    private val onFocusChanged: (Boolean, String) -> Unit
) : FieldViewModel {
    private val _state = MutableLiveData<EmailState>()
    override val state: LiveData<EmailState>
        get() = _state
    private var _focused: Boolean by mutableStateOf(false)

    override fun update(state: FieldState) {
        _state.postValue(state as EmailState)
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

data class EmailState(
    val baseFieldState: BaseFieldState,
    val placeholder: String,
) : FieldState by baseFieldState