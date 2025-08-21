package com.pega.mobile.constellation.sample

import androidx.activity.ComponentActivity
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.ui.Modifier
import androidx.compose.ui.test.junit4.ComposeTestRule
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.lifecycle.ViewModelProvider.AndroidViewModelFactory.Companion.APPLICATION_KEY
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.uiautomator.UiDevice
import com.pega.mobile.constellation.mock.MockHttpClient
import com.pega.mobile.constellation.sample.ComposeTest.Mode.MOCK_SERVER
import com.pega.mobile.constellation.sample.ComposeTest.Mode.REAL_SERVER
import com.pega.mobile.constellation.sample.MediaCoApplication.Companion.authManager
import com.pega.mobile.constellation.sample.auth.AuthInterceptor
import com.pega.mobile.constellation.sample.auth.AuthManager
import com.pega.mobile.constellation.sample.ui.components.CustomEmailComponent
import com.pega.mobile.constellation.sample.ui.screens.home.HomeScreen
import com.pega.mobile.constellation.sample.ui.screens.pega.PegaViewModel
import com.pega.mobile.constellation.sample.ui.theme.MediaCoTheme
import com.pega.mobile.constellation.sdk.ConstellationSdk
import com.pega.mobile.constellation.sdk.ConstellationSdkConfig
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Email
import com.pega.mobile.constellation.sdk.components.core.ComponentDefinition
import com.pega.mobile.constellation.sdk.components.core.ComponentManager
import okhttp3.OkHttpClient
import org.junit.Before
import org.junit.Rule

abstract class ComposeTest {
    enum class Mode { MOCK_SERVER, REAL_SERVER }

    private val mode = MOCK_SERVER

    @get:Rule
    val composeTestRule = createAndroidComposeRule<ComponentActivity>()

    @Before
    fun setUp() {
        hideKeyboard()
    }

    protected fun runComposeTest(test: ComposeTestRule.() -> Unit) {
        test(composeTestRule)
    }

    protected fun setupApp(caseClassName: String) {
        composeTestRule.setContent {
            MediaCoTheme {
                Scaffold(Modifier.fillMaxSize()) { innerPadding ->
                    Box(Modifier.padding(innerPadding)) {
                        HomeScreen(pegaViewModel = viewModel(factory = testFactory(caseClassName)))
                    }
                }
            }
        }
    }

    private fun testFactory(caseClassName: String) = viewModelFactory {
        initializer {
            val application = checkNotNull(this[APPLICATION_KEY])
            val authManager = application.authManager.apply { authenticateForTesting() }
            val sdk = ConstellationSdk.create(application, buildSdkConfig(authManager))
            PegaViewModel(application, sdk, caseClassName)
        }
    }

    private fun buildSdkConfig(authManager: AuthManager) = ConstellationSdkConfig(
        pegaUrl = PEGA_URL,
        pegaVersion = PEGA_VERSION,
        debuggable = true,
        okHttpClient = buildHttpClient(authManager),
        componentManager = buildComponentManager()
    )

    private fun buildComponentManager() = ComponentManager.create(TestComponentDefinitions)

    private fun buildHttpClient(authManager: AuthManager) = when (mode) {
        MOCK_SERVER -> MockHttpClient(InstrumentationRegistry.getInstrumentation().context)
        REAL_SERVER -> OkHttpClient().newBuilder()
            .addInterceptor(AuthInterceptor(authManager))
            .build()
    }

    private fun hideKeyboard() {
        UiDevice.getInstance(InstrumentationRegistry.getInstrumentation())
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
