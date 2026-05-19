package com.pega.constellation.sdk.kmp.samples.basecmpapp.data

import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.PreferenceDataStoreFactory
import androidx.datastore.preferences.core.Preferences
import kotlinx.cinterop.ExperimentalForeignApi
import okio.Path.Companion.toPath
import platform.Foundation.NSDocumentDirectory
import platform.Foundation.NSFileManager
import platform.Foundation.NSUserDomainMask

private var dataStoreInstance: DataStore<Preferences>? = null

@OptIn(ExperimentalForeignApi::class)
actual fun createDataStore(): DataStore<Preferences> {
    return dataStoreInstance ?: PreferenceDataStoreFactory.createWithPath(
        produceFile = {
            val directory = NSFileManager.defaultManager.URLForDirectory(
                directory = NSDocumentDirectory,
                inDomain = NSUserDomainMask,
                appropriateForURL = null,
                create = false,
                error = null
            )
            val directoryPath = requireNotNull(directory?.path) {
                "Unable to resolve documents directory for DataStore creation."
            }
            "$directoryPath/$DATASTORE_FILE_NAME.preferences_pb".toPath()
        }
    ).also { dataStoreInstance = it }
}