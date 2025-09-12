package com.pega.constellation.sdk.kmp.samples.androidcmpapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngineBuilder
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.engine.androidwebview.buildAndroidConstellationSdkEngine
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MediaCoApp
import com.pega.constellation.sdk.kmp.samples.basecmpapp.SDKInitializer

class MediaCoActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        SDKInitializer.init(AndroidEngineBuilder())
        setContent {
            MediaCoApp()
        }
    }

    inner class AndroidEngineBuilder : ConstellationSdkEngineBuilder {
        override fun build(config: ConstellationSdkConfig, handler: EngineEventHandler) =
            buildAndroidConstellationSdkEngine(this@MediaCoActivity, config, handler)
    }
}
