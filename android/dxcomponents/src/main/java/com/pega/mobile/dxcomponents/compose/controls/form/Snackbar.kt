package com.pega.mobile.dxcomponents.compose.controls.form

import androidx.compose.material3.SnackbarDuration
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import com.pega.mobile.dxcomponents.R

@Composable
fun Snackbar(messages: List<String>, onSnackbarClose: () -> Unit, modifier: Modifier = Modifier) {
    val snackbarHostState = remember { SnackbarHostState() }
    SnackbarHost(hostState = snackbarHostState, modifier = modifier)
    val dismiss = stringResource(R.string.snackbar_dismiss)
    LaunchedEffect(messages) {
        messages.forEach {
            snackbarHostState.showSnackbar(
                message = it,
                actionLabel = dismiss,
                duration = SnackbarDuration.Long
            )
            onSnackbarClose()
        }
    }
}

/**
 * run interactive mode to see preview
 */
@Preview(showBackground = true)
@Composable
fun SnackbarPreview() {
    var messages: List<String> by remember {
        mutableStateOf(
            listOf(
                "very long error very long error very lo ng er ror ve ry lo ng er ror ",
                "messages"
            )
        )
    }
    Snackbar(messages, onSnackbarClose = {})
}