package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.home

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.pega.constellation.sdk.kmp.samples.basecmpapp.Injector
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthManager
import com.pega.constellation.sdk.kmp.samples.basecmpapp.data.News
import com.pega.constellation.sdk.kmp.samples.basecmpapp.data.NewsRepository

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class HomeViewModel(authManager: AuthManager, repository: NewsRepository) : ViewModel() {
    val authState = authManager.authState
    val news: StateFlow<List<News>> = MutableStateFlow(repository.fetchNews())
    var snackbarMessages by mutableStateOf(emptyList<String>())

    companion object {
        val Factory = viewModelFactory {
            initializer {
                HomeViewModel(Injector.authManager, NewsRepository())
            }
        }
    }
}
