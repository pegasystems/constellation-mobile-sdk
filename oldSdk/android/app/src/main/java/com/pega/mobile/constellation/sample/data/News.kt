package com.pega.mobile.constellation.sample.data

import androidx.annotation.DrawableRes

data class News(
    val title: String,
    val content: String,
    @DrawableRes val photoResId: Int
)
