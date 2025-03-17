package com.pega.mobile.constellation.sdk.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.pega.mobile.constellation.sdk.components.Component

class RootContainerViewModel : ComponentViewModel {
    private val _state = MutableLiveData<RootContainerState>()
    val state: LiveData<RootContainerState>
        get() = _state

    fun update(state: RootContainerState) {
        _state.postValue(state)
    }
}

data class RootContainerState(
    val children: List<Component>
)