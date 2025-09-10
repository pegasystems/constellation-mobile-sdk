package com.pega.constellation.sdk.kmp.samples.androidcomposeapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.MediaCoApplication.Companion.authManager
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.ui.screens.home.HomeScreen
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.ui.theme.MediaCoTheme

class MediaCoActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setupAuth()
        setContent {
            MediaCoTheme {
                HomeScreen()
            }
        }
    }

    private fun setupAuth() {
        application.authManager.register(this@MediaCoActivity)
    }

    override fun onDestroy() {
        super.onDestroy()
        application.authManager.dispose()
    }
}
