package com.pega.mobile.constellation.sample

import androidx.activity.ComponentActivity
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.ui.Modifier
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.assertTextContains
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.junit4.ComposeContentTestRule
import androidx.compose.ui.test.junit4.createAndroidComposeRule
import androidx.compose.ui.test.onFirst
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.onSiblings
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextInput
import androidx.compose.ui.test.performTextReplacement
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
import org.junit.Test

class ComposeTest {
    enum class Mode { MOCK_SERVER, REAL_SERVER }

    private val mode = MOCK_SERVER

    @get:Rule
    val composeTestRule = createAndroidComposeRule<ComponentActivity>()

    @Before
    fun setUp() {
        hideKeyboard()
    }

    @Test
    fun test_case_processing_sdk_testing() = with(composeTestRule) {
        setupApp(caseClassName = "DIXL-MediaCo-Work-SDKTesting")

        onNodeWithText(CREATE_CASE_TEXT).performClick()
        waitForNode("Create")

        onNodeWithText("Name", substring = true).performTextInput("Jan")
        onNodeWithText("Surname").performTextInput("Kowalski")
        onNodeWithText("Url").performTextInput("https://pega.com")
        onNodeWithText("Next").performClick()

        waitForNode("Submit")
        onNodeWithText("Name").assertTextContains("Jan")
        onNodeWithText("Surname").assertTextContains("Kowalski")
        onNodeWithText("Url").assertTextContains("https://pega.com")

        onNodeWithText("Cancel").performClick()
        waitForNode(CREATE_CASE_TEXT)
    }

    @Test
    fun test_case_processing_service() = with(composeTestRule) {
        setupApp(caseClassName = "DIXL-MediaCo-Work-NewService")

        onNodeWithText(CREATE_CASE_TEXT).performClick()
        waitForNode("Customer")

        onNodeWithText("First Name").performTextInput("Jan")
        onNodeWithText("Last Name").performTextInput("Kowalski")
        onNodeWithText("Custom Email").performTextInput("invalid email")

        onNodeWithText("Service date").performClick()
        onNodeWithText("10", substring = true).performClick()
        onNodeWithText("OK").performClick()
        onNodeWithText("Submit").performClick()

        waitForNode("Email: Enter a valid email address")
        onNodeWithText("Custom Email").performTextReplacement("jan.kowalski@pega.com")
        onNodeWithText("Submit").performClick()

        waitForNode("Street")
        onNodeWithText("Street").performTextInput("ul. Krakowska 1")
        onNodeWithText("City").performTextInput("Kraków")
        onNodeWithText("Postal code").performTextInput("31-066")
        onNodeWithText("Submit").performClick()

        waitForNode("TV Package")
        onNodeWithText("TV Package").onSiblings().onFirst().performClick()
        onNodeWithText("Submit").performClick()

        waitForNode("Notes")
        onNodeWithText("Notes").performTextInput("Lorem ipsum")
        onNodeWithText("Submit").performClick()

        waitForNode(CREATE_CASE_TEXT)
    }

    private fun setupApp(caseClassName: String) = with(composeTestRule) {
        setContent {
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
        pegaUrl = "https://lab-05423-bos.lab.pega.com/prweb",
        pegaVersion = "8.24.1",
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

    @OptIn(ExperimentalTestApi::class)
    private fun ComposeContentTestRule.waitForNode(text: String) {
        waitUntilExactlyOneExists(
            hasText(text, substring = true),
            timeoutMillis = 30000
        )
    }

    private fun hideKeyboard() {
        UiDevice.getInstance(InstrumentationRegistry.getInstrumentation())
            .executeShellCommand("settings put secure show_ime_with_hard_keyboard 0")
    }

    companion object {
        private const val CREATE_CASE_TEXT = "New Service"

        val TestComponentDefinitions = listOf(
            ComponentDefinition(Email) { CustomEmailComponent(it) }
        )
    }
}
