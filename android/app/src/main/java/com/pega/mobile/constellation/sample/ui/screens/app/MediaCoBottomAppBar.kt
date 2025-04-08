package com.pega.mobile.constellation.sample.ui.screens.app

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
import com.pega.mobile.constellation.sample.R
import com.pega.mobile.constellation.sample.ui.theme.MediaCoTheme

@Composable
fun MediaCoBottomAppBar() {
    NavigationBar(
        containerColor = MaterialTheme.colorScheme.background,
        tonalElevation = 0.dp
    ) {
        NavItem("Home", R.drawable.home_icon, selected = true)
        NavItem("Services", R.drawable.services_icon)
        NavItem("Offers", R.drawable.offers_icon)
        NavItem("Contact", R.drawable.contact_icon)
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