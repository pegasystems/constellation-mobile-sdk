package com.pega.mobile.constellation.sample.ui.screens.home

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.size
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.mobile.constellation.sample.R
import com.pega.mobile.constellation.sample.ui.theme.MediaCoTheme

@Composable
fun HomeFab(loader: Boolean, onClick: () -> Unit) {
    ExtendedFloatingActionButton(
        onClick = onClick,
        containerColor = MaterialTheme.colorScheme.primary,
        contentColor = Color.White
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            if (loader) IconLoader() else IconPlus()
            Spacer(Modifier.size(8.dp))
            Text("New Service", fontSize = 14.sp)
        }
    }
}

@Composable
private fun IconLoader() {
    CircularProgressIndicator(
        color = Color.White,
        strokeWidth = 3.dp,
        modifier = Modifier.size(24.dp)
    )
}

@Composable
private fun IconPlus() {
    Icon(
        painterResource(R.drawable.icon_plus),
        "plus icon",
        modifier = Modifier.size(24.dp)
    )
}

@Preview
@Composable
fun OpenFormButtonPreview1() {
    MediaCoTheme {
        HomeFab(false) { }
    }
}

@Preview
@Composable
fun OpenFormButtonPreview2() {
    MediaCoTheme {
        HomeFab(true) { }
    }
}