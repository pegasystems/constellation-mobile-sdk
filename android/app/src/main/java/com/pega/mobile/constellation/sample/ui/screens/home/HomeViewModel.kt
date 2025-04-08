package com.pega.mobile.constellation.sample.ui.screens.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.pega.mobile.constellation.sample.data.News
import com.pega.mobile.constellation.sample.data.NewsRepository
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn

class HomeViewModel(repository: NewsRepository) : ViewModel() {
    val news: StateFlow<List<News>> = repository.fetchNews()
        .stateIn(viewModelScope, SharingStarted.Lazily, emptyList())

    companion object {
        val Factory = viewModelFactory {
            initializer {
                HomeViewModel(NewsRepository())
            }
        }
    }
}