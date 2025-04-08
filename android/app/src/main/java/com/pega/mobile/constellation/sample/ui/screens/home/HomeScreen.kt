/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sample.ui.screens.home

import android.content.Context
import android.widget.Toast
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.lifecycle.viewmodel.compose.viewModel
import com.pega.mobile.constellation.sample.ui.screens.app.MediaCoBottomAppBar
import com.pega.mobile.constellation.sample.ui.screens.app.MediaCoTopAppBar
import com.pega.mobile.constellation.sample.ui.screens.pega.PegaBottomSheet
import com.pega.mobile.constellation.sample.ui.theme.MediaCoTheme

@Composable
fun HomeScreen(viewModel: HomeViewModel = viewModel(factory = HomeViewModel.Factory)) {
    var showForm by remember { mutableStateOf(false) }
    val news by viewModel.news.collectAsState()
    val context = LocalContext.current

    Scaffold(
        topBar = { MediaCoTopAppBar() },
        bottomBar = { MediaCoBottomAppBar() },
        floatingActionButton = { HomeFab { showForm = true } }
    ) { innerPadding ->
        HomeContent(innerPadding, news)
        if (showForm) {
            PegaBottomSheet {
                showForm = false
                context.toast(it)
            }
        }
    }
}

private fun Context.toast(message: String, duration: Int = Toast.LENGTH_SHORT) =
    Toast.makeText(this, message, duration).show()

@Preview
@Composable
fun MainScreenPreview() {
    MediaCoTheme {
        HomeScreen()
    }
}

