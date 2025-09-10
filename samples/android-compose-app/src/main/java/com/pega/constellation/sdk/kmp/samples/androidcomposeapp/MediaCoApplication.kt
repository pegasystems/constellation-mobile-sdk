package com.pega.constellation.sdk.kmp.samples.androidcomposeapp

import android.app.Application
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.auth.AuthManager

class MediaCoApplication : Application() {
    val authManager by lazy { AuthManager(this) }

    companion object {
        val Application.authManager: AuthManager
            get() = (this as MediaCoApplication).authManager
    }
}
