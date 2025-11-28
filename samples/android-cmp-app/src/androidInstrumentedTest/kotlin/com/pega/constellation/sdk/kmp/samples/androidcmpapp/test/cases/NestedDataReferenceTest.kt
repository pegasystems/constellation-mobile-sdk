package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.cases

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.runComposeUiTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNodes
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class NestedDataReferenceTest : ComposeTest(PegaVersion.v24_2_2) {

    @Test
    fun test_nested_json() = runComposeUiTest {
        setupApp("O40M3A-MarekCo-Work-NestedJSON")

        // create case
        onNodeWithText("New Service").performClick()

        // verify form title
        waitForNode("Create (N-", substring = true)

        // verify column names
        listOf("CASE ID", "DATA1", "DATA2").forEach { waitForNodes(it, count = 2) }

        // verify data
        listOf(
            listOf("S-32005", "Nested1-1", "Nested1-2"),
            listOf("S-32004", "Nested2-1", "Nested2-2"),
            listOf("S-32003", "Nested3-1", "Nested3-2"),
            listOf("S-32002", "Nested4-1", "Nested4-2"),
            listOf("S-32001", "Nested5-1", "Nested5-2")
        ).flatten().forEach { waitForNodes(it, count = 2) }
    }
}