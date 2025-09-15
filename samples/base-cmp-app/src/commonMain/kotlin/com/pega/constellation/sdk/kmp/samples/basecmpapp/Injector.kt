package com.pega.constellation.sdk.kmp.samples.basecmpapp

import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngineBuilder
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthManager
import org.publicvalue.multiplatform.oidc.ExperimentalOpenIdConnect

@OptIn(ExperimentalOpenIdConnect::class)
object Injector {
    internal lateinit var authManager: AuthManager
    internal lateinit var engineBuilder: ConstellationSdkEngineBuilder

    fun init(
        authManager: AuthManager,
        engineBuilder: ConstellationSdkEngineBuilder,
    ) {
        this.authManager = authManager
        this.engineBuilder = engineBuilder
    }
}