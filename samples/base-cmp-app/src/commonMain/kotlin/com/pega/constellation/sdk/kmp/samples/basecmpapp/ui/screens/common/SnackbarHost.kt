package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.common

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MediaCoAppViewModel
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Snackbar

@Composable
fun SnackbarHost(appViewModel: MediaCoAppViewModel) {
    Snackbar(
        messages = appViewModel.snackbarMessages,
        onSnackbarClose = { appViewModel.removeSnackbar(it) }
    )
}