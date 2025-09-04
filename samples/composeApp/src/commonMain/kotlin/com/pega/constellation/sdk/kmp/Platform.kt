package com.pega.constellation.sdk.kmp

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform