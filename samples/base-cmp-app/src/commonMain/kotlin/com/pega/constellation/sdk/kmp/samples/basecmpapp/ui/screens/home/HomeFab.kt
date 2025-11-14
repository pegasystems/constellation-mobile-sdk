package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.home

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.size
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.Res
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.icon_plus
import org.jetbrains.compose.resources.painterResource

@Composable
fun HomeFab(onClick: () -> Unit) {
    ExtendedFloatingActionButton(
        onClick = onClick,
        containerColor = MaterialTheme.colorScheme.primary,
        contentColor = Color.White
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            IconPlus()
            Spacer(Modifier.size(8.dp))
            Text("New Service", fontSize = 14.sp)
        }
    }
}

@Composable
private fun IconPlus() {
    Icon(
        painterResource(Res.drawable.icon_plus),
        "plus icon",
        modifier = Modifier.size(24.dp)
    )
}
