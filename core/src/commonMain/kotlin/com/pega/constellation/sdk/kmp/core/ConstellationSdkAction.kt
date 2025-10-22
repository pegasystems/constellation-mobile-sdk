package com.pega.constellation.sdk.kmp.core

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonObject

/**
 * Represents various actions that can be performed using the Constellation SDK.
 */
@Serializable
sealed class ConstellationSdkAction {

    @Serializable
    @SerialName("CreateCase")
    data class CreateCase(
        val caseClassName: String,
        val startingFields: JsonObject? = null
    ) : ConstellationSdkAction()

    @Serializable
    @SerialName("OpenAssignment")
    data class OpenAssignment(
        val assignmentId: String
    ) : ConstellationSdkAction()
}