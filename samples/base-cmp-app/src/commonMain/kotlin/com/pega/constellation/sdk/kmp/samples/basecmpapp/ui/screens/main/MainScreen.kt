package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.main

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MediaCoAppViewModel
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.common.MediaCoBottomAppBar
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.common.MediaCoTopAppBar
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.common.SnackbarHost
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.home.HomeFab
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.home.HomeScreen
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.pega.PegaBottomSheet
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.pega.PegaViewModel
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.services.ServicesScreen


@Composable
fun MainScreen(
    appViewModel: MediaCoAppViewModel,
    pegaViewModel: PegaViewModel = viewModel(factory = PegaViewModel.Factory),
) {
    val navController = rememberNavController()
    val currentEntry by navController.currentBackStackEntryAsState()
    val currentRoute = currentEntry?.destination?.route
    val currentScreen = currentRoute?.let { MainTab.valueOf(it) } ?: MainTab.Home

    Scaffold(
        topBar = { MediaCoTopAppBar() },
        bottomBar = { MediaCoBottomAppBar(currentScreen) { navController.navigate(it.name) } },
        snackbarHost = { SnackbarHost(appViewModel) },
        floatingActionButton = { HomeFab { pegaViewModel.createCase() } }
    ) { innerPadding ->
        Box(Modifier.padding(innerPadding)) {
            NavHost(navController, startDestination = MainTab.Home.name) {
                composable(MainTab.Home.name) { HomeScreen() }
                composable(MainTab.Services.name) { ServicesScreen(pegaViewModel) }
            }

            if (pegaViewModel.showForm) {
                PegaBottomSheet(
                    viewModel = pegaViewModel,
                    onMessage = { appViewModel.showSnackbar(it) },
                )
            }
        }
    }
}


