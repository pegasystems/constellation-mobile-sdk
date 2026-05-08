package com.pega.constellation.sdk.kmp.samples.basecmpapp.data

import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences

actual fun createDataStore(): DataStore<Preferences> {
    throw UnsupportedOperationException("DataStore is not supported on JVM")
}
