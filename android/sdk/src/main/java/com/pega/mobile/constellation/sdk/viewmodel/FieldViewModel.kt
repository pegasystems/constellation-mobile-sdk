package com.pega.mobile.constellation.sdk.viewmodel

import androidx.lifecycle.LiveData

interface FieldViewModel : ComponentViewModel {
    val state: LiveData<out FieldState>

    fun update(state: FieldState)
    fun setValue(value: String)
    fun setFocus(focused: Boolean)
}

interface FieldState {
    val value: String
    val label: String
    val visible: Boolean
    val required: Boolean
    val disabled: Boolean
    val readOnly: Boolean
    val helperText: String
    val validateMessage: String
}

data class BaseFieldState(
    override val value: String,
    override val label: String,
    override val visible: Boolean,
    override val required: Boolean,
    override val disabled: Boolean,
    override val readOnly: Boolean,
    override val helperText: String,
    override val validateMessage: String
) : FieldState
