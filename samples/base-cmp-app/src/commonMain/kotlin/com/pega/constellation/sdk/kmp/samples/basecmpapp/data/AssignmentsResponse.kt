package com.pega.constellation.sdk.kmp.samples.basecmpapp.data

import kotlinx.serialization.Serializable

@Serializable
data class AssignmentsResponse(
    val fetchDateTime: String,
    val pxObjClass: String,
    val resultCount: Int? = null,
    val data: List<Assignment>,
)