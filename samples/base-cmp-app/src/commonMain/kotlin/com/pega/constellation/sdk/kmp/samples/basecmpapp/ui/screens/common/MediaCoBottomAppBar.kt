package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.common

import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.height
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.Res
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.icon_contact
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.icon_home
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.icon_offers
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.icon_services
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.main.MainTab
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.theme.MediaCoTheme
import org.jetbrains.compose.resources.DrawableResource
import org.jetbrains.compose.resources.painterResource
import org.jetbrains.compose.ui.tooling.preview.Preview

@Composable
fun MediaCoBottomAppBar(
    selected: MainTab = MainTab.Home,
    onNavItemSelected: (MainTab) -> Unit = {}
) {
    NavigationBar(
        containerColor = MaterialTheme.colorScheme.background,
        tonalElevation = 0.dp
    ) {
        NavItem(
            "Home",
            Res.drawable.icon_home,
            selected = selected == MainTab.Home,
            onSelected = { onNavItemSelected(MainTab.Home) }
        )
        NavItem(
            "Services",
            Res.drawable.icon_services,
            selected = selected == MainTab.Services,
            onSelected = { onNavItemSelected(MainTab.Services) }
        )
        NavItem("Offers", Res.drawable.icon_offers)
        NavItem("Contact", Res.drawable.icon_contact)
    }
}

@Composable
fun RowScope.NavItem(
    label: String,
    icon: DrawableResource,
    modifier: Modifier = Modifier,
    selected: Boolean = false,
    onSelected: () -> Unit = { }
) {
    NavigationBarItem(
        selected = selected,
        onClick = onSelected,
        icon = { Icon(painterResource(icon), "home", modifier = modifier.height(24.dp)) },
        label = { Text(label, fontSize = 12.sp) }
    )
}

@Preview(widthDp = 500)
@Composable
fun SampleBottomBarPreview() {
    MediaCoTheme {
        MediaCoBottomAppBar()
    }
}
