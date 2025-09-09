package com.pega.constellation.sdk.kmp.samples.androidcmpapp

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.safeContentPadding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngineBuilder
import com.pega.constellation.sdk.kmp.core.components.core.Render
import constellation_mobile_sdk.samples.android_cmp_app.generated.resources.Res
import constellation_mobile_sdk.samples.android_cmp_app.generated.resources.compose_multiplatform
import org.jetbrains.compose.resources.painterResource
import org.jetbrains.compose.ui.tooling.preview.Preview

@Composable
@Preview
fun App(engineBuilder: ConstellationSdkEngineBuilder) {
    val sdk = remember {
        ConstellationSdk.create(
            ConstellationSdkConfig(
                pegaUrl = SDKConfig.PEGA_URL,
                pegaVersion = SDKConfig.PEGA_VERSION
            ), engineBuilder
        )
    }

    MaterialTheme {
        var showContent by remember { mutableStateOf(false) }
        Column(
            modifier = Modifier
                .safeContentPadding()
                .fillMaxSize()
                .padding(top = 16.dp)
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Text("Constellation Multiplatform SDK", style = MaterialTheme.typography.titleLarge)
            Spacer(Modifier.size(16.dp))
            AnimatedVisibility(!showContent) {
                Button(onClick = {
                    sdk.createCase(SDKConfig.PEGA_CASE_CLASS_NAME)
                    showContent = !showContent
                }) {
                    Text("Click me")
                }
            }
            AnimatedVisibility(showContent) {
                val sdkState by sdk.state.collectAsState()
                val greeting = remember { Greeting().greet() }
                Column(
                    Modifier.fillMaxWidth(),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Image(
                        painterResource(Res.drawable.compose_multiplatform),
                        null,
                        modifier = Modifier.size(24.dp)
                    )
                    Text("Compose: $greeting")
                    SDK(sdkState)
                }
            }
        }
    }
}

@Composable
fun SDK(state: ConstellationSdk.State) {
    Spacer(Modifier.size(16.dp))

    when (state) {
        ConstellationSdk.State.Initial -> Text("Initializing...")
        is ConstellationSdk.State.Loading -> Text("Loading...")
        is ConstellationSdk.State.Ready -> {
            Text("Ready!")
            Spacer(Modifier.size(16.dp))
            state.root.Render()
        }

        is ConstellationSdk.State.Finished -> Text("Finished: ${state.successMessage}")
        ConstellationSdk.State.Cancelled -> Text("Cancelled")
        is ConstellationSdk.State.Error -> Text("Error !!!" + state.error)
    }
}
