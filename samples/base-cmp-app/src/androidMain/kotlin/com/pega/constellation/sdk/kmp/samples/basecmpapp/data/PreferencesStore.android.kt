package com.pega.constellation.sdk.kmp.samples.basecmpapp.data

import android.content.Context
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.preferencesDataStore
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.AppContext

private val Context.dataStore by preferencesDataStore(name = DATASTORE_FILE_NAME)
actual fun createDataStore(): DataStore<Preferences> = AppContext.get().dataStore