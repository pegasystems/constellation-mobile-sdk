package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.Res
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.baseline_close_48
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.baseline_done_48
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.baseline_flag_48
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.baseline_info_48
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.baseline_warning_48
import org.jetbrains.compose.resources.DrawableResource
import org.jetbrains.compose.resources.painterResource

data class BannerTheme(
    val warningBackground: Color,
    val infoBackground: Color,
    val successBackground: Color,
    val urgentBackground: Color,
    val warningContent: Color,
    val infoContent: Color,
    val successContent: Color,
    val urgentContent: Color
)

@Composable
fun Banner(
    variant: BannerVariant,
    messages: List<String>,
    bannerTheme: BannerTheme,
    modifier: Modifier = Modifier,
    onClose: (() -> Unit)? = null
) {
    val backgroundColor = when (variant) {
        BannerVariant.WARNING -> bannerTheme.warningBackground
        BannerVariant.INFO -> bannerTheme.infoBackground
        BannerVariant.SUCCESS -> bannerTheme.successBackground
        BannerVariant.URGENT -> bannerTheme.urgentBackground
    }
    val contentColor = when (variant) {
        BannerVariant.WARNING -> bannerTheme.warningContent
        BannerVariant.INFO -> bannerTheme.infoContent
        BannerVariant.SUCCESS -> bannerTheme.successContent
        BannerVariant.URGENT -> bannerTheme.urgentContent
    }

    Card(
        modifier = modifier.padding(4.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 8.dp)
    ) {
        Row(
            modifier = Modifier
                .background(color = backgroundColor)
                .padding(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(Modifier.padding(8.dp), contentAlignment = Alignment.Center) {
                Icon(
                    painter = painterResource(variant.iconRes),
                    contentDescription = "banner icon",
                    modifier = Modifier.height(24.dp),
                    tint = contentColor
                )
            }

            Column(Modifier.weight(1f)) {
                messages.forEach {
                    Row {
                        if (messages.size > 1) Text("• ", color = contentColor)
                        Text(text = it, fontSize = 16.sp, color = contentColor)
                    }
                }
            }
            onClose?.let {
                IconButton(onClose) {
                    Icon(
                        painter = painterResource(Res.drawable.baseline_close_48),
                        tint = contentColor,
                        contentDescription = "close banner",
                        modifier = Modifier.height(24.dp)
                    )
                }
            }
        }
    }
}

enum class BannerVariant(val title: String, val iconRes: DrawableResource) {
    URGENT("Error", Res.drawable.baseline_warning_48),
    WARNING("Warning", Res.drawable.baseline_flag_48),
    INFO("Information", Res.drawable.baseline_info_48),
    SUCCESS("Success", Res.drawable.baseline_done_48)
}

val LightPreview = BannerTheme(
    warningBackground = Color(0xFFFD6000),
    infoBackground = Color(0xFF8397AB),
    successBackground = Color(0xFF20AA50),
    urgentBackground = Color(0xFFB3261E),
    warningContent = Color.White,
    infoContent = Color.White,
    successContent = Color.White,
    urgentContent = Color.White,
)
val DarkPreview = BannerTheme(
    warningBackground = Color(0xFFFFB77A),
    infoBackground = Color(0xFFB0C4D8),
    successBackground = Color(0xFF5DD98A),
    urgentBackground = Color(0xFFF2B8B5),
    warningContent = Color(0xFF4A1800),
    infoContent = Color(0xFF1A2733),
    successContent = Color(0xFF003916),
    urgentContent = Color(0xFF690005),
)

@Preview(showBackground = true)
@Composable
fun BannerUrgentPreview() {
    Banner(
        BannerVariant.URGENT,
        listOf(
            "Alert!",
            "Next error which is very very long and 1234567124345",
            "Some error occured."
        ),
        LightPreview
    )
}

@Preview(showBackground = true)
@Composable
fun BannerWarningPreview() {
    Banner(
        BannerVariant.WARNING,
        listOf("Warning message"),
        LightPreview,
    )
}

@Preview(showBackground = true)
@Composable
fun BannerInfoPreview() {
    Banner(
        BannerVariant.INFO,
        listOf("Information content"),
        LightPreview,
    )
}

@Preview(showBackground = true)
@Composable
fun BannerSuccessPreview() {
    Banner(
        BannerVariant.SUCCESS,
        listOf("Success!"),
        LightPreview,
    ) {}
}

@Preview(showBackground = true, backgroundColor = 0xFF1B1530)
@Composable
fun BannerUrgentPreviewDark() {
    Banner(
        BannerVariant.URGENT,
        listOf(
            "Alert!",
            "Next error which is very very long and 1234567124345",
            "Some error occured."
        ),
        DarkPreview
    )


}

@Preview(showBackground = true, backgroundColor = 0xFF1B1530)
@Composable
fun BannerWarningPreviewDark() {
    Banner(
        BannerVariant.WARNING,
        listOf("Warning message"),
        DarkPreview
    )


}

@Preview(showBackground = true, backgroundColor = 0xFF1B1530)
@Composable
fun BannerInfoPreviewDark() {
    Banner(
        BannerVariant.INFO,
        listOf("Information content"),
        DarkPreview
    )


}

@Preview(showBackground = true, backgroundColor = 0xFF1B1530)
@Composable
fun BannerSuccessPreviewDark() {
    Banner(
        BannerVariant.SUCCESS,
        listOf("Success!"),
        DarkPreview
    ) {}

}