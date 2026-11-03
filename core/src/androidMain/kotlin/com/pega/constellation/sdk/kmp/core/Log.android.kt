package com.pega.constellation.sdk.kmp.core

import android.util.Log as AndroidLog

internal actual fun writeLog(
    level: Log.Level,
    tag: String,
    message: String,
    throwable: Throwable?
) {
    when (level) {
        Log.Level.VERBOSE -> AndroidLog.v(tag, message)
        Log.Level.DEBUG -> AndroidLog.d(tag, message)
        Log.Level.INFO -> AndroidLog.i(tag, message)
        Log.Level.WARN -> AndroidLog.w(tag, message)
        Log.Level.ERROR -> {
            if (throwable == null) {
                AndroidLog.e(tag, message)
            } else {
                AndroidLog.e(tag, message, throwable)
            }
        }
    }
}
