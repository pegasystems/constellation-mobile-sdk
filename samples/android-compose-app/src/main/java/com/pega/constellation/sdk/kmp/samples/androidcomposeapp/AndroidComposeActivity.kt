package com.pega.constellation.sdk.kmp.samples.androidcomposeapp

import android.os.Bundle
import android.util.Log
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
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State.Cancelled
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State.Error
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State.Finished
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State.Initial
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State.Loading
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State.Ready
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.api.ComponentDefinition
import com.pega.constellation.sdk.kmp.core.api.ComponentManager
import com.pega.constellation.sdk.kmp.core.api.ComponentScript
import com.pega.constellation.sdk.kmp.core.api.ComponentType
import com.pega.constellation.sdk.kmp.core.components.fields.EmailComponent
import com.pega.constellation.sdk.kmp.engine.webview.android.AndroidWebViewEngine
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
            Scaffold(Modifier.fillMaxSize()) { innerPadding ->
                val sdkState by sdk.state.collectAsState()
                Box(Modifier.padding(innerPadding)) {
                    PegaForm(sdkState)
                }
            }
        }
    }

    private fun initConstellation() {
        val config = ConstellationSdkConfig(
            pegaUrl = AndroidSDKConfig.PEGA_URL,
            pegaVersion = AndroidSDKConfig.PEGA_VERSION,
            componentManager = ComponentManager.create(
                listOf(
                    ComponentDefinition(
                        ComponentType("Email"),
                        ComponentScript("components_overrides/email.component.override.js"),
                        ::EmailComponent
                    )
                )
            ),
            debuggable = true
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
            .addNetworkInterceptor(NetworkInterceptor())
            .build()

    private class AuthInterceptor : Interceptor {
        override fun intercept(chain: Interceptor.Chain): Response {
            val token = AndroidSDKConfig.AUTH_TOKEN
            val newRequest = chain.request().newBuilder()
                .header("Authorization", token)
                .build()
            return chain.proceed(newRequest)
        }
    }

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
}

@Composable
fun PegaForm(state: State) {
    when (state) {
        is Initial -> {}
        is Loading -> ShowLoader()
        is Ready -> ShowForm(state)
        is Finished -> ShowAlert("Thanks for registration")
        is Cancelled -> ShowAlert("Cancelled")
        is Error -> ShowAlert(state.error.message ?: "Error")
    }
}

@Composable
fun ShowLoader() {
    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        CircularProgressIndicator(Modifier.align(Alignment.Center))
    }
}

@Composable
fun ShowForm(state: Ready) {
    Box(Modifier.padding(8.dp)) {
        state.root.Render()
    }
}

@Composable
fun ShowAlert(message: String) {
    var showAlert by remember { mutableStateOf(true) }
    if (showAlert) {
        Alert(message) { showAlert = false }
    }
}
