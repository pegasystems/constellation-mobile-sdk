package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.junit4.ComposeContentTestRule
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
import com.pega.constellation.sdk.kmp.test.mock.MockInterceptor
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.AppContext
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import okhttp3.OkHttpClient
import org.junit.Rule
import org.junit.rules.TestRule
import org.junit.runner.Description
import org.publicvalue.multiplatform.oidc.ExperimentalOpenIdConnect
import kotlin.test.AfterTest
import kotlin.test.BeforeTest

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
annotation class PegaCase(val caseClassName: String)

@OptIn(ExperimentalOpenIdConnect::class, ExperimentalTestApi::class)
abstract class ComposeTest(
    private val pegaVersion: PegaVersion,
    val mode: ComposeTestMode = MockServer,
    maxAttempts: Int = 2,
) {
    @get:Rule
    val composeTestRule: TestRule = RetryingComposeTestRule(this, maxAttempts)
    internal lateinit var composeRule: ComposeContentTestRule
    internal lateinit var testDescription: Description
    private val scope = CoroutineScope(Dispatchers.Default)
    private val webViewScope = CoroutineScope(Dispatchers.Main)
    private val instrumentation = InstrumentationRegistry.getInstrumentation()
    private val context = instrumentation.targetContext
    private val authManager = AuthManager(scope, FakeAuthFlowFactory(), FakeTokenStore(mode.token))
    private lateinit var mockInterceptor: MockInterceptor
    private lateinit var httpClient: OkHttpClient
    private var engine: AndroidWebViewEngine? = null

    @BeforeTest
    fun setUp() {
        val caseClassName = requireNotNull(testDescription.getAnnotation(PegaCase::class.java)) {
            "Missing @PegaCase on ${testDescription.className}.${testDescription.methodName}"
        }.caseClassName
        require(caseClassName.isNotBlank()) {
            "Empty case type in @PegaCase on ${testDescription.className}.${testDescription.methodName}"
        }
        hideKeyboard()
        AppContext.init(context)
        mockInterceptor = MockInterceptor(context, pegaVersion)
        httpClient = buildHttpClient(authManager)
        val engine = AndroidWebViewEngine(context, webViewScope, httpClient, httpClient)
        this@ComposeTest.engine = engine
        Injector.init(authManager, engine)

        composeRule.setContent {
            MediaCoApp(
                appViewModel = viewModel { MediaCoAppViewModel(authManager) },
                pegaViewModel = viewModel { PegaViewModel(buildSdk(), caseClassName) },
                servicesViewModel = viewModel { ServicesViewModel(FakeAssignmentsRepository()) }
            )
        }
    }

    @AfterTest
    fun tearDown() {
        runBlocking(Dispatchers.Main) {
            engine?.destroy()
            engine = null
        }
    }

    protected fun ComposeContentTestRule.waitForRequestBody(urlPart: String): String {
        var requestBody: String? = null
        waitUntil(timeoutMillis = 3_000) {
            requestBody = mockInterceptor.findRequest(urlPart)?.body
            requestBody != null
        }
        return requireNotNull(requestBody)
    }

    private fun buildSdk() = ConstellationSdk.create(buildSdkConfig(), requireNotNull(engine))

    private fun buildSdkConfig() = ConstellationSdkConfig(
        pegaUrl = PEGA_URL,
        componentManager = buildComponentManager()
    )

    private fun buildComponentManager() = ComponentManager.create(TestComponentDefinitions)

    private fun buildHttpClient(authManager: AuthManager) = when (mode) {
        is MockServer -> MockHttpClient(mockInterceptor)
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
