package com.pega.mobile.constellation.sample.ui.screens

import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults.topAppBarColors
import androidx.compose.runtime.Composable
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import com.pega.mobile.constellation.sample.ui.theme.SampleSdkTheme

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SampleTopAppBar() {
    androidx.compose.material3.TopAppBar(
        colors = topAppBarColors(
            containerColor = MaterialTheme.colorScheme.primaryContainer,
            titleContentColor = MaterialTheme.colorScheme.primary,
        ),
        title = {
            Text("U+ Comms", fontWeight = FontWeight.Bold)
        }
    )
}

@Preview
@Composable
fun SampleTopAppBarPreview() {
    SampleSdkTheme {
        SampleTopAppBar()
    }
}