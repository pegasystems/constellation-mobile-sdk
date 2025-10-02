package com.pega.constellation.sdk.kmp.samples.basecmpapp

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.home.HomeScreen
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.theme.MediaCoTheme

@Composable
fun MediaCoApp() {
    MediaCoTheme {
        HomeScreen()
    }
}
