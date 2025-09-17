package com.pega.constellation.sdk.kmp.samples.basecmpapp.ios

import androidx.compose.ui.window.ComposeUIViewController
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngineBuilder
import com.pega.constellation.sdk.kmp.samples.basecmpapp.Injector
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MediaCoApp
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MockSdkEngine.MockSdkEngineBuilder
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import org.publicvalue.multiplatform.oidc.ExperimentalOpenIdConnect
import org.publicvalue.multiplatform.oidc.appsupport.IosCodeAuthFlowFactory
import org.publicvalue.multiplatform.oidc.tokenstore.IosKeychainTokenStore
import platform.UIKit.UIViewController

// Entry point for the iOS application
@Suppress("unused")
fun MediaCoViewController(authManager: AuthManager, engineBuilder: ConstellationSdkEngineBuilder): UIViewController {
    Injector.init(authManager, engineBuilder)
    return ComposeUIViewController { MediaCoApp() }
}

@Suppress("unused")
@OptIn(ExperimentalOpenIdConnect::class)
fun createAuthManager() =
    AuthManager(
        scope = CoroutineScope(Dispatchers.Main),
        authFlowFactory = IosCodeAuthFlowFactory(),
        tokenStore = IosKeychainTokenStore()
    )
