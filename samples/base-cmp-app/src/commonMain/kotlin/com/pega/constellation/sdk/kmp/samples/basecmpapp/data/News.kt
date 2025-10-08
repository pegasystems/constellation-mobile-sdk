package com.pega.constellation.sdk.kmp.samples.basecmpapp.data

import org.jetbrains.compose.resources.DrawableResource

data class News(
    val title: String,
    val content: String,
    val photoRes: DrawableResource
)
