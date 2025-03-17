package com.pega.mobile.constellation.sdk.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData

class UnsupportedViewModel : ComponentViewModel {
    private val _state = MutableLiveData<UnsupportedState>()
    val state: LiveData<UnsupportedState>
        get() = _state

    fun update(state: UnsupportedState) {
        _state.postValue(state)
    }
}

sealed class UnsupportedState {
    abstract val componentType: String

    data class MissingJsComponent(
        override val componentType: String
    ) : UnsupportedState()

    data class MissingNativeComponent(override val componentType: String) : UnsupportedState()
}
