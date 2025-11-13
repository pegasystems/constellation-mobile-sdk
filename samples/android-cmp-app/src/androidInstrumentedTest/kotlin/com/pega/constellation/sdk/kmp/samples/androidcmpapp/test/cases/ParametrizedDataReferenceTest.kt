package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ComposeUiTest
import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.hasClickAction
import androidx.compose.ui.test.hasText
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.onFirst
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.runComposeUiTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.PegaVersion
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNodes
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class ParametrizedDataReferenceTest : ComposeTest(PegaVersion.v24_2_2) {
    private val columns = listOf("KeyName", "KeyLength", "Algorithm")

    private val unfilteredKeys = listOf(
        "AeroCrypt",
        "AeroCrypt-AuroraCrypt",
        "AeroCrypt-JadeCrypt"
    )

    private val rsaKeys = listOf(
        "AeroCrypt-MagnetSafe",
        "AeroCrypt-MeteorVault",
        "AeroCrypt-VortexLock"
    )

    private val eccKeys = listOf(
        "AeroCrypt-VertexCrypt",
        "AuroraCrypt-ZenSafe",
        "BlueWave-HyperShield"
    )

    @Test
    fun test_datareference_with_parametrized_dp() = runComposeUiTest {
        setupApp("O40M3A-MarekCo-Work-KeysAndCiphers")

        // create case
        onNodeWithText("New Service").performClick()

        // verify form title
        waitForNode("Simple Table (K-", substring = true)

        // verify columns
        columns.forEach { waitForNodes(it.uppercase(), 2) }

        // verify unfiltered keys
        unfilteredKeys.forEach { waitForNodes(it, count = 2) }

        // verify keys filtered by RSA
        onAllNodesWithText("RSA").onFirst().performClick()
        rsaKeys.forEach { waitForNodes(it, count = 2) }

        // verify keys filtered by ECC
        onAllNodesWithText("ECC").onFirst().performClick()
        eccKeys.forEach { waitForNodes(it, count = 2) }

        // Next step
        onNodeWithText("Submit").performClick()
        waitForNode("Table (K-", substring = true)

        // verify unfiltered keys
        unfilteredKeys.forEach { waitForNodes(it, count = 2) }

        // verify keys filtered by RSA
        onAllNodesWithText("RSA").onFirst().performClick()
        rsaKeys.forEach { waitForNodes(it, count = 2) }

        // verify keys filtered by ECC
        onAllNodesWithText("ECC").onFirst().performClick()
        eccKeys.forEach { waitForNodes(it, count = 2) }

        // Next step
        onNodeWithText("Submit").performClick()
        waitForNode("Dropdown (K-", substring = true)

        // Verify dropdown filtered by RSA
        waitForNode("RSA")
        onAllNodesWithText("RSA").onFirst().performClick()
        selectDropdownOption("Key Selector", "AeroCrypt-MagnetSafe")
        waitForNode("2022-12-09")

        // Verify dropdown filtered by ECC
        onAllNodesWithText("ECC").onFirst().performClick()
        selectDropdownOption("Key Selector", "BlueWave-HyperShield")
        waitForNode("2025-11-25")
    }
}

@OptIn(ExperimentalTestApi::class)
private fun ComposeUiTest.selectDropdownOption(dropdown: String, option: String) {
    onNode(hasText(dropdown) and hasClickAction()).performClick()
    waitForNode(option)
    onNodeWithText(option).performClick()
}