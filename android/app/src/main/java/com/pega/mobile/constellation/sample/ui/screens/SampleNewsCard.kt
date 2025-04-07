package com.pega.mobile.constellation.sample.ui.screens

import androidx.annotation.DrawableRes
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.mobile.constellation.sample.R
import com.pega.mobile.constellation.sample.ui.theme.SampleSdkTheme

@Composable
fun SampleNewsCard(
    title: String,
    content: String,
    @DrawableRes photoResId: Int,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier.padding(vertical = 4.dp),
        colors = CardDefaults.cardColors(containerColor = Color.Transparent)
    ) {
        Row(modifier = Modifier.height(120.dp)) {
            Image(
                painterResource(photoResId),
                "news item picture 1",
                modifier = Modifier.height(120.dp)
            )
            Column(modifier = Modifier
                .padding(start = 16.dp)
                .fillMaxHeight()) {
                Text(title, fontSize = 22.sp)
                Text(
                    content,
                    modifier = Modifier.padding(top = 8.dp),
                    fontSize = 14.sp,
                    lineHeight = 16.sp,
                    overflow = TextOverflow.Ellipsis,
                    maxLines = 2
                )
                Row(modifier = Modifier.weight(1f), verticalAlignment = Alignment.Bottom) {
                    Icon(
                        painterResource(R.drawable.plus_today_icon),
                        "plus today icon",
                        modifier = Modifier.height(24.dp)
                    )
                    Text("Today", fontSize = 12.sp, modifier = Modifier.padding(start = 4.dp))
                }

            }
        }
    }
}

@Preview(showBackground = true, widthDp = 500, heightDp = 500)
@Composable
fun SampleNewsCardPreview() {
    SampleSdkTheme {
        SampleNewsCard(
            title = "5G is here! Free now!",
            content = "Our 5G network will enable you to stay connected anywhere, anytime.",
            photoResId = R.drawable.list_image_1
        )
    }
}