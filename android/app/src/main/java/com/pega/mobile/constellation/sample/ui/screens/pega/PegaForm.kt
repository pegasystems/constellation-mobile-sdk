package com.pega.mobile.constellation.sample.ui.screens.pega

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.offset
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.pega.mobile.constellation.sample.ui.components.CustomComponents.CustomRenderers
import com.pega.mobile.constellation.sdk.ConstellationSdk.State
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Initial
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Loading
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Ready
import com.pega.mobile.constellation.sdk.components.containers.RootContainerComponent
import com.pega.mobile.constellation.sdk.components.core.ProvideRenderers
import com.pega.mobile.constellation.sdk.components.core.Render

@Composable
fun PegaForm(state: State) {
    when (state) {
        is Initial -> PegaLoader()
        is Loading -> PegaLoader("Loading form...")
        is Ready -> Render(state.root)
        else -> {}
    }
}


@Composable
fun PegaLoader(message: String? = null) {
    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        message?.let { Text(it, Modifier.offset(y = (-64).dp)) }
        CircularProgressIndicator(Modifier.align(Alignment.Center))
    }
}

@Composable
private fun Render(root: RootContainerComponent) {
    ProvideRenderers(CustomRenderers) { root.Render() }
}
