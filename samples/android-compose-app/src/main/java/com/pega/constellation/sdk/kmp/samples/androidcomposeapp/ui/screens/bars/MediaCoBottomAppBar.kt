package com.pega.constellation.sdk.kmp.samples.androidcomposeapp.ui.screens.bars

import androidx.annotation.DrawableRes
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.height
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.ui.theme.MediaCoTheme
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.R

@Composable
fun MediaCoBottomAppBar() {
    NavigationBar(
        containerColor = MaterialTheme.colorScheme.background,
        tonalElevation = 0.dp
    ) {
        NavItem("Home", R.drawable.icon_home, selected = true)
        NavItem("Services", R.drawable.icon_services)
        NavItem("Offers", R.drawable.icon_offers)
        NavItem("Contact", R.drawable.icon_contact)
    }
}

@Composable
fun RowScope.NavItem(
    label: String,
    @DrawableRes icon: Int,
    modifier: Modifier = Modifier,
    selected: Boolean = false,
) {
    NavigationBarItem(
        selected = selected,
        onClick = {},
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
