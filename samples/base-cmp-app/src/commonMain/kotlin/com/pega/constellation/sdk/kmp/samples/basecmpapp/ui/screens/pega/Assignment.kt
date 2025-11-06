package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.pega

import kotlinx.serialization.Serializable

@Serializable
data class Assignment(
    val pxObjClass: String,
    val pxProcessName: String,
    val pxRefObjectInsName: String,
    val pxRefObjectKey: String,
    val pxAssignedOperatorID: String,
    val pxTaskLabel: String,
    val pxRefObjectClass: String,
    val pyAssignmentStatus: String,
    val pzInsKey: String,
    val pyLabel: String,
)

@Serializable
data class AssignmentsResponse(
    val fetchDateTime: String,
    val pxObjClass: String,
    val resultCount: Int? = null,
    val data: List<Assignment>,
)