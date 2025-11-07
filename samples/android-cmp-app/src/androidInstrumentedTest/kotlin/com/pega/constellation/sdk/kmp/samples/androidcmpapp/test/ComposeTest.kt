package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.ui.Modifier
import androidx.compose.ui.test.ComposeUiTest
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.uiautomator.UiDevice
import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.api.ComponentDefinition
import com.pega.constellation.sdk.kmp.core.api.ComponentManager
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Email
import com.pega.constellation.sdk.kmp.engine.webview.android.AndroidWebViewEngine
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.AuthInterceptor
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTestMode.MockServer
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTestMode.RealServer
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.fake.FakeAuthFlowFactory
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.fake.FakeTokenStore
import com.pega.constellation.sdk.kmp.samples.basecmpapp.Injector
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthManager
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.components.CustomEmailComponent
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.home.HomeScreen
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.pega.PegaViewModel
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.theme.MediaCoTheme
import com.pega.constellation.sdk.kmp.test.mock.MockHttpClient
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import okhttp3.OkHttpClient
import org.publicvalue.multiplatform.oidc.ExperimentalOpenIdConnect
import kotlin.test.BeforeTest

@OptIn(ExperimentalOpenIdConnect::class)
abstract class ComposeTest(val mode: ComposeTestMode = MockServer) {
    private val scope = CoroutineScope(Dispatchers.Default)
    private val instrumentation = InstrumentationRegistry.getInstrumentation()
    private val context = instrumentation.targetContext
    private val authManager = AuthManager(scope, FakeAuthFlowFactory(), FakeTokenStore(mode.token))
    private val httpClient = buildHttpClient(authManager)
    private val engine = AndroidWebViewEngine(context, httpClient, httpClient)

    @BeforeTest
    fun setUp() {
        hideKeyboard()
        Injector.init(authManager, engine)
    }

    @OptIn(ExperimentalTestApi::class)
    protected fun ComposeUiTest.setupApp(caseClassName: String, version: String? = null) {
        setContent {
            MediaCoTheme {
                Scaffold(Modifier.fillMaxSize()) { innerPadding ->
                    Box(Modifier.padding(innerPadding)) {
                        HomeScreen(pegaViewModel = viewModel(factory = testFactory(caseClassName, version)))
                    }
                }
            }
        }
    }

    @OptIn(ExperimentalOpenIdConnect::class)
    private fun testFactory(caseClassName: String, version: String?) = viewModelFactory {
        initializer {
            val sdk = ConstellationSdk.create(buildSdkConfig(version), engine)
            PegaViewModel(authManager, sdk, caseClassName)
        }
    }

    private fun buildSdkConfig(version: String?) = ConstellationSdkConfig(
        pegaUrl = PEGA_URL,
        pegaVersion = version ?: PEGA_VERSION,
        componentManager = buildComponentManager(),
        debuggable = true
    )

    private fun buildComponentManager() = ComponentManager.create(TestComponentDefinitions)

    private fun buildHttpClient(authManager: AuthManager) = when (mode) {
        is MockServer -> MockHttpClient(context)
        is RealServer -> OkHttpClient().newBuilder()
            .addInterceptor(AuthInterceptor(authManager))
            .build()
    }

    private fun hideKeyboard() {
        UiDevice.getInstance(instrumentation)
            .executeShellCommand("settings put secure show_ime_with_hard_keyboard 0")
    }


    companion object {
        private const val PEGA_URL = "https://insert-url-here.example/prweb"
        private const val PEGA_VERSION = "24.1.0"

        val TestComponentDefinitions = listOf(
            ComponentDefinition(Email) { CustomEmailComponent(it) }
        )
    }
}
