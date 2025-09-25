package com.pega.constellation.sdk.kmp.engine.webview.ios

import com.pega.constellation.sdk.kmp.engine.webview.ios.providers.BundledResourcesProvider
import com.pega.constellation.sdk.kmp.engine.webview.ios.providers.DefaultProvider
import com.pega.constellation.sdk.kmp.engine.webview.ios.providers.NetworkProvider
import platform.Foundation.NSData
import platform.Foundation.NSMutableURLRequest
import platform.Foundation.NSURL
import platform.Foundation.NSURLRequest
import platform.Foundation.NSURLResponse

class ResourceProviderManager (
    baseUrl: String,
    private val customDelegate: ResourceProvider? = null
) : ResourceHandlerDelegate {

    private val networkProvider = NetworkProvider(NSURL(string = baseUrl))
    private val localProvider = BundledResourcesProvider()
    private val defaultProvider = DefaultProvider()

    private fun delegateFor(request: NSURLRequest): ResourceProvider {
        return when {
            localProvider.shouldHandle(request) -> localProvider
            networkProvider.shouldHandle(request) -> networkProvider
            customDelegate?.shouldHandle(request) == true -> customDelegate
            else -> defaultProvider
        }
    }

    override suspend fun performRequest(request: NSURLRequest): Pair<NSData, NSURLResponse> {
        val mutableRequest: NSMutableURLRequest = request as NSMutableURLRequest
        return delegateFor(request).performRequest(
            mutableRequest.removeUnwantedHeaders()
        )
    }
}