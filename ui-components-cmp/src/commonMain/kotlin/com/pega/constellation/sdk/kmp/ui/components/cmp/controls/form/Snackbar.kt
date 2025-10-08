package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.material3.SnackbarDuration
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.Res
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.dismiss
import org.jetbrains.compose.resources.stringResource
import org.jetbrains.compose.ui.tooling.preview.Preview

@Composable
fun Snackbar(
    messages: List<String>,
    onSnackbarClose: () -> Unit,
    modifier: Modifier = Modifier
) {
    val snackbarHostState = remember { SnackbarHostState() }
    SnackbarHost(hostState = snackbarHostState, modifier = modifier)
    val dismiss = stringResource(Res.string.dismiss)
    LaunchedEffect(messages) {
        messages.forEach {
            snackbarHostState.showSnackbar(
                message = it,
                actionLabel = dismiss,
                duration = SnackbarDuration.Short
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
    val messages = listOf(
        "very long error very long error very lo ng er ror ve ry lo ng er ror ",
        "messages"
    )
    Snackbar(messages, onSnackbarClose = {})
}
