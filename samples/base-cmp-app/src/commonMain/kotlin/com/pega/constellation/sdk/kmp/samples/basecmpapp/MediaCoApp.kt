package com.pega.constellation.sdk.kmp.samples.basecmpapp

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.AuthError
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.Authenticated
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.TokenExpired
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.login.LoginScreen
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.main.MainScreen
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.pega.PegaViewModel
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.services.ServicesViewModel
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.theme.MediaCoTheme

@Composable
fun MediaCoApp(
    appViewModel: MediaCoAppViewModel = viewModel(factory = MediaCoAppViewModel.Factory),
    pegaViewModel: PegaViewModel = viewModel(factory = PegaViewModel.Factory),
    servicesViewModel: ServicesViewModel = viewModel(factory = ServicesViewModel.Factory),
) {
    val authState by appViewModel.authState.collectAsState()
    val authenticated = authState == Authenticated

    LaunchedEffect(authState) {
        when (val s = authState) {
            is AuthError -> appViewModel.showSnackbar(s.message)
            is TokenExpired -> appViewModel.showSnackbar("Your session has expired")
            else -> {}
        }
    }

    MediaCoTheme {
        if (authenticated) {
            MainScreen(appViewModel, pegaViewModel, servicesViewModel)
        } else {
            LoginScreen(appViewModel)
        }
    }
}
