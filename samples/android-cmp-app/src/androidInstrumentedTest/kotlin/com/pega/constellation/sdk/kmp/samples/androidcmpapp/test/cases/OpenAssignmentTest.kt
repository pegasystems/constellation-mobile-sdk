package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.SemanticsProperties
import androidx.compose.ui.test.ComposeUiTest
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.SemanticsMatcher.Companion.expectValue
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.runComposeUiTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNodes
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class OpenAssignmentTest : ComposeTest(PegaVersion.v24_1_0) {

    @Test
    fun test_open_assignment() = runComposeUiTest {
        setupApp(caseClassName = "DIXL-MediaCo-Work-SDKTesting")
        onNodeWithText("Services").performClick()

        // verify loaded assignments
        waitForNode("Simple Table 1 in \"KeysAndCiphers\"")
        waitForNode("K-11019")
        waitForNode("Simple Table 2 in \"KeysAndCiphers\"")
        waitForNode("K-11018")
        waitForNodes("10", count = 2)

        // open assignment
        onNodeWithText("K-11019").performClick()

        // verify assignment content
        waitForNode("Simple Table (K-11019)")
        onNodeWithRole(Role.RadioButton, "AES").assertExists()
        waitForNodes("AeroCrypt", count = 2)
        waitForNodes("16384", count = 2)

        // go back to assignments list
        onNodeWithText("Cancel").performClick()

        // open second assignment
        waitForNode("K-11018")
        onNodeWithText("K-11018").performClick()

        // verify content of second assignment
        waitForNode("Simple Table (K-11018)")
        onNodeWithRole(Role.RadioButton, "AES").assertExists()
        waitForNodes("AeroCrypt-AuroraCrypt", count = 2)
        waitForNodes("16384", count = 2)
    }

    private fun ComposeUiTest.onNodeWithRole(role: Role, text: String) =
        onNode(expectValue(SemanticsProperties.Role, role) and hasText(text))
}
