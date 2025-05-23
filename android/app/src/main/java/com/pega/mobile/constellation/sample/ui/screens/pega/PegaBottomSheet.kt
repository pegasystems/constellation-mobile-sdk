package com.pega.mobile.constellation.sample.ui.screens.pega

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.imePadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.derivedStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.pega.mobile.constellation.sdk.ConstellationSdk.State
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Cancelled
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Error
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Finished
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Loading
import com.pega.mobile.constellation.sdk.ConstellationSdk.State.Ready

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PegaBottomSheet(
    viewModel: PegaViewModel = viewModel(factory = PegaViewModel.Factory),
    onMessage: (String) -> Unit,
) {
    val sdkState by viewModel.sdkState.collectAsState()
    val showForm by remember {
        derivedStateOf {
            !viewModel.dismissed && (sdkState is Loading || sdkState is Ready)
        }
    }

    LaunchedEffect(sdkState) {
        val message = when (sdkState) {
            is Cancelled -> "Registration cancelled"
            is Finished -> "Thanks for registration"
            is Error -> "Failed to load the registration form"
            else -> null
        }
        message?.let(onMessage)
    }

    if (showForm) {
        ModalBottomSheet(
            onDismissRequest = { viewModel.dismissed = true },
            sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
            shape = RoundedCornerShape(topStart = 16.dp, topEnd = 16.dp),
            containerColor = MaterialTheme.colorScheme.surface,
            tonalElevation = 16.dp,
            content = { PegaBottomSheetContent(sdkState) }
        )
    }
}

@Composable
fun PegaBottomSheetContent(state: State) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .imePadding()
            .padding(horizontal = 16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Top,
        content = { PegaForm(state) }
    )
}
