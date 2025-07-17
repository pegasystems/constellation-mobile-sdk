package com.pega.mobile.constellation.sdk

import android.content.Context
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import com.pega.mobile.constellation.mock.MockHttpClient
import com.pega.mobile.constellation.sdk.ConstellationSdk.State
import com.pega.mobile.constellation.sdk.components.containers.ContainerComponent
import com.pega.mobile.constellation.sdk.components.containers.FlowContainerComponent
import com.pega.mobile.constellation.sdk.components.containers.RootContainerComponent
import com.pega.mobile.constellation.sdk.components.core.Component
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
        sdk.assertError { it.contains("Unsupported Pega version: 1.2.3. Supported version is between 23.1.0 and") }
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
                ---OneColumn#4
                ----Region#5
                -----View#6
                ------Region#7
                -------View#8
                --------FlowContainer#9
                ---------Assignment#10
                ----------AssignmentCard#11
                -----------View#12
                ------------DefaultForm#13
                -------------Region#14
                --------------TextInput#15
                --------------TextInput#16
                --------------TextInput#17
                --------------Date#18
                --------------URL#19
                --------------TextArea#20
                --------------View#21
                ---------------DefaultForm#23
                ----------------Region#24
                -----------------Checkbox#25
                -----------------TextArea#26
                --------------Email#22
                
                """.trimIndent(),
            root.structure()
        )
    }

    companion object {
        private const val PEGA_URL = "https://insert-url-here.example/prweb"
        private const val PEGA_VERSION = "24.1.0"
        private const val CASE_CLASS = "DIXL-MediaCo-Work-SDKTesting"

        private fun buildSdkConfig(context: Context) = ConstellationSdkConfig(
            pegaUrl = PEGA_URL,
            pegaVersion = PEGA_VERSION,
            debuggable = true,
            okHttpClient = MockHttpClient(context, PEGA_URL)
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
            val children = children().joinToString("") { it.structure("$indent-") }
            return self + children
        }

        private fun Component.children() = when (this) {
            is ContainerComponent -> children
            is RootContainerComponent -> listOfNotNull(viewContainer)
            is FlowContainerComponent -> listOfNotNull(assignment) + alertBanners
            else -> emptyList()
        }
    }
}

