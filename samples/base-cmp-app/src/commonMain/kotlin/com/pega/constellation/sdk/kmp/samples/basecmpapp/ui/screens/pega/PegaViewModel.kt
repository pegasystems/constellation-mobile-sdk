package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.pega

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.api.ComponentManager
import com.pega.constellation.sdk.kmp.samples.basecmpapp.Injector
import com.pega.constellation.sdk.kmp.samples.basecmpapp.SDKConfig
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthManager
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.components.CustomComponents.CustomDefinitions
import io.ktor.client.HttpClient
import io.ktor.client.request.header
import io.ktor.client.request.post
import io.ktor.client.statement.HttpResponse
import io.ktor.client.statement.bodyAsText
import io.ktor.http.HttpHeaders
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State as SdkState

class PegaViewModel(
    private val authManager: AuthManager,
    private val sdk: ConstellationSdk,
    private val caseClassName: String,
) : ViewModel() {

    var dismissed by mutableStateOf(false)
    val sdkState: StateFlow<SdkState> = sdk.state

    private val _assignments = MutableStateFlow<List<Assignment>>(emptyList())
    val assignments: StateFlow<List<Assignment>> = _assignments

    fun loadAssignments(accessToken: String) {
        viewModelScope.launch {
            if (accessToken.isNotEmpty()) {
                _assignments.value = fetchAssignments(accessToken)
            }
        }
    }

    fun createCase(onFailure: (String) -> Unit) {
        dismissed = false
        authManager.authenticate(
            onSuccess = { sdk.createCase(caseClassName) },
            onFailure = onFailure
        )
    }

    fun openAssignment(assignmentID: String, onFailure: (String) -> Unit) {
        dismissed = false
        authManager.authenticate(
            onSuccess = { sdk.openAssignment(assignmentID) },
            onFailure = onFailure
        )
    }

    private suspend fun fetchAssignments(accessToken: String): List<Assignment> = withContext(Dispatchers.Default) {
        try {
            val client = HttpClient()
            val response: HttpResponse =
                client.post("${authManager.config.pegaUrl}/api/application/v2/data_views/D_pyMyWorkList") {
                    header(HttpHeaders.Authorization, "Bearer $accessToken")
                }
            val lenientJson = Json {
                ignoreUnknownKeys = true
            }
            val assignmentsResponse =
                lenientJson.decodeFromString<AssignmentsResponse>(response.bodyAsText())
            assignmentsResponse.data
        } catch (e: Exception) {
            Log.e("PegaViewModel", "Failed to fetch assignments: ${e.message}")
            emptyList()
        }
    }

    companion object {
        val Factory = viewModelFactory {
            initializer {
                PegaViewModel(
                    authManager = Injector.authManager,
                    sdk = ConstellationSdk.create(buildConfig(), Injector.engine),
                    caseClassName = SDKConfig.PEGA_CASE_CLASS_NAME
                )
            }
        }

        private fun buildConfig() = ConstellationSdkConfig(
            pegaUrl = SDKConfig.PEGA_URL,
            pegaVersion = SDKConfig.PEGA_VERSION,
            componentManager = ComponentManager.create(CustomDefinitions),
            debuggable = true
        )

    }
}
