package com.pega.constellation.sdk.kmp.samples.basecmpapp.data

import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.datastore.preferences.core.Preferences
import okio.Path.Companion.toPath

private val dataStoreLock = Any()

@Volatile
private var dataStoreInstance: DataStore<Preferences>? = null

actual fun createDataStore(): DataStore<Preferences> {
    return dataStoreInstance ?: synchronized(dataStoreLock) {
        dataStoreInstance ?: PreferenceDataStoreFactory.createWithPath(
            produceFile = {
                val path = System.getProperty("user.home") + "/$DATASTORE_FILE_NAME.preferences_pb"
                path.toPath()
            }
        ).also { dataStoreInstance = it }
    }
}
