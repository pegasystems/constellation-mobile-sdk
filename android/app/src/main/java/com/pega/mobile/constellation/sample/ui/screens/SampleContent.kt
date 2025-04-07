package com.pega.mobile.constellation.sample.ui.screens

import androidx.annotation.DrawableRes
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Devices
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.mobile.constellation.sample.R
import com.pega.mobile.constellation.sample.data.SampleRepository
import com.pega.mobile.constellation.sample.ui.theme.SampleSdkTheme

@Composable
fun SampleContent(innerPadding: PaddingValues) {
    LazyColumn(
        modifier = Modifier
            .padding(innerPadding)
            .padding(16.dp)
            .fillMaxSize()
    ) {
        val news = SampleRepository().fetchNews()
        item {
            ContentHeader()
        }
        items(4) {
            SampleNewsCard(
                title = news[it].title,
                content = news[it].content,
                photoResId = news[it].photoResId
            )
        }
    }
}

@Composable
fun ContentHeader(modifier: Modifier = Modifier) {
    Row(
        modifier = modifier.fillMaxWidth().padding(bottom = 8.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            "Stay connected",
            fontSize = 22.sp
        )
        Image(
            painterResource(R.drawable.right_arrow_icon),
            "right arrow",
            modifier = Modifier.height(24.dp)
        )
    }
}

@Preview(showBackground = true, device = Devices.PIXEL_3)
@Composable
fun SampleContentPreview() {
    SampleSdkTheme {
        SampleContent(PaddingValues(16.dp))
    }
}

@Preview(showBackground = true, device = Devices.PIXEL_7)
@Composable
fun SampleContentPreview2() {
    SampleSdkTheme {
        SampleContent(PaddingValues(16.dp))
    }
}

@Preview(showBackground = true, device = Devices.PIXEL_7_PRO)
@Composable
fun SampleContentPreview3() {
    SampleSdkTheme {
        SampleContent(PaddingValues(16.dp))
    }
}

@Preview(showBackground = true, widthDp = 500)
@Composable
fun ContentHeaderPreview() {
    SampleSdkTheme {
        ContentHeader()
    }
}