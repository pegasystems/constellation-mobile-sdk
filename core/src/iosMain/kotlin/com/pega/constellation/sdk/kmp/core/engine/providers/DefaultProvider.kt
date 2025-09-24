package com.pega.constellation.sdk.kmp.core.engine.providers

import com.pega.constellation.sdk.kmp.core.engine.ResourceProvider
import platform.Foundation.NSData
import platform.Foundation.NSURLRequest
import platform.Foundation.NSURLResponse
import platform.Foundation.NSURLSession
import platform.Foundation.dataTaskWithRequest
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine

class DefaultProvider : ResourceProvider {

    override fun shouldHandle(request: NSURLRequest): Boolean {
        return true
    }

    override suspend fun performRequest(request: NSURLRequest): Pair<NSData, NSURLResponse> {
        println("Sending request to ${request.URL?.absoluteString ?: "nil"} using built-in mechanism.")
        return suspendCoroutine { continuation ->
            NSURLSession.sharedSession.dataTaskWithRequest(request) { data, response, error ->

                when {
                    error != null -> continuation.resumeWithException(Exception(error.localizedDescription))
                    data != null && response != null -> continuation.resume(data to response)
                    else -> continuation.resumeWithException(Exception("Unknown error"))
                }
            }.resume()
        }
    }
}