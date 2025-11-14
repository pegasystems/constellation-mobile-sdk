package com.pega.constellation.sdk.kmp.samples.basecmpapp.data

import kotlinx.serialization.Serializable

@Serializable
data class Assignment(
    val pxAssignedOperatorID: String,
    val pxObjClass: String,
    val pxProcessName: String,
    val pxRefObjectClass: String,
    val pxRefObjectInsName: String,
    val pxRefObjectKey: String,
    val pxTaskLabel: String,
    val pxUrgencyAssign: Int,
    val pyAssignmentStatus: String,
    val pyLabel: String,
    val pzInsKey: String,
)