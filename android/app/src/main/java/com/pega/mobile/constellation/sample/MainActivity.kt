/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sample

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.pega.mobile.constellation.sample.MediaCoApplication.Companion.authManager
import com.pega.mobile.constellation.sample.ui.screens.home.HomeScreen
import com.pega.mobile.constellation.sample.ui.theme.MediaCoTheme

class MainActivity : ComponentActivity() {
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
        with(application.authManager) {
            if (!isAuthenticated) register(this@MainActivity)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        application.authManager.dispose()
    }
}
