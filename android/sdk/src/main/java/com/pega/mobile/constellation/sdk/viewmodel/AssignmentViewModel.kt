package com.pega.mobile.constellation.sdk.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.pega.mobile.constellation.sdk.components.Component

class AssignmentViewModel : ComponentViewModel {
    private val _state = MutableLiveData<AssignmentState>()
    val state: LiveData<AssignmentState>
        get() = _state

    fun update(state: AssignmentState) {
        _state.postValue(state)
    }
}

data class AssignmentState(
    val children: List<Component>
)