package com.pega.mobile.constellation.sdk.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.pega.mobile.constellation.sdk.components.Component

class ViewViewModel : ComponentViewModel {
    private val _state = MutableLiveData<ViewState>()
    val state: LiveData<ViewState>
        get() = _state

    fun update(state: ViewState) {
        _state.postValue(state)
    }
}

data class ViewState(
    val children: List<Component>,
    val visible: Boolean,
    val label: String,
    val showLabel: Boolean
)
