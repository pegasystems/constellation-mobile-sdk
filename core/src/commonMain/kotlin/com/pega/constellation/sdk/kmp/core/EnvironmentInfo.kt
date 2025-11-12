package com.pega.constellation.sdk.kmp.core

import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonObject

/**
 * Represents information about the application environment that the user is currently logged into.
 * @property locale: current locale in IETF BCP 47 format, e.g. "en-US"
 * @property timeZone: current time zone in TZ database format, e.g. "America/New_York"
 */
data class EnvironmentInfo(val locale: String, val timeZone: String) {
    companion object {
        fun JsonObject.toEnvironmentInfo() =
            EnvironmentInfo(getString("locale"), getString("timeZone"))
    }
}