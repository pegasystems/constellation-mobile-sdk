package com.pega.constellation.sdk.kmp.engine.webview.ios.providers

import com.pega.constellation.sdk.kmp.engine.webview.ios.ResourceProvider
import platform.Foundation.NSData
import platform.Foundation.NSURL
import platform.Foundation.NSURLRequest
import platform.Foundation.NSURLResponse
import platform.Foundation.NSURLSession
import platform.Foundation.NSURLSessionConfiguration
import platform.Foundation.dataTaskWithRequest
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine

class NetworkProvider(
    private val ignoredBaseURL: NSURL
) : ResourceProvider {

    private val session = NSURLSession.sessionWithConfiguration(NSURLSessionConfiguration.ephemeralSessionConfiguration())

    override fun shouldHandle(request: NSURLRequest): Boolean {
        val reqUrl = request.URL?.absoluteString ?: ""
        val ignored = ignoredBaseURL.absoluteString ?: ""
        return !reqUrl.startsWith(ignored)
    }

    override suspend fun performRequest(request: NSURLRequest): Pair<NSData, NSURLResponse> {
        return suspendCoroutine { continuation ->
            session.dataTaskWithRequest(request) { data, response, error ->
                when {
                    error != null -> continuation.resumeWithException(Exception(error.localizedDescription))
                    data != null && response != null -> continuation.resume(data to response)
                    else -> continuation.resumeWithException(Exception("Unknown error"))
                }
            }.resume()
        }
    }
}