package com.pega.constellation.sdk.kmp.core

import kotlinx.serialization.KSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.SerializationException
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.descriptors.buildClassSerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import kotlinx.serialization.json.JsonDecoder
import kotlinx.serialization.json.JsonEncoder
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

/**
 * Represents various actions that can be performed using the Constellation SDK.
 */
@Serializable(with = ConstellationSdkKActionSerializer::class)
sealed class ConstellationSdkAction {

    data class CreateCase(
        val caseClassName: String,
        val startingFields: JsonObject? = null
    ) : ConstellationSdkAction()

    data class OpenAssignment(
        val assignmentId: String
    ) : ConstellationSdkAction()
}


object ConstellationSdkKActionSerializer : KSerializer<ConstellationSdkAction> {
    override val descriptor: SerialDescriptor = buildClassSerialDescriptor("ConstellationSdkAction")

    override fun serialize(encoder: Encoder, value: ConstellationSdkAction) {
        val jsonEncoder = encoder as? JsonEncoder
            ?: throw SerializationException("This class can be serialized only by JSON")

        val jsonObject = when (value) {
            is ConstellationSdkAction.CreateCase -> {
                buildJsonObject {
                    put("actionType", JsonPrimitive("CreateCase"))
                    put("caseClassName", JsonPrimitive(value.caseClassName))
                    value.startingFields?.let { put("startingFields", it) }
                }
            }
            is ConstellationSdkAction.OpenAssignment -> {
                buildJsonObject {
                    put("actionType", JsonPrimitive("OpenAssignment"))
                    put("assignmentId", JsonPrimitive(value.assignmentId))
                }
            }
        }
        jsonEncoder.encodeJsonElement(jsonObject)
    }

    override fun deserialize(decoder: Decoder): ConstellationSdkAction {
        val jsonDecoder = decoder as? JsonDecoder
            ?: throw SerializationException("This class can be deserialized only by JSON")

        val json = jsonDecoder.decodeJsonElement().jsonObject
        val actionType = json["actionType"]?.jsonPrimitive?.content
            ?: throw SerializationException("Missing 'actionType' field")

        return when (actionType) {
            "CreateCase" -> {
                val caseClassName = json["caseClassName"]?.jsonPrimitive?.content
                    ?: throw SerializationException("Missing 'caseClassName'")
                val startingFields = json["startingFields"]?.jsonObject
                ConstellationSdkAction.CreateCase(caseClassName, startingFields)
            }
            "OpenAssignment" -> {
                val assignmentId = json["assignmentId"]?.jsonPrimitive?.content
                    ?: throw SerializationException("Missing 'assignmentId'")
                ConstellationSdkAction.OpenAssignment(assignmentId)
            }
            else -> throw SerializationException("Unknown actionType: $actionType")
        }
    }
}

