package com.pega.constellation.sdk.kmp.samples.androidcmpapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.lifecycle.lifecycleScope
import com.pega.constellation.sdk.kmp.samples.basecmpapp.Injector
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MediaCoApp
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MockSdkEngine
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthManager
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.AppContext
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

        Injector.init(authManager, AndroidEngineBuilder(this, authManager))
//        Injector.init(authManager, MockSdkEngine.MockSdkEngineBuilder())
        AppContext.init(this)

        setContent {
            MediaCoApp()
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
