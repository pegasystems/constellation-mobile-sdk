package com.pega.constellation.sdk.kmp.test

import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.api.Component
import com.pega.constellation.sdk.kmp.core.components.children
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentCardComponent
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentComponent
import com.pega.constellation.sdk.kmp.core.components.containers.DataReferenceComponent
import com.pega.constellation.sdk.kmp.core.components.containers.DefaultFormComponent
import com.pega.constellation.sdk.kmp.core.components.containers.FlowContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ModalViewContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.OneColumnComponent
import com.pega.constellation.sdk.kmp.core.components.containers.RegionComponent
import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ViewComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ViewContainerComponent
import com.pega.constellation.sdk.kmp.core.components.fields.CheckboxComponent
import com.pega.constellation.sdk.kmp.core.components.fields.RadioButtonsComponent
import com.pega.constellation.sdk.kmp.core.components.fields.RichTextComponent
import com.pega.constellation.sdk.kmp.core.components.fields.TextInputComponent
import com.pega.constellation.sdk.kmp.core.components.structure
import com.pega.constellation.sdk.kmp.core.components.widgets.ActionButtonsComponent
import com.pega.constellation.sdk.kmp.core.components.widgets.AlertBannerComponent
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withTimeoutOrNull
import kotlin.jvm.JvmStatic
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertSame
import kotlin.test.assertTrue
import kotlin.time.Duration.Companion.seconds

abstract class ConstellationSdkBaseTest {
    protected var engine: ConstellationSdkEngine? = null
    protected val config = buildSdkConfig()
    protected lateinit var sdk: ConstellationSdk

    abstract fun setupSdk(pegaVersion: PegaVersion)

    @Test
    fun test_initialization() = runTest(PegaVersion.v24_1_0) {
        assertEquals(State.Initial, sdk.state.value)
        sdk.createCase(CASE_CLASS)
        sdk.assertState<State.Loading>()
        val environmentInfo = sdk.assertState<State.Ready>().environmentInfo
        assertEquals("en-US", environmentInfo.locale)
        assertEquals("America/New_York", environmentInfo.timeZone)
    }

    @Test
    fun test_initialization_with_invalid_url() = runTest(PegaVersion.v24_1_0) {
        val invalidConfig = config.copy(pegaUrl = "https://invalid.url")
        val invalidSdk = ConstellationSdk.create(invalidConfig, requireNotNull(engine))
        assertEquals(State.Initial, invalidSdk.state.value)
        invalidSdk.createCase(CASE_CLASS)
        invalidSdk.assertState<State.Loading>()
        invalidSdk.assertError { it == "Engine failed to load init scripts" }
    }

    @Test
    fun test_initialization_invalid_case_id() = runTest(PegaVersion.v24_1_0) {
        sdk.createCase("DIXL-MediaCo-Work-Invalid-Case-Id")
        sdk.assertError { it.contains("Constellation SDK initialization failed!") }
    }

    @Test
    fun test_component_structure() = runTest(PegaVersion.v24_1_0) {
        sdk.createCase(CASE_CLASS)
        val root = sdk.assertState<State.Ready>().root
        assertEquals(EXPECTED_COMPONENT_STRUCTURE, root.structure())
        val defaultForm = root.getDefaultForm()
        val region3 = defaultForm.children[0] as RegionComponent
        val textInput = region3.children[0] as TextInputComponent
        assertEquals("caseInfo.content.Name", textInput.pConnectPropertyReference)
    }

    @Test
    fun test_rich_text() = runTest(PegaVersion.v24_1_0) {
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
    fun test_get_parent() = runTest(PegaVersion.v24_1_0) {
        sdk.createCase(CASE_CLASS)
        val root = sdk.assertState<State.Ready>().root
        assertEquals(
            root,
            root.children.filterIsInstance<ModalViewContainerComponent>()[0].getParent()
        )
    }

    @Test
    fun test_engine_destroy() = runTest(PegaVersion.v24_1_0) {
        assertEquals(State.Initial, sdk.state.value)
        sdk.createCase(CASE_CLASS)
        sdk.assertState<State.Loading>()
        sdk.assertState<State.Ready>()
        requireNotNull(engine).destroy()
        runCatching {
            sdk.createCase(CASE_CLASS)
        }.onFailure {
            assertEquals("WebView is null, probably has been destroyed.", it.message)
        }.also {
            assertTrue(it.isFailure)
        }

    }

    @Test
    fun test_visible_view_renders_after_hidden_step() = runTest(PegaVersion.v24_1_0) {
        sdk.createCase("OI1OYV-Marco2-Work-InvisibleDataReferenceTest")
        val root = sdk.assertState<State.Ready>().root
        val flowContainer = root.descendants().filterIsInstance<FlowContainerComponent>().single()
        waitForStep(flowContainer, "DataReference ListOfRecords - Invisible (D-1014611)")
        val assignmentCard =
            flowContainer.descendants().filterIsInstance<AssignmentCardComponent>().single()
        assertTrue(assignmentCard.children.none { it is ViewComponent })

        root.clickPrimaryButton("Next")

        waitForStep(flowContainer, "DataReference ListOfRecords - Visible (D-1014611)")
        val assignmentView = assignmentCard.children.filterIsInstance<ViewComponent>().single()
        assertSame(assignmentCard, assignmentCard)
        assertTrue(assignmentCard.children.any { it is ActionButtonsComponent })
        assertTrue(assignmentView.children.single() is DefaultFormComponent)
    }

    @Test
    fun test_hidden_required_multiselect_does_not_block_submission() = runTest(PegaVersion.v25_1) {
        sdk.createCase(DATA_REFERENCE_CARDS_CASE_CLASS)
        val root = sdk.assertState<State.Ready>().root
        val visibilityControl = root.descendants()
            .filterIsInstance<RadioButtonsComponent>()
            .single()

        visibilityControl.updateValue("required")
        waitUntil("DataReference to become required") {
            root.descendants()
                .filterIsInstance<RadioButtonsComponent>()
                .singleOrNull()
                ?.value == "required"
        }
        root.descendants()
            .filterIsInstance<RadioButtonsComponent>()
            .single()
            .updateValue("invisible")
        waitUntil("DataReference children to be removed") {
            root.descendants()
                .filterIsInstance<DataReferenceComponent>()
                .singleOrNull()
                ?.children
                ?.isEmpty() == true
        }

        root.clickPrimaryButton("Next")

        val flowContainer = root.descendants().filterIsInstance<FlowContainerComponent>().single()
        waitForStep(flowContainer, "Verify Card Content and Visible Required Disabled (D-32087)")
    }

    @Test
    fun test_hidden_required_text_input_inside_view_does_not_block_submission() =
        runTest(PegaVersion.v25_1) {
            sdk.createCase(INVISIBLE_REQUIRED_CASE_CLASS)
            val root = sdk.assertState<State.Ready>().root
            val checkbox = root.descendants().filterIsInstance<CheckboxComponent>().single()

            checkbox.updateValue("true")
            waitUntil("required text input to appear") {
                root.descendants()
                    .filterIsInstance<TextInputComponent>()
                    .singleOrNull()
                    ?.label == "step1 input"
            }

            root.clickPrimaryButton("Next")
            waitUntil("required validation banner to appear") {
                root.descendants()
                    .filterIsInstance<AlertBannerComponent>()
                    .any { banner -> banner.messages.any { it.contains("Cannot be blank") } }
            }

            checkbox.updateValue("false")
            waitUntil("required text input children to be removed") {
                root.descendants().none { it is TextInputComponent }
            }
            root.clickPrimaryButton("Next")

            waitUntil("assignment to advance to step 2") {
                root.descendants()
                    .filterIsInstance<TextInputComponent>()
                    .singleOrNull()
                    ?.label == "step2 input"
            }
            val flowContainer = root.descendants().filterIsInstance<FlowContainerComponent>().single()
            waitForStep(flowContainer, "step2 (S-19004)")
            waitUntil("required validation banner to disappear") {
                root.descendants()
                    .filterIsInstance<AlertBannerComponent>()
                    .none { banner -> banner.messages.any { it.contains("Cannot be blank") } }
            }
        }

    private suspend fun waitForStep(flowContainer: FlowContainerComponent, title: String) {
        waitUntil("Step with title '$title' is not visible") {
            flowContainer.title == title
        }
    }

    private suspend fun waitUntil(errorMessage: String, predicate: () -> Boolean) =
        withTimeoutOrNull(5.seconds) {
            while (!predicate()) {
                delay(10)
            }
        } ?: throw IllegalStateException(errorMessage)


    private fun Component.descendants(): List<Component> =
        children().flatMap { listOf(it) + it.descendants() }



    protected fun runTest(pegaVersion: PegaVersion, block: suspend () -> Unit) =
        runBlocking(Dispatchers.Main) {
            setupSdk(pegaVersion)
            for (attempt in 1..2) {
                runCatching {
                    block()
                }.also {
                    if (it.isSuccess) break
                    if (attempt == 2) it.getOrThrow()
                }
            }
        }

    companion object {
        private const val PEGA_URL = "https://insert-url-here.example/prweb"
        protected const val CASE_CLASS = "DIXL-MediaCo-Work-SDKTesting"
        private const val DATA_REFERENCE_CARDS_CASE_CLASS =
            "OI1OYV-Marco2-Work-DataReferenceListOfRecordsCards"
        private const val INVISIBLE_REQUIRED_CASE_CLASS =
            "OI1OYV-Marco2-Work-Invisible-Required"

        @JvmStatic
        protected val EXPECTED_COMPONENT_STRUCTURE = """
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
                -----------ActionButtons#29(parent=#12)
                
                """.trimIndent()

        private fun buildSdkConfig() = ConstellationSdkConfig(
            pegaUrl = PEGA_URL,
            debuggable = true
        )

        private suspend fun ConstellationSdk.assertError(condition: (String) -> Boolean) {
            val errorMessage = assertState<State.Error>().error.message
            assertTrue(condition(errorMessage))
        }

        @JvmStatic
        protected suspend inline fun <reified S : State> ConstellationSdk.assertState() =
            withTimeoutOrNull(5.seconds) { state.first { it is S } as S }
                ?: error("Timed out waiting for ${S::class.simpleName} state, actual: ${state.value}")

        private suspend fun waitUntil(description: String, condition: () -> Boolean) {
            withTimeoutOrNull(5.seconds) {
                while (!condition()) delay(10)
            } ?: error("Timed out waiting for $description")
        }

        private fun Component.descendants(): Sequence<Component> = sequence {
            yield(this@descendants)
            children().forEach { yieldAll(it.descendants()) }
        }

        private fun Component.clickPrimaryButton(name: String) {
            val actionButtons = descendants().filterIsInstance<ActionButtonsComponent>().single()
            actionButtons.onClick(actionButtons.primaryButtons.single { it.name.trim() == name })
        }

        private fun RootContainerComponent.getDefaultForm(): DefaultFormComponent {
            val viewContainer = children()[1] as ViewContainerComponent
            val view = viewContainer.children[0] as ViewComponent
            val oneColumn = view.children[0] as OneColumnComponent
            val region = oneColumn.children[0] as RegionComponent
            val view2 = region.children[0] as ViewComponent
            val region2 = view2.children[0] as RegionComponent
            val view3 = region2.children[0] as ViewComponent
            val flowContainer = view3.children[0] as FlowContainerComponent
            val assignment = flowContainer.children.filterIsInstance<AssignmentComponent>()[0]
            val assignmentCard = assignment.children[0] as AssignmentCardComponent
            val view4 = assignmentCard.children[0] as ViewComponent
            return view4.children[0] as DefaultFormComponent
        }
    }
}