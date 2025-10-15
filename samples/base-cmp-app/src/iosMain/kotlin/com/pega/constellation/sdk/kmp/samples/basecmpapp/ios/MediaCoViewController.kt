package com.pega.constellation.sdk.kmp.samples.basecmpapp.ios

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.UIKitView
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
import platform.UIKit.UIViewController
import platform.WebKit.WKWebView

// Entry point for the iOS application
@Suppress("FunctionName", "unused")
fun MediaCoViewController(): UIViewController {
    val authManager = createAuthManager()
    val provider = AuthenticatedResourceProvider(authManager)
    val engine = WKWebViewBasedEngine(provider)

    Injector.init(authManager, engine)

    return ComposeUIViewController { MediaCoAppWithEngineInjected(engine.webView) }
//        .also { vc ->
//        // vc.view.addSubview(engine.webView)
//    }
}

@Composable
fun MediaCoAppWithEngineInjected(webView: WKWebView) {
    // Inject the invisible WebView to the view hierarchy to ensure iOS does not throttle it.
    // EngineWebView(webView = webView)
    MediaCoApp(engineWebView = { EngineWebView(webView) })
}

@Composable
fun EngineWebView(webView: WKWebView) {
    UIKitView(
        factory = {
            webView
        },
        modifier = Modifier
            .graphicsLayer {
                alpha = 1.0f
            }
            .height(30.dp)
            .background(Color.Red)
    )
}


@OptIn(ExperimentalOpenIdConnect::class)
private fun createAuthManager() =
    AuthManager(
        scope = CoroutineScope(Dispatchers.Main),
        authFlowFactory = IosCodeAuthFlowFactory(),
        tokenStore = IosKeychainTokenStore()
    )
