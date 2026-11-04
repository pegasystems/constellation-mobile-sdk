package com.pega.constellation.sdk.kmp.test

import androidx.test.ext.junit.runners.AndroidJUnit4
import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentCardComponent
import com.pega.constellation.sdk.kmp.core.components.containers.DefaultFormComponent
import com.pega.constellation.sdk.kmp.core.components.containers.FlowContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ModalViewContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.RegionComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ViewComponent
import com.pega.constellation.sdk.kmp.core.components.fields.RichTextComponent
import com.pega.constellation.sdk.kmp.core.components.fields.TextInputComponent
import com.pega.constellation.sdk.kmp.core.components.structure
import com.pega.constellation.sdk.kmp.core.components.widgets.ActionButtonsComponent
import com.pega.constellation.sdk.kmp.engine.webview.android.AndroidWebViewEngine
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlinx.coroutines.delay
import kotlinx.serialization.json.Json
import org.junit.Rule
import org.junit.runner.RunWith
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertSame
import kotlin.test.assertTrue

@RunWith(AndroidJUnit4::class)
class ConstellationSdk24Test {
    @get:Rule
    val sdkTest = ConstellationSdkTestRule(PegaVersion.v24_1_0)

    @Test
    fun test_engine_pause_resume() = sdkTest.runTest {
        (engine as AndroidWebViewEngine).pause()
        sdk.createCase(CASE_CLASS)
        sdk.assertState<State.Loading>()
        (engine as AndroidWebViewEngine).resume()
        val root = sdk.assertState<State.Ready>().root
        assertEquals(EXPECTED_COMPONENT_STRUCTURE, root.structure())
    }

    @Test
    fun test_initialization() = sdkTest.runTest {
        assertEquals(State.Initial, sdk.state.value)
        sdk.createCase(CASE_CLASS)
        sdk.assertState<State.Loading>()
        val environmentInfo = sdk.assertState<State.Ready>().environmentInfo
        assertEquals("en-US", environmentInfo.locale)
        assertEquals("America/New_York", environmentInfo.timeZone)
    }

    @Test
    fun test_initialization_with_invalid_url() = sdkTest.runTest {
        val invalidConfig = config.copy(pegaUrl = "https://invalid.url")
        val invalidSdk = ConstellationSdk.create(invalidConfig, requireNotNull(engine))
        assertEquals(State.Initial, invalidSdk.state.value)
        invalidSdk.createCase(CASE_CLASS)
        invalidSdk.assertState<State.Loading>()
        invalidSdk.assertError { it == "Engine failed to load init scripts" }
    }

    @Test
    fun test_initialization_invalid_case_id() = sdkTest.runTest {
        sdk.createCase("DIXL-MediaCo-Work-Invalid-Case-Id")
        sdk.assertError { it.contains("Constellation SDK initialization failed!") }
    }

    @Test
    fun test_component_structure() = sdkTest.runTest {
        sdk.createCase(CASE_CLASS)
        val root = sdk.assertState<State.Ready>().root
        assertEquals(EXPECTED_COMPONENT_STRUCTURE, root.structure())
        val defaultForm = root.getDefaultForm()
        val region3 = defaultForm.children[0] as RegionComponent
        val textInput = region3.children[0] as TextInputComponent
        assertEquals("caseInfo.content.Name", textInput.pConnectPropertyReference)
    }

    @Test
    fun test_rich_text() = sdkTest.runTest {
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
    fun test_component_event_with_all_special_characters() = sdkTest.runTest {
        sdk.createCase(CASE_CLASS)
        val root = sdk.assertState<State.Ready>().root
        val textInput = root.descendants()
            .filterIsInstance<TextInputComponent>()
            .first { it.pConnectPropertyReference == "caseInfo.content.Name" }
        val value = buildString {
            append("ASCII punctuation: ")
            append(('!'..'/').joinToString(""))
            append((':'..'@').joinToString(""))
            append(('['..'`').joinToString(""))
            append(('{'..'~').joinToString(""))
            append("\nControl characters: ")
            for (codePoint in 0x00..0x1F) append(codePoint.toChar())
            append(" Unicode: café, 漢字, 😀, \u2028, \u2029")
        }
        textInput.updateFocus(true)
        textInput.updateValue(value)
        textInput.updateFocus(false)
        delay(100)
        assertEquals(value, textInput.value)
        root.clickPrimaryButton("Next")
        waitUntil("special-character assignment request to be received") {
            findMockRequest("/actions/Create")
                ?.let { it.method == "PATCH" && it.body != null } == true
        }
        val requestBody = requireNotNull(findMockRequest("/actions/Create")?.body)
        assertTrue(Json.parseToJsonElement(requestBody).containsString(value))
    }

    @Test
    fun test_get_parent() = sdkTest.runTest {
        sdk.createCase(CASE_CLASS)
        val root = sdk.assertState<State.Ready>().root
        assertEquals(
            root,
            root.children.filterIsInstance<ModalViewContainerComponent>()[0].getParent()
        )
    }

    @Test
    fun test_engine_destroy() = sdkTest.runTest {
        assertEquals(State.Initial, sdk.state.value)
        sdk.createCase(CASE_CLASS)
        sdk.assertState<State.Loading>()
        sdk.assertState<State.Ready>()
        requireNotNull(engine).destroy()
        requireNotNull(engine).destroy()
        runCatching {
            sdk.createCase(CASE_CLASS)
        }.onFailure {
            assertEquals("The WebView engine has been destroyed.", it.message)
        }.also {
            assertTrue(it.isFailure)
        }

    }

    @Test
    fun test_visible_view_renders_after_hidden_step() = sdkTest.runTest {
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
        assertTrue(assignmentCard.children.any { it is ActionButtonsComponent })
        assertTrue(assignmentView.children.single() is DefaultFormComponent)
    }

    companion object {
        private const val CASE_CLASS = "DIXL-MediaCo-Work-SDKTesting"

        private val EXPECTED_COMPONENT_STRUCTURE = """
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

    }
}