package com.pega.mobile.constellation.sample.ui.screens

import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.tooling.preview.Preview
import com.pega.mobile.constellation.sample.ui.theme.SampleSdkTheme
import com.pega.mobile.constellation.sdk.ConstellationSdk
import kotlinx.coroutines.flow.StateFlow

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(sdk: ConstellationSdk, caseClassName: String) {
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)
    var showForm by remember { mutableStateOf(false) }

    Scaffold(
        topBar = { SampleTopAppBar() },
        bottomBar = { SampleBottomAppBar() },
        floatingActionButton = {
            OpenFormFab { showForm = true }
        }
    ) { innerPadding ->
        SampleContent(innerPadding)
        if (showForm) {
            FormBottomSheet(sdk, caseClassName, sheetState) { showForm = false }
        }
    }
}

@Preview
@Composable
fun MainScreenPreview() {
    val sdk = object : ConstellationSdk {
        override val state: StateFlow<ConstellationSdk.State>
            get() = TODO("Not yet implemented")

        override fun createCase(caseClassName: String, startingFields: Map<String, Any>) {
            TODO("Not yet implemented")
        }

    }
    SampleSdkTheme {
        MainScreen(sdk, "")
    }
}