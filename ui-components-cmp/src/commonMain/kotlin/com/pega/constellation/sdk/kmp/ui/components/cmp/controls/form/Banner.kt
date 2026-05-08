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
import androidx.compose.material3.MaterialTheme
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
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.baseline_warning_48
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.baseline_done_48
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.baseline_flag_48
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.baseline_info_48
import org.jetbrains.compose.resources.DrawableResource
import org.jetbrains.compose.resources.painterResource

@Composable
fun Banner(
    variant: BannerVariant,
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
                .background(color = variant.containerColor())
                .padding(8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(Modifier.padding(8.dp), contentAlignment = Alignment.Center) {
                Icon(
                    painter = painterResource(variant.iconRes),
                    contentDescription = "banner icon",
                    modifier = Modifier.height(24.dp),
                    tint = variant.contentColor()
                )
            }

            Column(Modifier.weight(1f)) {
                messages.forEach {
                    Row {
                        if (messages.size > 1) Text("• ", color = variant.contentColor())
                        Text(text = it, fontSize = 16.sp, color = variant.contentColor())
                    }
                }
            }
            onClose?.let {
                IconButton(onClose) {
                    Icon(
                        painter = painterResource(Res.drawable.baseline_close_48),
                        tint = variant.contentColor(),
                        contentDescription = "close banner",
                        modifier = Modifier.height(24.dp)
                    )
                }
            }
        }
    }
}

@Composable
fun BannerVariant.containerColor(): Color = when (this) {
    BannerVariant.URGENT -> MaterialTheme.colorScheme.error
    BannerVariant.WARNING -> MaterialTheme.colorScheme.tertiaryContainer
    BannerVariant.INFO -> MaterialTheme.colorScheme.secondaryContainer
    BannerVariant.SUCCESS -> MaterialTheme.colorScheme.primaryContainer
}

@Composable
fun BannerVariant.contentColor(): Color = when (this) {
    BannerVariant.URGENT -> MaterialTheme.colorScheme.onError
    BannerVariant.WARNING -> MaterialTheme.colorScheme.onTertiaryContainer
    BannerVariant.INFO -> MaterialTheme.colorScheme.onSecondaryContainer
    BannerVariant.SUCCESS -> MaterialTheme.colorScheme.onPrimaryContainer
}

enum class BannerVariant(val title: String, val iconRes: DrawableResource) {
    URGENT("Error", Res.drawable.baseline_warning_48),
    WARNING("Warning", Res.drawable.baseline_flag_48),
    INFO("Information", Res.drawable.baseline_info_48),
    SUCCESS("Success", Res.drawable.baseline_done_48)
}

@Preview(showBackground = true)
@Composable
fun BannerUrgentPreview() {
    Banner(
        BannerVariant.URGENT,
        listOf(
            "Alert!",
            "Next error which is very very long and 1234567124345",
            "Some error occured."
        )
    )
}

@Preview(showBackground = true)
@Composable
fun BannerWarningPreview() {
    Banner(
        BannerVariant.WARNING,
        listOf("Warning message"),
    )
}

@Preview(showBackground = true)
@Composable
fun BannerInfoPreview() {
    Banner(
        BannerVariant.INFO,
        listOf("Information content")
    )
}

@Preview(showBackground = true)
@Composable
fun BannerSuccessPreview() {
    Banner(
        BannerVariant.SUCCESS,
        listOf("Success!")
    ) {}
}
