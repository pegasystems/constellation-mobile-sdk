package com.pega.mobile.constellation.sdk.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.pega.mobile.constellation.sdk.components.Component
import com.pega.mobile.constellation.sdk.components.widgets.ActionButtonsComponent

class AssignmentCardViewModel : ComponentViewModel {
    private val _state = MutableLiveData<AssignmentCardState>()
    val state: LiveData<AssignmentCardState>
        get() = _state

    fun update(state: AssignmentCardState) {
        _state.postValue(state)
    }
}

data class AssignmentCardState(
    val children: List<Component>,
    val actionButtons: ActionButtonsComponent
)