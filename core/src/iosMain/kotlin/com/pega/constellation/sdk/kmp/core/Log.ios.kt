package com.pega.constellation.sdk.kmp.core

internal actual fun writeLog(
    level: Log.Level,
    tag: String,
    message: String,
    throwable: Throwable?
) {
    val suffix = if (level == Log.Level.ERROR) {
        " ${throwable?.toString()}"
    } else {
        ""
    }
    println("${level.name.first()}: [$tag] $message$suffix")
}
