/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sample.ui.screens

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.mobile.constellation.sample.ui.theme.SampleSdkTheme
import kotlinx.coroutines.delay

@Composable
fun LoginScreen(onLogin: () -> Unit) {
    Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
        Box(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxSize()
        ) {
            Text(text = "⚡ JS SDK ⚡", fontSize = 30.sp, modifier = Modifier.align(Alignment.Center))
            LoginButton(
                onLogin, modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .padding(bottom = 128.dp)
            )
        }
    }
}

@Composable
fun LoginButton(onLogin: () -> Unit, modifier: Modifier) {
    var enabled by remember { mutableStateOf(true) }

    // TODO temporary solution, button state should be based on AuthResult
    LaunchedEffect(enabled) {
        if (enabled) return@LaunchedEffect
        onLogin()
        delay(2000L)
        enabled = true
    }

    Button(
        modifier = modifier,
        enabled = enabled,
        onClick = { enabled = false }
    ) {
        Text(
            "Login",
            fontSize = 24.sp,
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)
        )
    }
}


@Preview(showBackground = true)
@Composable
fun LoginScreenPreview() {
    SampleSdkTheme {
        LoginScreen(onLogin = {})
    }
}
