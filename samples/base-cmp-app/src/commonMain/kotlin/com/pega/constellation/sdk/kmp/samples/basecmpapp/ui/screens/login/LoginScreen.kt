package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.login

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.Res
import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.logo_mediaco
import com.pega.constellation.sdk.kmp.samples.basecmpapp.MediaCoAppViewModel
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.AuthError
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.Authenticated
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.Authenticating
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.TokenExpired
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.Unauthenticated
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.common.SnackbarHost
import org.jetbrains.compose.resources.painterResource

@Composable
fun LoginScreen(appViewModel: MediaCoAppViewModel) {
    val authState by appViewModel.authState.collectAsState()

    Scaffold(
        snackbarHost = { SnackbarHost(appViewModel) }
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .padding(paddingValues)
                .padding(48.dp)
                .fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Image(
                painterResource(Res.drawable.logo_mediaco),
                contentDescription = "MediaCo logo",
                contentScale = ContentScale.FillHeight,
                modifier = Modifier.height(48.dp)
            )

            Spacer(Modifier.padding(64.dp))
            Text("Please log in to continue.", style = MaterialTheme.typography.bodyMedium)
            Spacer(Modifier.padding(8.dp))

            Button(
                onClick = { appViewModel.authenticate() },
                modifier = Modifier.fillMaxWidth().padding(horizontal = 32.dp),
                content = {
                    when (authState) {
                        Unauthenticated -> Text("Login")
                        Authenticated -> Text("Proceeding...")
                        Authenticating -> Text("Authenticating...")
                        TokenExpired, is AuthError -> Text("Log in again")
                    }
                }
            )
        }
    }
}
