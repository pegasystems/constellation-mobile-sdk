package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.pega.constellation.sdk.kmp.samples.basecmpapp.data.News
import com.pega.constellation.sdk.kmp.samples.basecmpapp.data.NewsRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class HomeViewModel(
    newsRepository: NewsRepository
) : ViewModel() {
    val news: StateFlow<List<News>> = MutableStateFlow(newsRepository.fetchNews())

    companion object {
        val Factory = viewModelFactory {
            initializer { HomeViewModel(NewsRepository()) }
        }
    }
}
