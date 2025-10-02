package com.pega.constellation.sdk.kmp.test

import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.api.Component
import com.pega.constellation.sdk.kmp.core.components.containers.ContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.FlowContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerComponent
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withTimeoutOrNull
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import kotlin.time.Duration.Companion.seconds

abstract class ConstellationSdkBaseTest {
    protected lateinit var engine: ConstellationSdkEngine

    @Test
    fun test_initialization() = runTest {
        val sdk = ConstellationSdk.create(buildSdkConfig(), engine)
        assertEquals(State.Initial, sdk.state.value)
        sdk.createCase(CASE_CLASS)
        sdk.assertState<State.Loading>()
        sdk.assertState<State.Ready>()
    }

    companion object {
        private const val PEGA_URL = "https://insert-url-here.example/prweb"
        private const val PEGA_VERSION = "24.1.0"
        private const val CASE_CLASS = "DIXL-MediaCo-Work-SDKTesting"

        private fun buildSdkConfig() = ConstellationSdkConfig(
            pegaUrl = PEGA_URL,
            pegaVersion = PEGA_VERSION,
            debuggable = true
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