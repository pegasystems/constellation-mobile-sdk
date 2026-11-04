package com.pega.constellation.sdk.kmp.test

import androidx.test.ext.junit.runners.AndroidJUnit4
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State
import com.pega.constellation.sdk.kmp.core.components.containers.DataReferenceComponent
import com.pega.constellation.sdk.kmp.core.components.containers.FlowContainerComponent
import com.pega.constellation.sdk.kmp.core.components.fields.CheckboxComponent
import com.pega.constellation.sdk.kmp.core.components.fields.RadioButtonsComponent
import com.pega.constellation.sdk.kmp.core.components.fields.TextInputComponent
import com.pega.constellation.sdk.kmp.core.components.widgets.AlertBannerComponent
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import org.junit.Rule
import org.junit.runner.RunWith
import kotlin.test.Test

@RunWith(AndroidJUnit4::class)
class ConstellationSdk25Test {
    @get:Rule
    val sdkTest = ConstellationSdkTestRule(PegaVersion.v25_1)

    @Test
    fun test_hidden_required_multiselect_does_not_block_submission() = sdkTest.runTest {
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
        sdkTest.runTest {
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
            val flowContainer =
                root.descendants().filterIsInstance<FlowContainerComponent>().single()
            waitForStep(flowContainer, "step2 (S-19004)")
            waitUntil("required validation banner to disappear") {
                root.descendants()
                    .filterIsInstance<AlertBannerComponent>()
                    .none { banner -> banner.messages.any { it.contains("Cannot be blank") } }
            }
        }

    companion object {
        private const val DATA_REFERENCE_CARDS_CASE_CLASS =
            "OI1OYV-Marco2-Work-DataReferenceListOfRecordsCards"
        private const val INVISIBLE_REQUIRED_CASE_CLASS =
            "OI1OYV-Marco2-Work-Invisible-Required"
    }
}
