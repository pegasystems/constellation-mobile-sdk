package com.pega.mobile.constellation.sample.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults.topAppBarColors
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.pega.mobile.constellation.sample.R
import com.pega.mobile.constellation.sample.ui.theme.SampleSdkTheme

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SampleTopAppBar(modifier: Modifier = Modifier) {
    TopAppBar(
        title = {
            Box(modifier = Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) {
                Image(
                    painterResource(R.drawable.mediaco_logo),
                    "MediaCo logo",
                    modifier = modifier.height(24.dp)
                )
            }
        },
        navigationIcon = {
            Icon(
                painterResource(R.drawable.settings_icon),
                "settings icon",
                modifier = Modifier
                    .padding(12.dp)
                    .height(24.dp)
            )
        },
        actions = {
            Icon(
                painterResource(R.drawable.profile_icon),
                "profile icon",
                modifier = Modifier
                    .padding(12.dp)
                    .height(24.dp)
            )
        },
        colors = topAppBarColors(
            containerColor = MaterialTheme.colorScheme.background,
            titleContentColor = MaterialTheme.colorScheme.primary,
        )

    )
}

@Preview(widthDp = 500)
@Composable
fun SampleTopAppBarPreview() {
    SampleSdkTheme {
        SampleTopAppBar()
    }
}