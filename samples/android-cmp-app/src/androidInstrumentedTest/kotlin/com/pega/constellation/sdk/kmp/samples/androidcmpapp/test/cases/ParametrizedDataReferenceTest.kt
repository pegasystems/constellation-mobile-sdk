package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.onAllNodesWithText
import androidx.compose.ui.test.onFirst
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.runComposeUiTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTestMode
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNodes
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class ParametrizedDataReferenceTest : ComposeTest(mode = ComposeTestMode.MockServer) {
    private val columns = listOf("KeyName", "KeyLength", "Algorithm")

    private val unfilteredKeys = listOf(
        listOf("AeroCrypt" /*, "4096", "ChaCha20" */),
        listOf("AeroCrypt-AuroraCrypt" /*, "32", "Blowfish" */),
        listOf("AeroCrypt-JadeCrypt" /*, "128", "Twofish" */)
    )

    private val rsaKeys = listOf(
        listOf("AeroCrypt-MagnetSafe" /*, 256, "RSA"*/),
        listOf("AeroCrypt-MeteorVault" /*, 65536, "RSA"*/),
        listOf("AeroCrypt-VortexLock" /*, 256, "RSA"*/)
    )

    private val eccKeys = listOf(
        listOf("AeroCrypt-VertexCrypt" /*, 256, "ECC"*/),
        listOf("AuroraCrypt-ZenSafe" /*, 8192, "ECC"*/),
        listOf("BlueWave-HyperShield" /*, 1024, "ECC"*/)
    )

    @Test
    fun test_embedded_data() = runComposeUiTest {
        setupApp("O40M3A-MarekCo-Work-KeysAndCiphers", "24.2.2")

        // create case
        onNodeWithText("New Service").performClick()

        // verify form title
        waitForNode("Simple Table (K-", substring = true)

        // verify columns
        columns.forEach { waitForNodes(it.uppercase(), 2) }

        // verify unfiltered keys
        unfilteredKeys.flatten().forEach { waitForNodes(it, count = 2) }

        // verify keys filtered by RSA
        onAllNodesWithText("RSA").onFirst().performClick()
        rsaKeys.flatten().forEach { waitForNodes(it, count = 2) }

        // verify keys filtered by ECC
        onAllNodesWithText("ECC").onFirst().performClick()
        eccKeys.flatten().forEach { waitForNodes(it, count = 2) }

        // Next step
        onNodeWithText("Submit").performClick()
        waitForNode("Table (K-", substring = true)

        // verify unfiltered keys
        unfilteredKeys.flatten().forEach { waitForNodes(it, count = 2) }

        // verify keys filtered by RSA
        onAllNodesWithText("RSA").onFirst().performClick()
        rsaKeys.flatten().forEach { waitForNodes(it, count = 2) }

        // verify keys filtered by ECC
        onAllNodesWithText("ECC").onFirst().performClick()
        eccKeys.flatten().forEach { waitForNodes(it, count = 2) }

        // Next step
        onNodeWithText("Submit").performClick()
        waitForNode("Dropdown (K-", substring = true)
        // TODO: verify dropdown+details
    }
}
