/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sample.ui.screens

import android.content.Context
import android.widget.Toast
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.mobile.constellation.sample.CustomComponents.CustomRenderers
import com.pega.mobile.constellation.sample.PegaConfig
import com.pega.mobile.constellation.sdk.ConstellationSdk
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Cancelled
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Error
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Finished
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Loading
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Ready
import com.pega.mobile.constellation.sdk.components.containers.RootContainerComponent
import com.pega.mobile.constellation.sdk.components.core.ProvideRenderers
import com.pega.mobile.constellation.sdk.components.core.Render

@Composable
fun MainScreen(sdk: ConstellationSdk, caseClassName: String) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .padding(top = 24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Top
    ) {
        Text(
            text = "Pega Constellation Mobile SDK",
            fontSize = 20.sp,
            textAlign = TextAlign.Center
        )

        var showPega by remember { mutableStateOf(false) }
        if (showPega) {
            PegaContent(sdk) { showPega = false }
        } else {
            Spacer(modifier = Modifier.height(32.dp))
            CreateCaseButton {
                showPega = true
                sdk.createCase(caseClassName)
            }
        }
    }
}

@Composable
fun PegaContent(sdk: ConstellationSdk, onClose: () -> Unit) {
    val context = LocalContext.current
    val state by sdk.state.collectAsState()
    when (val s = state) {
        is Error -> Text("ConstellationSdk failed to load")
        is Loading -> PegaLoader()
        is Ready -> Render(s.root)
        is Cancelled -> context.toast("Cancelled").also { onClose() }
        is Finished -> context.toast("Done!").also { onClose() }
    }
}

@Composable
fun PegaLoader() {
    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        CircularProgressIndicator()
    }
}

@Composable
fun Render(root: RootContainerComponent) {
    ProvideRenderers(CustomRenderers) { root.Render() }
}


@Composable
fun CreateCaseButton(onClick: () -> Unit = {}) {
    Button(onClick = onClick) {
        Text("Create case")
    }
}

private fun Context.toast(message: String, duration: Int = Toast.LENGTH_SHORT) =
    Toast.makeText(this, message, duration).show()
