package com.pega.constellation.sdk.kmp.samples.desktopcmpapp

import org.publicvalue.multiplatform.oidc.ExperimentalOpenIdConnect
import org.publicvalue.multiplatform.oidc.tokenstore.SettingsStore
import org.publicvalue.multiplatform.oidc.tokenstore.SettingsTokenStore

@OptIn(ExperimentalOpenIdConnect::class)
class JvmTokenStore : SettingsTokenStore(settings = JvmSettingsStore()) {
    // simple in-memory settings store for JVM
    class JvmSettingsStore : SettingsStore {
        private val settings = mutableMapOf("ACCESSTOKEN" to "FAKE")

        override suspend fun get(key: String): String? {
            return settings[key]
        }

        override suspend fun put(key: String, value: String) {
            settings.put(key, value)
        }

        override suspend fun remove(key: String) {
            settings.remove(key)
        }

        override suspend fun clear() {
            settings.clear()
        }

    }
}

