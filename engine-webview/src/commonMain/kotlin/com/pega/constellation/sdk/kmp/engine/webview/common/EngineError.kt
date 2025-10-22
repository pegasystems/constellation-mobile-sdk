package com.pega.constellation.sdk.kmp.engine.webview.common

import com.pega.constellation.sdk.kmp.core.EngineError
import com.pega.constellation.sdk.kmp.core.Log

class JsError(val type: JsErrorType, override val message: String) : EngineError

class InternalError(override val message: String) : EngineError

enum class JsErrorType {
    UncaughtError, UnhandledRejectionError, InitError, UnspecifiedError;

    companion object {
        fun String.toJsErrorType() =
            runCatching {
                JsErrorType.valueOf(this)
            }.getOrElse {
                Log.w("JsErrorType", "Unspecified JS error type: $this")
                UnspecifiedError
            }
    }
}
