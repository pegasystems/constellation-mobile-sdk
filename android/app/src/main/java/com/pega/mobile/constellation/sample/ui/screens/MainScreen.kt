/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sample.ui.screens

import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.ConstellationSdk

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
        Content(innerPadding)
        if (showForm) {
            FormBottomSheet(sdk, caseClassName, sheetState) { showForm = false }
        }
    }
}
