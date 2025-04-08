package com.pega.mobile.constellation.sample.ui.screens.pega

import android.content.Context
import android.widget.Toast
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.pega.mobile.constellation.sample.CustomComponents.CustomRenderers
import com.pega.mobile.constellation.sample.ui.screens.pega.PegaViewModel.AuthState.AuthError
import com.pega.mobile.constellation.sample.ui.screens.pega.PegaViewModel.AuthState.Authenticated
import com.pega.mobile.constellation.sample.ui.screens.pega.PegaViewModel.AuthState.Authenticating
import com.pega.mobile.constellation.sample.ui.screens.pega.PegaViewModel.AuthState.Unauthenticated
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Cancelled
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Error
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Finished
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Loading
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Ready
import com.pega.mobile.constellation.sdk.components.containers.RootContainerComponent
import com.pega.mobile.constellation.sdk.components.core.ProvideRenderers
import com.pega.mobile.constellation.sdk.components.core.Render

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PegaBottomSheet(
    viewModel: PegaViewModel = viewModel(factory = PegaViewModel.Factory),
    onClose: (String) -> Unit
) {
    ModalBottomSheet(
        onDismissRequest = { onClose("Dismissed") },
        sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
        shape = RoundedCornerShape(topStart = 16.dp, topEnd = 16.dp),
        containerColor = MaterialTheme.colorScheme.surface,
        tonalElevation = 16.dp,
        content = { PegaBottomSheetContent(viewModel, onClose) }
    )
}

@Composable
fun PegaBottomSheetContent(viewModel: PegaViewModel, onClose: (String) -> Unit) {
    Box {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Top
        ) {
            val authState by viewModel.authState.collectAsState()
            when (val s = authState) {
                is AuthError -> onClose(s.message ?: "Unknown error").also { viewModel.reset() }
                is Authenticated -> PegaContent(viewModel, onClose)
                is Authenticating -> PegaLoader("Authenticating against Pega...")
                is Unauthenticated -> viewModel.authenticate()
            }
        }
    }
}

@Composable
fun PegaContent(viewModel: PegaViewModel, onClose: (String) -> Unit) {
    LaunchedEffect(Unit) {
        viewModel.createCase()
    }

    val state by viewModel.sdkState.collectAsState()
    when (val s = state) {
        is Error -> Text("ConstellationSdk failed to load")
        is Loading -> PegaLoader("Loading Pega...")
        is Ready -> Render(s.root)
        is Cancelled -> onClose("Cancelled")
        is Finished -> onClose("Thanks for registration")
    }
}

@Composable
private fun PegaLoader(message: String? = null) {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.spacedBy(48.dp, Alignment.CenterVertically),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        message?.let { Text(it) }
        CircularProgressIndicator()
    }
}

@Composable
private fun Render(root: RootContainerComponent) {
    ProvideRenderers(CustomRenderers) { root.Render() }
}

private fun Context.toast(message: String, duration: Int = Toast.LENGTH_SHORT) =
    Toast.makeText(this, message, duration).show()
