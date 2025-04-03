package com.pega.mobile.constellation.sample.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.mobile.constellation.sample.R
import com.pega.mobile.constellation.sample.ui.theme.SampleSdkTheme

@Composable
fun Content(innerPadding: PaddingValues) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = Modifier
            .padding(innerPadding)
            .padding(16.dp)
            .fillMaxSize()
    ) {
        Text(
            "Discover how U+Comms will help you stay connected",
            fontSize = 20.sp,
            modifier = Modifier.padding(bottom = 16.dp)
        )
        Image(
            painter = painterResource(R.drawable.u_plus_picture),
            contentDescription = "",
            alignment = Alignment.TopCenter,
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.FillWidth
        )
    }
}

@Preview(showBackground = true, widthDp = 500)
@Composable
fun ContentPreview() {
    SampleSdkTheme {
        Content(PaddingValues(16.dp))
    }
}