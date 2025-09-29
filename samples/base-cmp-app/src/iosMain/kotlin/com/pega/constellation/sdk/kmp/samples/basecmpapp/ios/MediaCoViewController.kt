package com.pega.constellation.sdk.kmp.samples.basecmpapp.ios

import androidx.compose.ui.window.ComposeUIViewController
import com.pega.constellation.sdk.kmp.engine.webview.ios.WKWebViewBasedEngine
import com.pega.constellation.sdk.kmp.samples.basecmpapp.Injector
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MediaCoApp
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import org.publicvalue.multiplatform.oidc.ExperimentalOpenIdConnect
import org.publicvalue.multiplatform.oidc.appsupport.IosCodeAuthFlowFactory
import org.publicvalue.multiplatform.oidc.tokenstore.IosKeychainTokenStore
import platform.UIKit.UIView
import platform.UIKit.UIViewController

// Entry point for the iOS application
@Suppress("unused")
fun MediaCoViewController(): UIViewController {
    val authManager = createAuthManager()
    val provider = AuthenticatedResourceProvider(authManager)
    val engine = WKWebViewBasedEngine(provider)

    Injector.init(authManager, engine)

    return ComposeUIViewController { MediaCoApp() }.also { vc ->
        vc.view.addSubview(engine.webView)
    }
}

@OptIn(ExperimentalOpenIdConnect::class)
private fun createAuthManager() =
    AuthManager(
        scope = CoroutineScope(Dispatchers.Main),
        authFlowFactory = IosCodeAuthFlowFactory(),
        tokenStore = IosKeychainTokenStore()
    )
