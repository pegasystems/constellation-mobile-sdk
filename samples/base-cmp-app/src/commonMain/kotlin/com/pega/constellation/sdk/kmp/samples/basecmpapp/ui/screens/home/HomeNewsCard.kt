package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.home

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
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.Res
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.icon_plus_today
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.list_image_1
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.theme.MediaCoTheme
import org.jetbrains.compose.resources.DrawableResource
import org.jetbrains.compose.resources.painterResource
import org.jetbrains.compose.ui.tooling.preview.Preview

@Composable
fun HomeNewsCard(
    title: String,
    content: String,
    photoResId: DrawableResource,
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
            Column(
                modifier = Modifier
                    .padding(start = 16.dp)
                    .fillMaxHeight()
            ) {
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
                        painterResource(Res.drawable.icon_plus_today),
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
fun HomeNewsCardPreview() {
    MediaCoTheme {
        HomeNewsCard(
            title = "5G is here! Free now!",
            content = "Our 5G network will enable you to stay connected anywhere, anytime.",
            photoResId = Res.drawable.list_image_1
        )
    }
}
