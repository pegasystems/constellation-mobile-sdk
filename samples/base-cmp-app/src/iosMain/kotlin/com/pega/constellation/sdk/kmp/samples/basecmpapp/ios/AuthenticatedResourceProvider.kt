package com.pega.constellation.sdk.kmp.samples.basecmpapp.ios

import com.pega.constellation.sdk.kmp.engine.webview.ios.ResourceProvider
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthManager
import platform.Foundation.NSHTTPURLResponse
import platform.Foundation.NSMutableURLRequest
import platform.Foundation.NSURLRequest
import platform.Foundation.NSURLResponse
import platform.Foundation.NSURLSession
import platform.Foundation.dataTaskWithRequest
import platform.Foundation.setValue
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine

class AuthenticatedResourceProvider(val authManager: AuthManager) : ResourceProvider {
    override fun shouldHandle(request: NSURLRequest) = true

    override suspend fun performRequest(request: NSURLRequest) =
        performNetworkRequest(
            authManager.getAccessToken()
                ?.let { request.authorizedRequest(it) }
                ?: request
        )

    private suspend fun performNetworkRequest(request: NSURLRequest) =
        suspendCoroutine { continuation ->
            NSURLSession.sharedSession.dataTaskWithRequest(request) { data, response, error ->
                if (response.isUnauthorized()) {
                    authManager.onTokenExpired()
                }

                when {
                    error != null -> continuation.resumeWithException(Exception(error.localizedDescription))
                    data != null && response != null -> continuation.resume(data to response)
                    else -> continuation.resumeWithException(Exception("Unknown error"))
                }
            }.resume()
        }

    private fun NSURLResponse?.isUnauthorized(): Boolean {
        return (this as? NSHTTPURLResponse)?.statusCode?.toInt() == 401
    }

    fun NSURLRequest.authorizedRequest(token: String) = (this.mutableCopy() as NSMutableURLRequest)
        .apply { setValue("Bearer $token", forHTTPHeaderField = "Authorization") }
}