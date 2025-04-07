package com.pega.mobile.constellation.sample.data

import androidx.annotation.DrawableRes
import com.pega.mobile.constellation.sample.R

class SampleRepository {
    fun fetchNews() = listOf(
        NewsData(
            title = "5G is here! Free now!",
            content = "Our 5G network will enable you to stay connected anywhere, anytime.",
            photoResId = R.drawable.list_image_1
        ),
        NewsData(
            title = "Blazing fast internet",
            content = "Our industry leading internet plans will give you blazing fast speeds for all of your needs.",
            photoResId = R.drawable.list_image_2
        ),
        NewsData(
            title = "We’ve got you covered",
            content = "MediCo network will have you connected wherever you decide to live.",
            photoResId = R.drawable.list_image_3
        ),
        NewsData(
            title = "New students can get a phone on us",
            content = "New students can take advantage of our new student program with up to \$800.00 off a phone.",
            photoResId = R.drawable.list_image_4
        )
    )
}

data class NewsData(
    val title: String,
    val content: String,
    @DrawableRes val photoResId: Int
)