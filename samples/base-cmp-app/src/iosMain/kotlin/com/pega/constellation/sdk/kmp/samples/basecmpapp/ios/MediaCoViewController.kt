package com.pega.constellation.sdk.kmp.samples.basecmpapp.ios

import androidx.compose.ui.window.ComposeUIViewController
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MediaCoApp
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MockSdkEngine.MockSdkEngineBuilder
import com.pega.constellation.sdk.kmp.samples.basecmpapp.SDKInitializer
import platform.UIKit.UIViewController

fun MediaCoViewController(): UIViewController = ComposeUIViewController { MediaCoApp() }
    .also { SDKInitializer.init(MockSdkEngineBuilder()) }

