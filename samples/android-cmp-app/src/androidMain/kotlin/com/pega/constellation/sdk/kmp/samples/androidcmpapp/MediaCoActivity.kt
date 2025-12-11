package com.pega.constellation.sdk.kmp.samples.androidcmpapp

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.lifecycle.lifecycleScope
import com.pega.constellation.sdk.kmp.engine.webview.android.AndroidWebViewEngine
import com.pega.constellation.sdk.kmp.samples.basecmpapp.Injector
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MediaCoApp
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthManager
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.AppContext
import okhttp3.Interceptor
import okhttp3.Response
import org.publicvalue.multiplatform.oidc.ExperimentalOpenIdConnect
import org.publicvalue.multiplatform.oidc.appsupport.AndroidCodeAuthFlowFactory
import org.publicvalue.multiplatform.oidc.appsupport.CodeAuthFlowFactory
import org.publicvalue.multiplatform.oidc.tokenstore.AndroidSettingsTokenStore

class MediaCoActivity : ComponentActivity() {

    @OptIn(ExperimentalOpenIdConnect::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val authFlowFactory = AndroidCodeAuthFlowFactory().also { it.registerActivity(this) }
        val authManager = createAuthManager(authFlowFactory)

        val engine = AndroidWebViewEngine(
            context = this,
            okHttpClient = buildHttpClient(authManager),
            lifecycleScope = this.lifecycleScope
        )
        Injector.init(authManager, engine)
        AppContext.init(this)

        setContent {
            MediaCoApp()
        }
    }

    private fun buildHttpClient(authManager: AuthManager) =
        AndroidWebViewEngine.defaultHttpClient()
            .newBuilder()
            .addInterceptor(AuthInterceptor(authManager))
            .addNetworkInterceptor(NetworkInterceptor())
            .build()

    private class NetworkInterceptor : Interceptor {
        override fun intercept(chain: Interceptor.Chain): Response {
            val request = chain.request().also {
                Log.d("NetworkInterceptor", "request: [${it.method}] ${it.url}")
            }
            return chain.proceed(request).also {
                Log.d("NetworkInterceptor", "response: [${it.code}] ${it.request.url}")
            }
        }
    }

    @OptIn(ExperimentalOpenIdConnect::class)
    private fun createAuthManager(authFlowFactory: CodeAuthFlowFactory) =
        AuthManager(
            scope = lifecycleScope,
            authFlowFactory = authFlowFactory,
            tokenStore = AndroidSettingsTokenStore(this)
        )

}
