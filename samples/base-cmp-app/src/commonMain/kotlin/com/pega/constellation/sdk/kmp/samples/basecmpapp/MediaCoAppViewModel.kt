package com.pega.constellation.sdk.kmp.samples.basecmpapp

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthManager

class MediaCoAppViewModel(private val authManager: AuthManager) : ViewModel() {
    val authState = authManager.authState
    var snackbarMessages by mutableStateOf(emptyList<String>())

    fun authenticate() {
        authManager.authenticate()
    }

    fun showSnackbar(message: String) {
        snackbarMessages += message
    }

    fun removeSnackbar(message: String) {
        snackbarMessages -= message
    }

    companion object {
        val Factory = viewModelFactory {
            initializer { MediaCoAppViewModel(Injector.authManager) }
        }
    }
}