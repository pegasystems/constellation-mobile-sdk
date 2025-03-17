package com.pega.mobile.constellation.sdk.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.pega.mobile.constellation.sdk.components.Component

class FlowContainerViewModel : ComponentViewModel {
    private val _state = MutableLiveData<FlowContainerState>()
    val state: LiveData<FlowContainerState>
        get() = _state

    fun update(state: FlowContainerState) {
        _state.postValue(state)
    }
}

data class FlowContainerState(
    val title: String,
    val children: List<Component>
)