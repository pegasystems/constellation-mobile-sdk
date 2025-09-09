package com.pega.constellation.sdk.kmp.ui.components.cmp.stub

object Log {
    fun i(tag: String, message: String) {
        println("I: [$tag] $message")
    }

    fun w(tag: String, message: String) {
        println("W: [$tag] $message")
    }

    fun e(tag: String, message: String, throwable: Throwable? = null) {
        println("E: [$tag] $message ${throwable?.toString()}")
    }
}
