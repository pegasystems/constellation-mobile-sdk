package com.pega.constellation.sdk.kmp.core

import kotlin.concurrent.Volatile

object Log {
    internal enum class Level {
        VERBOSE, DEBUG, INFO, WARN, ERROR
    }

    @Volatile
    internal var debugEnabled: Boolean = false

    private fun emit(
        level: Level,
        tag: String,
        message: () -> String,
        throwable: Throwable? = null
    ) {
        if (debugEnabled || level == Level.WARN || level == Level.ERROR) {
            writeLog(level, tag, message(), throwable)
        }
    }

    fun v(tag: String, message: String) {
        v(tag) { message }
    }

    fun v(tag: String, message: () -> String) {
        emit(Level.VERBOSE, tag, message)
    }

    fun d(tag: String, message: String) {
        d(tag) { message }
    }

    fun d(tag: String, message: () -> String) {
        emit(Level.DEBUG, tag, message)
    }

    fun i(tag: String, message: String) {
        i(tag) { message }
    }

    fun i(tag: String, message: () -> String) {
        emit(Level.INFO, tag, message)
    }

    fun w(tag: String, message: String) {
        emit(Level.WARN, tag, { message })
    }

    fun e(tag: String, message: String, throwable: Throwable? = null) {
        emit(Level.ERROR, tag, { message }, throwable)
    }
}

internal expect fun writeLog(level: Log.Level, tag: String, message: String, throwable: Throwable?)
