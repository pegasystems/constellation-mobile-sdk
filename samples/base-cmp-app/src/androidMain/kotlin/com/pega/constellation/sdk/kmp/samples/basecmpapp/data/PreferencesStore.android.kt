package com.pega.constellation.sdk.kmp.samples.basecmpapp.data

import androidx.datastore.preferences.core.Preferences
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.datastore.preferences.preferencesDataStoreFile
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.AppContext

actual fun createDataStore(): DataStore<Preferences> {
    return PreferenceDataStoreFactory.create(
        produceFile = { AppContext.get().preferencesDataStoreFile(DATASTORE_FILE_NAME) }
    )
}