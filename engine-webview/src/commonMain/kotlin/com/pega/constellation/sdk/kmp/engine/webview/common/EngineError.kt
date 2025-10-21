package com.pega.constellation.sdk.kmp.engine.webview.common

import com.pega.constellation.sdk.kmp.core.EngineError

class JsError(val type: JsErrorType, override val message: String) : EngineError

class InternalError(override val message: String) : EngineError

enum class JsErrorType(val displayName: String) {
    UNCAUGHT_ERROR("UncaughtError"),
    UNHANDLED_REJECTION_ERROR("UnhandledRejectionError"),
    INIT_ERROR("InitError"),
    UNSPECIFIED_ERROR("UnspecifiedError");

    companion object {
        fun String?.toJsErrorType() =
            this?.let {
                runCatching {
                    JsErrorType.valueOf(it.uppercase())
                }.getOrElse {
                    UNSPECIFIED_ERROR
                }
            } ?: UNSPECIFIED_ERROR
    }
}
