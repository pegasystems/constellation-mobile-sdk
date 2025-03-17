package com.pega.mobile.constellation.sdk.viewmodel

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData

class ActionButtonsViewModel(
    private val onClick: (type: String, jsAction: String) -> Unit
) {
    private val _state = MutableLiveData<ActionButtonsState>()
    val state: LiveData<ActionButtonsState>
        get() = _state

    fun update(state: ActionButtonsState) {
        _state.postValue(state)
    }

    fun click(button: ActionButton) {
        onClick(button.type, button.jsAction)
    }
}

data class ActionButtonsState(
    val primaryButtons: List<ActionButton>,
    val secondaryButtons: List<ActionButton>
)

data class ActionButton(
    val type: String,
    val name: String,
    val jsAction: String,
)
