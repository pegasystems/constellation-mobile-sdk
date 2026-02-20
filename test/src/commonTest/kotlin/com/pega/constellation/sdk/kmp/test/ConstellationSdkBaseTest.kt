package com.pega.constellation.sdk.kmp.test

import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.api.Component
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentCardComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.DefaultFormComponent
import com.pega.constellation.sdk.kmp.core.components.containers.FlowContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.OneColumnComponent
import com.pega.constellation.sdk.kmp.core.components.containers.RegionComponent
import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ViewComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ViewContainerComponent
import com.pega.constellation.sdk.kmp.core.components.fields.RichTextComponent
import com.pega.constellation.sdk.kmp.core.components.fields.TextInputComponent
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
    private val config = buildSdkConfig()

    @Test
    fun test_initialization() = runTest {
        val sdk = ConstellationSdk.create(config, engine)
        assertEquals(State.Initial, sdk.state.value)
        sdk.createCase(CASE_CLASS)
        sdk.assertState<State.Loading>()
        val environmentInfo = sdk.assertState<State.Ready>().environmentInfo
        assertEquals("en-US", environmentInfo.locale)
        assertEquals("America/New_York", environmentInfo.timeZone)
    }

    @Test
    fun test_initialization_with_invalid_url() = runTest {
        val invalidConfig = config.copy(pegaUrl = "https://invalid.url")
        val sdk = ConstellationSdk.create(invalidConfig, engine)
        assertEquals(State.Initial, sdk.state.value)
        sdk.createCase(CASE_CLASS)
        sdk.assertState<State.Loading>()
        sdk.assertError { it == "Engine failed to load init scripts" }
    }

    @Test
    fun test_initialization_with_invalid_version() = runTest {
        val invalidConfig = config.copy(pegaVersion = "1.2.3")
        val sdk = ConstellationSdk.create(invalidConfig, engine)
        assertEquals(State.Initial, sdk.state.value)
        sdk.createCase(CASE_CLASS)
        sdk.assertState<State.Loading>()
        sdk.assertError { it.contains("Unsupported Pega version: 1.2.3. Supported version is between 23.1.0 and") }
    }

    @Test
    fun test_initialization_invalid_case_id() = runTest {
        val sdk = ConstellationSdk.create(config, engine)
        sdk.createCase("DIXL-MediaCo-Work-Invalid-Case-Id")
        sdk.assertError { it.contains("Constellation SDK initialization failed!") }
    }

    @Test
    fun test_component_structure() = runTest {
        val sdk = ConstellationSdk.create(config, engine)
        sdk.createCase(CASE_CLASS)
        val root = sdk.assertState<State.Ready>().root
        assertEquals(
            """
                RootContainer#1
                -ModalViewContainer#2
                -ViewContainer#3
                --View#4
                ---OneColumn#5
                ----Region#6
                -----View#7
                ------Region#8
                -------View#9
                --------FlowContainer#10
                ---------Assignment#11
                ----------AssignmentCard#12
                -----------View#13
                ------------DefaultForm#14
                -------------Region#15
                --------------TextInput#16
                --------------TextInput#17
                --------------TextInput#18
                --------------Date#19
                --------------URL#20
                --------------TextArea#21
                --------------RichText#22
                --------------View#23
                ---------------DefaultForm#25
                ----------------Region#26
                -----------------Checkbox#27
                -----------------TextArea#28
                --------------Email#24
                
                """.trimIndent(),
            root.structure()
        )
        val defaultForm = root.getDefaultForm()
        val region3 = defaultForm.children[0] as RegionComponent
        val textInput = region3.children[0] as TextInputComponent
        assertEquals("caseInfo.content.Name", textInput.pConnectPropertyReference)
    }

    @Test
    fun test_rich_text() = runTest {
        val sdk = ConstellationSdk.create(config, engine)
        sdk.createCase(CASE_CLASS)

        val defaultForm = sdk.assertState<State.Ready>().root.getDefaultForm()
        val region3 = defaultForm.children[0] as RegionComponent
        val richText = region3.children[6] as RichTextComponent
        assertEquals(
            "<p><strong>Description</strong></p>\n<p><em>This is a description</em></p>\n<ul>\n<li><em>one</em></li>\n<li><em>two</em></li>\n<li><em>three</em></li>\n</ul>",
            richText.value
        )
        assertEquals("caseInfo.content.RichDescription", richText.pConnectPropertyReference)
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
            val errorMessage = assertState<State.Error>().error.message
            assertTrue(condition(errorMessage.orEmpty()))
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
            is RootContainerComponent -> listOfNotNull(modalViewContainer, viewContainer)
            is FlowContainerComponent -> listOfNotNull(assignment) + alertBanners
            else -> emptyList()
        }

        private fun RootContainerComponent.getDefaultForm(): DefaultFormComponent {
            val viewContainer = children()[1] as ViewContainerComponent
            val view = viewContainer?.children[0] as ViewComponent
            val oneColumn = view.children[0] as OneColumnComponent
            val region = oneColumn.children[0] as RegionComponent
            val view2 = region.children[0] as ViewComponent
            val region2 = view2.children[0] as RegionComponent
            val view3 = region2.children[0] as ViewComponent
            val flowContainer = view3.children[0] as FlowContainerComponent
            val assignment = flowContainer.assignment
            val assignmentCard = assignment?.children[0] as AssignmentCardComponent
            val view4 = assignmentCard.children[0] as ViewComponent
            return view4.children[0] as DefaultFormComponent
        }
    }
}