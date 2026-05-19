package com.pega.constellation.sdk.kmp.test

import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.components.children
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentCardComponent
import com.pega.constellation.sdk.kmp.core.components.containers.DefaultFormComponent
import com.pega.constellation.sdk.kmp.core.components.containers.FlowContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.OneColumnComponent
import com.pega.constellation.sdk.kmp.core.components.containers.RegionComponent
import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ViewComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ViewContainerComponent
import com.pega.constellation.sdk.kmp.core.components.fields.RichTextComponent
import com.pega.constellation.sdk.kmp.core.components.fields.TextInputComponent
import com.pega.constellation.sdk.kmp.core.components.structure
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
                -ModalViewContainer#2(parent=#1)
                -ViewContainer#3(parent=#1)
                --View#4(parent=#3)
                ---OneColumn#5(parent=#4)
                ----Region#6(parent=#5)
                -----View#7(parent=#6)
                ------Region#8(parent=#7)
                -------View#9(parent=#8)
                --------FlowContainer#10(parent=#9)
                ---------Assignment#11(parent=#10)
                ----------AssignmentCard#12(parent=#11)
                -----------View#13(parent=#12)
                ------------DefaultForm#14(parent=#13)
                -------------Region#15(parent=#14)
                --------------TextInput#16(parent=#15)
                --------------TextInput#17(parent=#15)
                --------------TextInput#18(parent=#15)
                --------------Date#19(parent=#15)
                --------------URL#20(parent=#15)
                --------------TextArea#21(parent=#15)
                --------------RichText#22(parent=#15)
                --------------View#23(parent=#15)
                ---------------DefaultForm#25(parent=#23)
                ----------------Region#26(parent=#25)
                -----------------Checkbox#27(parent=#26)
                -----------------TextArea#28(parent=#26)
                --------------Email#24(parent=#15)
                
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

    @Test
    fun test_get_parent() = runTest {
        val sdk = ConstellationSdk.create(config, engine)
        sdk.createCase(CASE_CLASS)
        val root = sdk.assertState<State.Ready>().root
        assertEquals(root, root.modalViewContainer?.getParent())
    }

    companion object {
        private const val PEGA_URL = "https://insert-url-here.example/prweb"
        private const val CASE_CLASS = "DIXL-MediaCo-Work-SDKTesting"

        private fun buildSdkConfig() = ConstellationSdkConfig(
            pegaUrl = PEGA_URL,
            debuggable = true
        )

        private fun runTest(block: suspend () -> Unit) =
            runBlocking(Dispatchers.Main) {
                for (attempt in 1..2) {
                    runCatching {
                        block()
                    }.also {
                        if (it.isSuccess) break
                        if (attempt == 2) it.getOrThrow()
                    }
                }
            }

        private suspend fun ConstellationSdk.assertError(condition: (String) -> Boolean) {
            val errorMessage = assertState<State.Error>().error.message
            assertTrue(condition(errorMessage))
        }

        private suspend inline fun <reified S : State> ConstellationSdk.assertState() =
            withTimeoutOrNull(5.seconds) { state.first { it is S } as S }
                ?: error("Timed out waiting for ${S::class.simpleName} state, actual: ${state.value}")

        private fun RootContainerComponent.getDefaultForm(): DefaultFormComponent {
            val viewContainer = children()[1] as ViewContainerComponent
            val view = viewContainer.children[0] as ViewComponent
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