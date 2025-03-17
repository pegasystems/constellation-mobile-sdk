package com.pega.mobile.constellation.sdk.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.pega.mobile.constellation.sdk.components.Component

class DefaultFormViewModel : ComponentViewModel {
    private val _state = MutableLiveData<DefaultFormState>()
    val state: LiveData<DefaultFormState>
        get() = _state

    fun update(state: DefaultFormState) {
        _state.postValue(state)
    }
}

data class DefaultFormState(
    val children: List<Component>,
    val instructions: String
)