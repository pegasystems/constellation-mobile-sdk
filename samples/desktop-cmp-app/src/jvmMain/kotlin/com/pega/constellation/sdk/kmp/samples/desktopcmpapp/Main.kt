package com.pega.constellation.sdk.kmp.samples.desktopcmpapp

import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.pega.constellation.sdk.kmp.samples.basecmpapp.Injector
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MediaCoApp
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MockSdkEngine.MockSdkEngineBuilder
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import org.publicvalue.multiplatform.oidc.ExperimentalOpenIdConnect
import org.publicvalue.multiplatform.oidc.appsupport.JvmCodeAuthFlowFactory

@OptIn(ExperimentalOpenIdConnect::class)
fun main() {
    Injector.init(createAuthManager(), MockSdkEngineBuilder())

    application {
        Window(
            onCloseRequest = ::exitApplication,
            title = "MediaCo Desktop CMP App",
        ) {
            MediaCoApp()
        }
    }
}

@OptIn(ExperimentalOpenIdConnect::class)
private fun createAuthManager() =
    AuthManager(
        scope = CoroutineScope(Dispatchers.Main),
        authFlowFactory = JvmCodeAuthFlowFactory(),
        tokenStore = JvmTokenStore(),
        config = AuthManager.AuthConfig(
            redirectUri = "http://localhost:8080/redirect" // JVM target handles localhost only
        )
    )

