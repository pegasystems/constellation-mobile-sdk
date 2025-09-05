package com.pega.constellation.sdk.kmp.samples.androidcmpapp

class Greeting {
    private val platform = getPlatform()

    fun greet(): String {
        return "Hello, ${platform.name}!"
    }
}
