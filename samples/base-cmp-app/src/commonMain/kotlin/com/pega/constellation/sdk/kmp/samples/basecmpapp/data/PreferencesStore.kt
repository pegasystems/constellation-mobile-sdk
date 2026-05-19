package com.pega.constellation.sdk.kmp.samples.basecmpapp.data

import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map


expect fun createDataStore(): DataStore<Preferences>

const val DATASTORE_FILE_NAME = "dataStore"

class PreferencesStore(private val dataStore: DataStore<Preferences>) {
    companion object {
        val IS_DARK_MODE = booleanPreferencesKey("is_dark_mode")
    }

    val isDarkThemeFlow: Flow<Boolean?>
        get() = dataStore.data.map { preferences -> preferences[IS_DARK_MODE] }

    suspend fun updateTheme(isDark: Boolean?) {
        dataStore.edit { preferences ->
            if (isDark != null) {
                preferences[IS_DARK_MODE] = isDark
            } else {
                preferences.remove(IS_DARK_MODE)
            }
        }
    }
}
