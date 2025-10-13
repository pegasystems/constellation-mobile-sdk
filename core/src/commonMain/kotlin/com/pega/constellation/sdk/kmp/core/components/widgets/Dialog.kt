package com.pega.constellation.sdk.kmp.core.components.widgets

class Dialog {
    data class Config(
        val type: Type,
        val message: String,
        val onConfirm: () -> Unit,
        val onCancel: (() -> Unit) = {},
    )

    enum class Type {
        ALERT, CONFIRM
    }
}