package com.pega.constellation.sdk.kmp.samples.androidcmpapp

import android.content.Context
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngineBuilder
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.engine.androidwebview.buildAndroidConstellationSdkEngine

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)
        setContent {
            App(ConstellationSdkEngineBuilderImpl(this))
        }
    }
}

@Preview
@Composable
fun AppAndroidPreview() {
    val context = LocalContext.current
    App(ConstellationSdkEngineBuilderImpl(context))
}

class ConstellationSdkEngineBuilderImpl(private val context: Context) : ConstellationSdkEngineBuilder {
    override fun buildConstellationSdkEngine(
        config: ConstellationSdkConfig,
        handler: EngineEventHandler
    ): ConstellationSdkEngine {
        return buildAndroidConstellationSdkEngine(context, config, handler)
    }
}
