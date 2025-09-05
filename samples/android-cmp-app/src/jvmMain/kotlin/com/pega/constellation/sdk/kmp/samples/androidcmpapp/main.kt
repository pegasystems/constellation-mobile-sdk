package com.pega.constellation.sdk.kmp.samples.androidcmpapp

import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application

fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "constellation-mobile-sdk",
    ) {
        App()
    }
}
