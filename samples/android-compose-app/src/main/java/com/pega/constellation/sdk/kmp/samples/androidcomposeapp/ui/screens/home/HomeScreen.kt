package com.pega.constellation.sdk.kmp.samples.androidcomposeapp.ui.screens.home

import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.tooling.preview.Preview
import androidx.lifecycle.viewmodel.compose.viewModel
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.auth.AuthState
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.auth.AuthState.AuthError
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.auth.AuthState.TokenExpired
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.data.News
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.data.NewsRepository
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.ui.screens.bars.MediaCoBottomAppBar
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.ui.screens.bars.MediaCoTopAppBar
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.ui.screens.pega.PegaBottomSheet
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.ui.screens.pega.PegaViewModel
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.ui.theme.MediaCoTheme
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Snackbar

@Composable
fun HomeScreen(
    homeViewModel: HomeViewModel = viewModel(factory = HomeViewModel.Companion.Factory),
    pegaViewModel: PegaViewModel = viewModel(factory = PegaViewModel.Factory),
) {
    val news by homeViewModel.news.collectAsState()
    val authState by homeViewModel.authState.collectAsState()

    val showSnackbar = { msg: String ->
        homeViewModel.snackbarMessages += msg
    }

    HomeScreen(
        authState = authState,
        news = news,
        snackbarMessages = homeViewModel.snackbarMessages,
        onSnackbarMessage = showSnackbar,
        onSnackbarClose = { homeViewModel.snackbarMessages = emptyList() },
        onFabClick = { pegaViewModel.createCase(onFailure = showSnackbar) },
    )
}

@Composable
private fun HomeScreen(
    authState: AuthState,
    news: List<News>,
    snackbarMessages: List<String>,
    onSnackbarMessage: (String) -> Unit = {},
    onSnackbarClose: () -> Unit = {},
    onFabClick: () -> Unit = {}
) {
    val authenticated = authState == AuthState.Authenticated
    val showFabLoader = authState == AuthState.Authenticating

    LaunchedEffect(authState) {
        when (authState) {
            is AuthError -> onSnackbarMessage(authState.message)
            is TokenExpired -> onSnackbarMessage("Your session has expired")
            else -> {}
        }
    }

    Scaffold(
        topBar = { MediaCoTopAppBar() },
        bottomBar = { MediaCoBottomAppBar() },
        snackbarHost = { Snackbar(snackbarMessages, onSnackbarClose) },
        floatingActionButton = { HomeFab(showFabLoader, onFabClick) }
    ) { innerPadding ->
        HomeContent(innerPadding, news)
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
            authState = AuthState.Unauthenticated,
            news = NewsRepository().fetchNews(),
            snackbarMessages = emptyList()
        )
    }
}

