package com.pega.constellation.sdk.kmp.core.components.widgets
class Dialog {
    data class Config(
        val type: Type,
        val message: String,
        val onConfirm: () -> Unit = {},
        val onCancel: (() -> Unit) = {},
        // Prompt-specific
        val promptDefault: String? = null,
        val onPromptConfirm: (String?) -> Unit = {}
    )
    enum class Type {
        ALERT, CONFIRM, PROMPT
    }
}