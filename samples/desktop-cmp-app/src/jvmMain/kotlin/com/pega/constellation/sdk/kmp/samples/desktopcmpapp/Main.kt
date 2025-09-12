package com.pega.constellation.sdk.kmp.samples.desktopcmpapp

import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MediaCoApp
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MockSdkEngine
import com.pega.constellation.sdk.kmp.samples.basecmpapp.SDKInitializer

fun main() = application {
    SDKInitializer.init(MockSdkEngine.MockSdkEngineBuilder())
    Window(
        onCloseRequest = ::exitApplication,
        title = "MediaCo Desktop CMP App",
    ) {
        MediaCoApp()
    }
}
