package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test

import androidx.compose.ui.test.ComposeUiTest
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.lifecycle.viewmodel.compose.viewModel
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
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MediaCoApp
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MediaCoAppViewModel
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthManager
import com.pega.constellation.sdk.kmp.samples.basecmpapp.data.fake.FakeAssignmentsRepository
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.components.CustomEmailComponent
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.pega.PegaViewModel
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.services.ServicesViewModel
import com.pega.constellation.sdk.kmp.test.mock.MockHttpClient
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import okhttp3.OkHttpClient
import org.publicvalue.multiplatform.oidc.ExperimentalOpenIdConnect
import kotlin.test.BeforeTest

@OptIn(ExperimentalOpenIdConnect::class)
abstract class ComposeTest(
    private val pegaVersion: PegaVersion,
    val mode: ComposeTestMode = MockServer,
) {
    private val scope = CoroutineScope(Dispatchers.Default)
    private val webViewScope = CoroutineScope(Dispatchers.Main)
    private val instrumentation = InstrumentationRegistry.getInstrumentation()
    private val context = instrumentation.targetContext
    private val authManager = AuthManager(scope, FakeAuthFlowFactory(), FakeTokenStore(mode.token))
    private val httpClient = buildHttpClient(authManager)
    private val engine = AndroidWebViewEngine(context, webViewScope, httpClient, httpClient)

    @BeforeTest
    fun setUp() {
        hideKeyboard()
        Injector.init(authManager, engine)
    }

    @OptIn(ExperimentalTestApi::class)
    protected fun ComposeUiTest.setupApp(caseClassName: String) {
        setContent {
            MediaCoApp(
                appViewModel = viewModel { MediaCoAppViewModel(authManager) },
                pegaViewModel = viewModel { PegaViewModel(buildSdk(), caseClassName) },
                servicesViewModel = viewModel { ServicesViewModel(FakeAssignmentsRepository()) }
            )
        }
    }

    private fun buildSdk() = ConstellationSdk.create(buildSdkConfig(), engine)

    private fun buildSdkConfig() = ConstellationSdkConfig(
        pegaUrl = PEGA_URL,
        pegaVersion = pegaVersion.versionString,
        componentManager = buildComponentManager(),
        debuggable = true
    )

    private fun buildComponentManager() = ComponentManager.create(TestComponentDefinitions)

    private fun buildHttpClient(authManager: AuthManager) = when (mode) {
        is MockServer -> MockHttpClient(context, pegaVersion)
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

        val TestComponentDefinitions = listOf(
            ComponentDefinition(Email) { CustomEmailComponent(it) }
        )
    }
}
