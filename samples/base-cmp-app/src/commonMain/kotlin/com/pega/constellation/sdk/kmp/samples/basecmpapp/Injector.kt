package com.pega.constellation.sdk.kmp.samples.basecmpapp

import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthManager
import org.publicvalue.multiplatform.oidc.ExperimentalOpenIdConnect

@OptIn(ExperimentalOpenIdConnect::class)
object Injector {
    internal lateinit var authManager: AuthManager
    internal lateinit var engine: ConstellationSdkEngine

    fun init(
        authManager: AuthManager,
        engine: ConstellationSdkEngine
    ) {
        this.authManager = authManager
        this.engine = engine
    }
}