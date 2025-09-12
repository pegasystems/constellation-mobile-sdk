package com.pega.constellation.sdk.kmp.samples.basecmpapp

import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngineBuilder

object SDKInitializer {
    internal lateinit var engineBuilder: ConstellationSdkEngineBuilder

    fun init(engineBuilder: ConstellationSdkEngineBuilder) {
        this.engineBuilder = engineBuilder
    }
}