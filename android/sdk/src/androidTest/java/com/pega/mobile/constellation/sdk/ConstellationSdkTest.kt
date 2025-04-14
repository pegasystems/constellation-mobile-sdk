package com.pega.mobile.constellation.sdk

import android.content.Context
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import com.pega.mobile.constellation.mock.MockHttpClient
import com.pega.mobile.constellation.sdk.ConstellationSdk.State
import com.pega.mobile.constellation.sdk.components.containers.ContainerState
import com.pega.mobile.constellation.sdk.components.containers.FlowContainerState
import com.pega.mobile.constellation.sdk.components.containers.RootContainerState
import com.pega.mobile.constellation.sdk.components.core.Component
import com.pega.mobile.constellation.sdk.components.core.ComponentState
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withTimeoutOrNull
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test
import org.junit.runner.RunWith
import kotlin.time.Duration.Companion.seconds

@RunWith(AndroidJUnit4::class)
class ConstellationSdkTest {
    private val context = InstrumentationRegistry.getInstrumentation().targetContext
    private val config = buildSdkConfig(context)

    @Test
    fun test_initialization() = runTest {
        val sdk = ConstellationSdk.create(context, config)
        assertEquals(State.Initial, sdk.state.value)

        sdk.createCase(CASE_CLASS)
        sdk.assertState<State.Loading>()
        sdk.assertState<State.Ready>()
    }

    @Test
    fun test_initialization_with_invalid_url() = runTest {
        val invalidConfig = config.copy(pegaUrl = "https://invalid.url")
        val sdk = ConstellationSdk.create(context, invalidConfig)
        assertEquals(State.Initial, sdk.state.value)
        sdk.createCase(CASE_CLASS)
        sdk.assertState<State.Loading>()
        sdk.assertError { it == "Engine failed to load init scripts" }
    }

    @Test
    fun test_initialization_with_invalid_version() = runTest {
        val invalidConfig = config.copy(pegaVersion = "1.2.3")
        val sdk = ConstellationSdk.create(context, invalidConfig)
        assertEquals(State.Initial, sdk.state.value)
        sdk.createCase(CASE_CLASS)
        sdk.assertState<State.Loading>()
        sdk.assertError { it.contains("Constellation SDK initialization failed! Failed to fetch") }
    }

    @Test
    fun test_initialization_invalid_case_id() = runTest {
        val sdk = ConstellationSdk.create(context, config)
        sdk.createCase("DIXL-MediaCo-Work-Invalid-Case-Id")
        sdk.assertError { it.contains("Constellation SDK initialization failed!") }
    }

    @Test
    fun test_component_structure() = runTest {
        val sdk = ConstellationSdk.create(context, config)
        sdk.createCase(CASE_CLASS)
        val root = sdk.assertState<State.Ready>().root
        assertEquals(
            """
                RootContainer#1
                -ViewContainer#2
                --View#3
                ---Region#4
                ----View#5
                -----Region#6
                ------View#7
                -------FlowContainer#8
                --------Assignment#9
                ---------AssignmentCard#10
                ----------View#11
                -----------DefaultForm#12
                ------------Region#13
                -------------TextInput#14
                -------------TextInput#15
                -------------TextInput#16
                -------------Date#17
                -------------URL#18
                -------------TextArea#19
                -------------View#20
                --------------DefaultForm#22
                ---------------Region#23
                ----------------Checkbox#24
                ----------------TextArea#25
                -------------Email#21
                
                """.trimIndent(),
            root.structure()
        )
    }

    companion object {
        private const val PEGA_URL = "https://lab-05423-bos.lab.pega.com/prweb"
        private const val PEGA_VERSION = "8.24.1"
        private const val CASE_CLASS = "DIXL-MediaCo-Work-SDKTesting"

        private fun buildSdkConfig(context: Context) = ConstellationSdkConfig(
            pegaUrl = PEGA_URL,
            pegaVersion = PEGA_VERSION,
            debuggable = true,
            okHttpClient = MockHttpClient(context)
        )

        private fun runTest(block: suspend () -> Unit) = runBlocking(Dispatchers.Main) { block() }

        private suspend fun ConstellationSdk.assertError(condition: (String) -> Boolean) {
            val error = assertState<State.Error>().error
            assertTrue(condition(error.orEmpty()))
        }

        private suspend inline fun <reified S : State> ConstellationSdk.assertState() =
            withTimeoutOrNull(3.seconds) { state.first { it is S } as S }
                ?: error("Timed out waiting for ${S::class.simpleName} state, actual: ${state.value}")

        private fun Component.structure(indent: String = ""): String {
            val self = indent + this + "\n"
            val children = state.children().joinToString("") { it.structure("$indent-") }
            return self + children
        }

        private fun ComponentState.children() = when (this) {
            is ContainerState -> children
            is RootContainerState -> listOfNotNull(viewContainer)
            is FlowContainerState -> listOfNotNull(assignment) + alertBanners
            else -> emptyList()
        }
    }
}

