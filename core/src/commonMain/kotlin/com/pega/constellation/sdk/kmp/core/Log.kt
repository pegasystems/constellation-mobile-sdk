package com.pega.constellation.sdk.kmp.core

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
