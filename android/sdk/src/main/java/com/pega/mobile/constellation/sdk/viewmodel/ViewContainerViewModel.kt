package com.pega.mobile.constellation.sdk.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.pega.mobile.constellation.sdk.components.Component

class ViewContainerViewModel : ComponentViewModel {
    private val _state = MutableLiveData<ViewContainerState>()
    val state: LiveData<ViewContainerState>
        get() = _state

    fun update(state: ViewContainerState) {
        _state.postValue(state)
    }
}

data class ViewContainerState(
    val children: List<Component>
)