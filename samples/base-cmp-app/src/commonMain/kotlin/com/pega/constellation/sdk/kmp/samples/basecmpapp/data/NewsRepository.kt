package com.pega.constellation.sdk.kmp.samples.basecmpapp.data

import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.Res
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.list_image_1
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.list_image_2
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.list_image_3
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.list_image_4

class NewsRepository {
    fun fetchNews() =
        listOf(
            News(
                title = "5G is here! Free now!",
                content = "Our 5G network will enable you to stay connected anywhere, anytime.",
                photoRes = Res.drawable.list_image_1
            ),
            News(
                title = "Blazing fast internet",
                content = "Our industry leading internet plans will give you blazing fast speeds for all of your needs.",
                photoRes = Res.drawable.list_image_2
            ),
            News(
                title = "We’ve got you covered",
                content = "MediCo network will have you connected wherever you decide to live.",
                photoRes = Res.drawable.list_image_3
            ),
            News(
                title = "New students can get a phone on us",
                content = "New students can take advantage of our new student program with up to \$800.00 off a phone.",
                photoRes = Res.drawable.list_image_4
            )
        )
}
