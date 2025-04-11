package com.pega.mobile.constellation.sample.ui.screens.home

import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.tooling.preview.Preview
import androidx.lifecycle.viewmodel.compose.viewModel
import com.pega.mobile.constellation.sample.auth.AuthState
import com.pega.mobile.constellation.sample.auth.AuthState.AuthError
import com.pega.mobile.constellation.sample.auth.AuthState.TokenExpired
import com.pega.mobile.constellation.sample.data.News
import com.pega.mobile.constellation.sample.data.NewsRepository
import com.pega.mobile.constellation.sample.ui.screens.app.MediaCoBottomAppBar
import com.pega.mobile.constellation.sample.ui.screens.app.MediaCoTopAppBar
import com.pega.mobile.constellation.sample.ui.screens.pega.PegaBottomSheet
import com.pega.mobile.constellation.sample.ui.screens.pega.PegaViewModel
import com.pega.mobile.constellation.sample.ui.theme.MediaCoTheme
import com.pega.mobile.dxcomponents.compose.controls.form.Snackbar

@Composable
fun HomeScreen(
    homeViewModel: HomeViewModel = viewModel(factory = HomeViewModel.Factory),
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

