package com.pega.mobile.constellation.sdk.viewmodel

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData

class UrlViewModel(
    private val onValueChange: ((String) -> Unit)?,
    private val onFocusChanged: ((Boolean, String) -> Unit)?
) : FieldViewModel {
    private val _state = MutableLiveData<UrlState>()
    override val state: LiveData<UrlState>
        get() = _state
    private var _focused: Boolean by mutableStateOf(false)

    override fun update(state: FieldState) {
        _state.postValue(state as UrlState)
    }

    override fun setValue(value: String) {
        _state.value?.let { stateValue ->
            _state.value = stateValue.copy(fieldState = stateValue.fieldState.copy(value = value))
        }
        onValueChange?.let { it(value) }
    }

    override fun setFocus(focused: Boolean) {
        if (focused != _focused) {
            _focused = focused
            onFocusChanged?.let { it(focused, state.value?.value ?: "") }
        }

    }
}

data class UrlState(
    val fieldState: BaseFieldState,
    val placeholder: String,
) : FieldState by fieldState