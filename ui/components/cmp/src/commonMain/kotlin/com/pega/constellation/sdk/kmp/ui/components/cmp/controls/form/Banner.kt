package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun Banner(
//    variant: BannerVariant,
    messages: List<String>,
    modifier: Modifier = Modifier,
    onClose: (() -> Unit)? = null
) {
    Card(
        modifier = modifier.padding(4.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
    ) {
        Row(
            modifier = Modifier
//                .background(colorResource(variant.colorRes))
                .padding(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(Modifier.padding(8.dp), contentAlignment = Alignment.Center) {
//                Icon(
//                    painter = painterResource(variant.iconRes),
//                    contentDescription = "banner icon",
//                    modifier = Modifier.height(24.dp),
//                    tint = Color.White
//                )
            }

            Column(Modifier.weight(1f)) {
                messages.forEach {
                    Row {
                        if (messages.size > 1) Text("• ", color = Color.White)
                        Text(text = it, fontSize = 16.sp, color = Color.White)
                    }
                }
            }
            onClose?.let {
                IconButton(onClose) {
//                    Icon(
//                        painter = painterResource(R.drawable.baseline_close_48),
//                        tint = Color.White,
//                        contentDescription = "close banner",
//                        modifier = Modifier.height(24.dp)
//                    )
                }
            }
        }
    }
}

//enum class BannerVariant(val title: String, val colorRes: Int, val iconRes: Int) {
//    URGENT("Error", R.color.banner_error, R.drawable.baseline_warning_48),
//    WARNING("Warning", R.color.banner_warning, R.drawable.baseline_flag_48),
//    INFO("Information", R.color.banner_info, R.drawable.baseline_info_48),
//    SUCCESS("Success", R.color.banner_success, R.drawable.baseline_done_48)
//}
//
//@Preview
//@Composable
//fun BannerUrgentPreview() {
//    Banner(
//        BannerVariant.URGENT,
//        listOf(
//            "Alert!",
//            "Next error which is very very long and 1234567124345",
//            "Some error occured."
//        )
//    )
//}
//
//@Preview
//@Composable
//fun BannerWarningPreview() {
//    Banner(
//        BannerVariant.WARNING,
//        listOf("Warning message"),
//    )
//}
//
//@Preview
//@Composable
//fun BannerInfoPreview() {
//    Banner(
//        BannerVariant.INFO,
//        listOf("Information content")
//    )
//}
//
//@Preview
//@Composable
//fun BannerSuccessPreview() {
//    Banner(
//        BannerVariant.SUCCESS,
//        listOf("Success!")
//    ) {}
//}
