package com.pega.constellation.sdk.kmp.samples.androidcomposeapp.data

import androidx.annotation.DrawableRes

data class News(
    val title: String,
    val content: String,
    @DrawableRes val photoResId: Int
)
