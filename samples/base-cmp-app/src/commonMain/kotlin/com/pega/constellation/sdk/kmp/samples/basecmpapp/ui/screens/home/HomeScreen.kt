package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.home

import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
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
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.pega.PegaBottomSheet
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.pega.PegaViewModel
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.theme.MediaCoTheme
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Snackbar
import org.jetbrains.compose.ui.tooling.preview.Preview

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
    val authenticated = authState == Authenticated
    val showFabLoader = authState == Authenticating

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
            authState = Unauthenticated,
            news = NewsRepository().fetchNews(),
            snackbarMessages = emptyList()
        )
    }
}

