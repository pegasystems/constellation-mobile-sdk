package com.pega.constellation.sdk.kmp.core.components.core

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue

class AlertComponent {
    var info: Info? by mutableStateOf(null)
        private set

    fun setAlertInfo(info: Info?) {
        this.info = info
    }

    data class Info(
        val type: Type,
        val message: String,
        val onConfirm: () -> Unit,
        val onCancel: (() -> Unit) = {},
    )

    enum class Type {
        ALERT, CONFIRM
    }
}


