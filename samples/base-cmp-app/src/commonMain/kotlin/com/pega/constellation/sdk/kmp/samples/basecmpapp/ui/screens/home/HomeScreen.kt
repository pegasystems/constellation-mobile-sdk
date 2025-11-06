package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.home

import ServicesContent
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.AuthError
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.Authenticated
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.Authenticating
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.TokenExpired
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.Unauthenticated
import com.pega.constellation.sdk.kmp.samples.basecmpapp.data.News
import com.pega.constellation.sdk.kmp.samples.basecmpapp.data.NewsRepository
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.bars.MediaCoBottomAppBar
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.bars.MediaCoTopAppBar
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.pega.Assignment
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.pega.PegaBottomSheet
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.pega.PegaViewModel
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.theme.MediaCoTheme
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Snackbar
import org.jetbrains.compose.ui.tooling.preview.Preview

enum class NavItem { Home, Services }

@Composable
fun HomeScreen(
    homeViewModel: HomeViewModel = viewModel(factory = HomeViewModel.Factory),
    pegaViewModel: PegaViewModel = viewModel(factory = PegaViewModel.Factory),
) {
    val news by homeViewModel.news.collectAsState()
    val authState by homeViewModel.authState.collectAsState()
    val assignments by pegaViewModel.assignments.collectAsState()

    val showSnackbar = { msg: String ->
        homeViewModel.snackbarMessages += msg
    }

    val accessToken = (authState as? Authenticated)?.accessToken ?: ""
    LaunchedEffect(accessToken) {
        pegaViewModel.loadAssignments(accessToken)
    }

    HomeScreen(
        authState = authState,
        news = news,
        snackbarMessages = homeViewModel.snackbarMessages,
        onSnackbarMessage = showSnackbar,
        onSnackbarClose = { homeViewModel.snackbarMessages = emptyList() },
        onFabClick = { pegaViewModel.createCase(onFailure = showSnackbar) },
        onAssignmentClick = {
            pegaViewModel.openAssignment(
                it.pzInsKey,
                onFailure = showSnackbar
            )
        },
        assignments = assignments
    )
}

@Composable
private fun HomeScreen(
    authState: AuthState,
    news: List<News>,
    snackbarMessages: List<String>,
    onSnackbarMessage: (String) -> Unit = {},
    onSnackbarClose: () -> Unit = {},
    onFabClick: () -> Unit = {},
    onAssignmentClick: (Assignment) -> Unit = {},
    assignments: List<Assignment> = emptyList()
) {
    val authenticated = authState is Authenticated
    val showFabLoader = authState == Authenticating

    LaunchedEffect(authState) {
        when (authState) {
            is AuthError -> onSnackbarMessage(authState.message)
            is TokenExpired -> onSnackbarMessage("Your session has expired")
            else -> {}
        }
    }

    var selectedNavItem by remember { mutableStateOf(NavItem.Home) }

    Scaffold(
        topBar = { MediaCoTopAppBar() },
        bottomBar = {
            MediaCoBottomAppBar(
                selectedNavItem = selectedNavItem,
                onNavItemSelected = { selectedNavItem = it }
            )
        },
        snackbarHost = { Snackbar(snackbarMessages, onSnackbarClose) },
        floatingActionButton = {
            if (selectedNavItem == NavItem.Home) {
                HomeFab(
                    showFabLoader,
                    onFabClick
                )
            }
        }
    ) { innerPadding ->
        when (selectedNavItem) {
            NavItem.Home -> HomeContent(innerPadding, news)
            NavItem.Services -> ServicesContent(assignments, onAssignmentClick)
        }
        if (authenticated) {
            PegaBottomSheet(onMessage = onSnackbarMessage)
        }
    }
}

@Preview
@Composable
fun MainScreenPreview() {
    MediaCoTheme {
        HomeScreen(
            authState = Unauthenticated,
            news = NewsRepository().fetchNews(),
            snackbarMessages = emptyList()
        )
    }
}

