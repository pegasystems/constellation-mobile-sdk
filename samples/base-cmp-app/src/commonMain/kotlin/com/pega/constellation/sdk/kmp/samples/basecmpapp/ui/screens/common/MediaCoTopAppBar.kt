package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.common

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
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.Res
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.icon_profile
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.icon_settings
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.logo_mediaco
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.theme.MediaCoTheme
import org.jetbrains.compose.resources.painterResource
import org.jetbrains.compose.ui.tooling.preview.Preview

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MediaCoTopAppBar(modifier: Modifier = Modifier) {
    TopAppBar(
        title = {
            Box(modifier = Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) {
                Image(
                    painterResource(Res.drawable.logo_mediaco),
                    "MediaCo logo",
                    modifier = modifier.height(24.dp)
                )
            }
        },
        navigationIcon = {
            Icon(
                painterResource(Res.drawable.icon_settings),
                "settings icon",
                modifier = Modifier
                    .padding(12.dp)
                    .height(24.dp)
            )
        },
        actions = {
            Icon(
                painterResource(Res.drawable.icon_profile),
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
fun MediaCoTopAppBarPreview() {
    MediaCoTheme {
        MediaCoTopAppBar()
    }
}
