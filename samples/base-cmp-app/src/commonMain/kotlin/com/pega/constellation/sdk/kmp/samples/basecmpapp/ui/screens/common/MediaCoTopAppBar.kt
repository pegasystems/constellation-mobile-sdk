package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.common

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Contrast
import androidx.compose.material.icons.filled.DarkMode
import androidx.compose.material.icons.filled.LightMode
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults.topAppBarColors
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.ColorFilter
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.Res
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.icon_profile
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.logo_mediaco
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.theme.MediaCoTheme
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.LocalIsDarkTheme
import kotlinx.coroutines.launch
import org.jetbrains.compose.resources.painterResource

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MediaCoTopAppBar(
    modifier: Modifier = Modifier,
    onThemeSelected: suspend (Boolean?) -> Unit = {}
) {
    val isDarkTheme = LocalIsDarkTheme.current
    val themeIcon = if (isDarkTheme) Icons.Filled.DarkMode else Icons.Filled.LightMode
    val themeIconDescription = if (isDarkTheme) "Dark mode" else "Light mode"
    var showThemeMenu by remember { mutableStateOf(false) }
    val coroutineScope = rememberCoroutineScope()

    TopAppBar(
        title = {
            Box(modifier = Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) {
                Image(
                    painterResource(Res.drawable.logo_mediaco),
                    "MediaCo logo",
                    modifier = modifier.height(24.dp),
                    colorFilter = ColorFilter.tint(MaterialTheme.colorScheme.onBackground)
                )
            }
        },
        navigationIcon = {
            Box {
                IconButton(onClick = { showThemeMenu = true }) {
                    Icon(
                        imageVector = themeIcon,
                        contentDescription = themeIconDescription
                    )
                }
                DropdownMenu(
                    expanded = showThemeMenu,
                    onDismissRequest = { showThemeMenu = false }
                ) {
                    DropdownMenuItem(
                        leadingIcon = {
                            Icon(
                                Icons.Filled.LightMode,
                                contentDescription = "Light mode"
                            )
                        },
                        text = { Text("Light") },
                        onClick = {
                            showThemeMenu = false
                            coroutineScope.launch { onThemeSelected(false) }
                        }
                    )
                    DropdownMenuItem(
                        leadingIcon = {
                            Icon(
                                Icons.Filled.DarkMode,
                                contentDescription = "Dark mode"
                            )
                        },
                        text = { Text("Dark") },
                        onClick = {
                            showThemeMenu = false
                            coroutineScope.launch { onThemeSelected(true) }
                        }
                    )
                    DropdownMenuItem(
                        leadingIcon = {
                            Icon(
                                Icons.Filled.Contrast,
                                contentDescription = "System default"
                            )
                        },
                        text = { Text("System") },
                        onClick = {
                            showThemeMenu = false
                            coroutineScope.launch { onThemeSelected(null) }
                        }
                    )
                }
            }
        },
        actions = {
            Icon(
                painterResource(Res.drawable.icon_profile),
                "profile icon",
                modifier = Modifier
                    .padding(12.dp)
                    .height(24.dp)
            )
        },
        colors = topAppBarColors(
            containerColor = MaterialTheme.colorScheme.background,
            titleContentColor = MaterialTheme.colorScheme.primary,
        )
    )
}

@Preview(widthDp = 500)
@Composable
fun MediaCoTopAppBarDarkPreview() {
    MediaCoTheme(isDarkTheme = true) {
        MediaCoTopAppBar()
    }
}

@Preview(widthDp = 500)
@Composable
fun MediaCoTopAppBarLightPreview() {
    MediaCoTheme(isDarkTheme = false) {
        MediaCoTopAppBar()
    }
}
