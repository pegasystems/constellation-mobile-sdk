package com.pega.constellation.sdk.kmp.samples.basecmpapp.data

import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.samples.basecmpapp.SDKConfig.PEGA_URL
import io.ktor.client.HttpClient
import io.ktor.client.request.post
import io.ktor.client.statement.bodyAsText
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

class AssignmentsRepository(val httpClient: HttpClient) {
    private val json = Json { ignoreUnknownKeys = true }

    suspend fun fetchAssignments(): List<Assignment> = withContext(Dispatchers.Default) {
        runCatching {
            val url = "$PEGA_URL/api/application/v2/data_views/D_pyMyWorkList"
            val response = httpClient.post(url)
            json.decodeFromString<AssignmentsResponse>(response.bodyAsText()).data
        }
            .onFailure { Log.e(TAG, "Failed to fetch assignments: ${it.message}", it) }
            .getOrThrow()
    }

    @Serializable
    private data class AssignmentsResponse(
        val fetchDateTime: String,
        val pxObjClass: String,
        val resultCount: Int? = null,
        val data: List<Assignment>,
    )

    companion object {
        private const val TAG = "AssignmentsRepository"
    }
}