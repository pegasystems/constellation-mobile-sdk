package com.pega.mobile.constellation.sdk.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.pega.mobile.constellation.sdk.components.Component

class RegionViewModel : ComponentViewModel {
    private val _state = MutableLiveData<RegionState>()
    val state: LiveData<RegionState>
        get() = _state

    fun update(state: RegionState) {
        _state.postValue(state)
    }
}

data class RegionState(
    val children: List<Component>
)