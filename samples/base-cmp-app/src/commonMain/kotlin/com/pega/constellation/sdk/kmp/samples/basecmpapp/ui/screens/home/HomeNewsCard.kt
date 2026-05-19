package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.home

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.Res
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.icon_plus_today
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.list_image_1
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.theme.MediaCoTheme
import org.jetbrains.compose.resources.DrawableResource
import org.jetbrains.compose.resources.painterResource

@Composable
fun HomeNewsCard(
    title: String,
    content: String,
    photoResId: DrawableResource,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier.fillMaxWidth(),
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.surface.copy(alpha = 0.75f),
            contentColor = MaterialTheme.colorScheme.onSurface
        ),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp)
    ) {
        Row(
            modifier = Modifier
                .padding(12.dp)
                .height(120.dp),
            verticalAlignment = Alignment.Top
        ) {
            Box(
                modifier = Modifier
                    .size(120.dp)
                    .clip(RoundedCornerShape(14.dp))
            ) {
                Image(
                    painter = painterResource(photoResId),
                    contentDescription = null,
                    contentScale = ContentScale.Crop,
                    modifier = Modifier.fillMaxSize()
                )
                // Purple tint overlay
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(Color(0x447C3AED))
                )
            }
            Column(
                modifier = Modifier
                    .padding(start = 14.dp)
                    .fillMaxHeight(),
                verticalArrangement = Arrangement.spacedBy(6.dp)
            ) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.onSurface,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
                Text(
                    text = content,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    overflow = TextOverflow.Ellipsis,
                    maxLines = 2
                )
                Row(
                    modifier = Modifier.weight(1f),
                    verticalAlignment = Alignment.Bottom
                ) {
                    Icon(
                        painterResource(Res.drawable.icon_plus_today),
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.height(18.dp)
                    )
                    Text(
                        text = "Today",
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.primary,
                        modifier = Modifier.padding(start = 6.dp)
                    )
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
