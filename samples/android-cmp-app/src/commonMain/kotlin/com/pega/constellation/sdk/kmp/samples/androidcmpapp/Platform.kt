package com.pega.constellation.sdk.kmp.samples.androidcmpapp

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform
