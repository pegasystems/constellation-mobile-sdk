package com.pega.mobile.constellation.sample.ui.screens

import android.content.Context
import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.SheetState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.pega.mobile.constellation.sample.CustomComponents.CustomRenderers
import com.pega.mobile.constellation.sdk.ConstellationSdk
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
fun FormBottomSheet(sdk: ConstellationSdk, caseClassName: String, sheetState: SheetState, onDismissRequest: () -> Unit) {
    ModalBottomSheet(
        onDismissRequest = onDismissRequest,
        sheetState = sheetState,
        shape = RoundedCornerShape(topStart = 16.dp, topEnd = 16.dp),
        containerColor = MaterialTheme.colorScheme.surface,
        tonalElevation = 16.dp,
        dragHandle = {
            Box(
                modifier = Modifier
                    .padding(8.dp)
                    .width(50.dp)
                    .height(6.dp)
                    .clip(RoundedCornerShape(50))
                    .background(Color.Black)
            )
        }
    ) {
        Box {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 16.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Top
            ) {
                sdk.createCase(caseClassName)
                PegaContent(sdk, onDismissRequest)
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
        is Finished -> context.toast("Thanks for registration").also { onClose() }
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


private fun Context.toast(message: String, duration: Int = Toast.LENGTH_SHORT) =
    Toast.makeText(this, message, duration).show()
