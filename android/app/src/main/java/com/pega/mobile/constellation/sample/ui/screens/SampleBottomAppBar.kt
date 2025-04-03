package com.pega.mobile.constellation.sample.ui.screens

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.RowScope
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.List
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.sp
import com.pega.mobile.constellation.sample.ui.theme.SampleSdkTheme

@Composable
fun SampleBottomAppBar() {
    androidx.compose.material3.BottomAppBar(
        actions = {
            BottomBarItem(Icons.Filled.Home, "Home")
            BottomBarItem(Icons.Filled.List, "Services")
            BottomBarItem(Icons.Filled.Settings, "Settings")
            BottomBarItem(Icons.Filled.Email, "Contact")
        }
    )
}

@Composable
fun RowScope.BottomBarItem(imageVector: ImageVector, text: String) {
    IconButton(onClick = { /* do something */ }, modifier = Modifier.weight(1f)) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Icon(imageVector, contentDescription = "Localized description")
            Text(text, fontSize = 12.sp)
        }
    }
}

@Preview
@Composable
fun SampleBottomBarPreview() {
    SampleSdkTheme {
        SampleBottomAppBar()
    }
}