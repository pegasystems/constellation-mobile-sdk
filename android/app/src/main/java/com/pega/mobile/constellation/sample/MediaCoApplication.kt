package com.pega.mobile.constellation.sample

import android.app.Application
import com.pega.mobile.constellation.sample.auth.AuthManager

class MediaCoApplication : Application() {
    val authManager by lazy { AuthManager(this) }

    companion object {
        val Application.authManager: AuthManager
            get() = (this as MediaCoApplication).authManager
    }
}