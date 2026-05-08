package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.home

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.Res
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.icon_plus
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.theme.MediaCoBrandGradient
import org.jetbrains.compose.resources.painterResource

@Composable
fun HomeFab(onClick: () -> Unit) {
    Row(
        modifier = Modifier
            .clip(RoundedCornerShape(14.dp))
            .background(MediaCoBrandGradient)
            .clickable(onClick = onClick)
            .height(44.dp)
            .padding(start = 14.dp, end = 18.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Icon(
            painterResource(Res.drawable.icon_plus),
            contentDescription = "plus icon",
            tint = Color.White,
            modifier = Modifier.size(16.dp)
        )
        Text(
            text = "New Service",
            style = MaterialTheme.typography.labelLarge,
            color = Color.White
        )
    }
}
