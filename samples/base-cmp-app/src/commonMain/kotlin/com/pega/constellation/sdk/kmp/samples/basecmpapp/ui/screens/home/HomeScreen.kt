package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.home

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.Res
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.icon_right_arrow
import com.pega.constellation.sdk.kmp.samples.basecmpapp.data.News
import com.pega.constellation.sdk.kmp.samples.basecmpapp.data.NewsRepository
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.theme.MediaCoTheme
import org.jetbrains.compose.resources.painterResource


@Composable
fun HomeScreen(
    homeViewModel: HomeViewModel = viewModel(factory = HomeViewModel.Factory)
) {
    val news by homeViewModel.news.collectAsState()
    HomeScreen(news)
}

@Composable
private fun HomeScreen(news: List<News>) {
    LazyColumn(
        modifier = Modifier
            .padding(16.dp)
            .fillMaxSize()
    ) {
        item {
            ContentHeader()
        }
        items(news.size) {
            HomeNewsCard(
                title = news[it].title,
                content = news[it].content,
                photoResId = news[it].photoRes
            )
        }
    }
}

@Composable
private fun ContentHeader(modifier: Modifier = Modifier) {
    Row(
        modifier = modifier
            .fillMaxWidth()
            .padding(bottom = 8.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(
            text = "Stay connected",
            fontSize = 22.sp
        )
        Image(
            painterResource(Res.drawable.icon_right_arrow),
            contentDescription = "right arrow",
            modifier = Modifier.height(24.dp)
        )
    }
}

@Preview(showBackground = true)
@Composable
fun HomeScreenPreview() {
    MediaCoTheme {
        val news = NewsRepository().fetchNews()
        HomeScreen(news)
    }
}

@Preview(showBackground = true)
@Composable
fun ContentHeaderPreview() {
    MediaCoTheme {
        ContentHeader()
    }
}
