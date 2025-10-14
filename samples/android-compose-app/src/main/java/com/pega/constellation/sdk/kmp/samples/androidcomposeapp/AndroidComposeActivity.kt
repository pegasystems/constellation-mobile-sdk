package com.pega.constellation.sdk.kmp.samples.androidcomposeapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.engine.webview.android.AndroidWebViewEngine
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.theme.ConstellationmobilesdkTheme
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Alert
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.AppContext
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render
import okhttp3.Interceptor
import okhttp3.Response

class AndroidComposeActivity : ComponentActivity() {
    private lateinit var sdk: ConstellationSdk
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        AppContext.init(this)

        initConstellation()
        setContent {
            ConstellationmobilesdkTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    val sdkState by sdk.state.collectAsState()
                    Box(modifier = Modifier.padding(innerPadding)) {
                        PegaForm(sdkState)
                    }
                }
            }
        }
    }

    private fun initConstellation() {
        val config = ConstellationSdkConfig(
            pegaUrl = AndroidSDKConfig.PEGA_URL,
            pegaVersion = AndroidSDKConfig.PEGA_VERSION
        )
        val caseClassName = AndroidSDKConfig.PEGA_CASE_CLASS_NAME
        val engine = AndroidWebViewEngine(this, buildHttpClient())
        sdk = ConstellationSdk.create(config, engine)
        sdk.createCase(caseClassName)
    }

    private fun buildHttpClient() =
        AndroidWebViewEngine.defaultHttpClient()
            .newBuilder()
            .addInterceptor(AuthInterceptor())
            .build()
}

@Composable
fun PegaForm(state: ConstellationSdk.State) {
    when (state) {
        ConstellationSdk.State.Cancelled -> ShowAlert("Cancelled")
        is ConstellationSdk.State.Error -> ShowAlert(state.error ?: "Error")
        is ConstellationSdk.State.Finished -> ShowAlert("Thanks for registration")
        ConstellationSdk.State.Initial -> {}
        ConstellationSdk.State.Loading -> ShowLoader()
        is ConstellationSdk.State.Ready -> ShowForm(state)
    }
}

@Composable
fun ShowLoader() {
    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        CircularProgressIndicator(Modifier.align(Alignment.Center))
    }
}

@Composable
fun ShowForm(state: ConstellationSdk.State.Ready) {
    state.root.Render()
}

@Composable
fun ShowAlert(message: String) {
    var showAlert by remember { mutableStateOf(true) }
    if (showAlert) {
        Alert(message) { showAlert = false }
    }
}

class AuthInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val token = AndroidSDKConfig.AUTH_TOKEN
        val newRequest = chain.request().newBuilder()
            .header("Authorization", token)
            .build()
        return chain.proceed(newRequest)
    }
}
