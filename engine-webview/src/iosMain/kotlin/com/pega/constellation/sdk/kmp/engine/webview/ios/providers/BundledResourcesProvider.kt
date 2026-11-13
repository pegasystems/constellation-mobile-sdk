package com.pega.constellation.sdk.kmp.engine.webview.ios.providers

import com.pega.constellation.sdk.kmp.engine_webview.generated.resources.Res
import platform.Foundation.NSData
import platform.Foundation.NSHTTPURLResponse
import platform.Foundation.NSURL
import platform.Foundation.NSURLRequest
import platform.Foundation.NSURLResponse
import platform.Foundation.dataWithContentsOfURL

class BundledResourcesProvider : BaseAssetsProvider(
    pathMarker = "/constellation-mobile-sdk-assets/",
    tag = "BundledResourcesProvider"
) {
    override fun shouldHandle(request: NSURLRequest): Boolean {
        return request.URL?.isSdkAssetAlias() == true || super.shouldHandle(request)
    }

    override suspend fun performRequest(request: NSURLRequest): Pair<NSData, NSURLResponse> {
        val result = super.performRequest(request)
        if (request.URL?.isSdkAssetAlias() != true) {
            return result
        }
        val response = result.second as NSHTTPURLResponse
        return result.first to NSHTTPURLResponse(
            request.URL!!,
            response.statusCode,
            null,
            response.allHeaderFields + ("Access-Control-Allow-Origin" to "*")
        )
    }

    override fun provideData(url: NSURL): NSData {
        val path = extractResourcePath(url)
        val resUri = Res.getUri("files/$path")
        return NSData.dataWithContentsOfURL(NSURL(string = resUri)) ?: throw LocalProviderError.FileNotFound
    }

    private fun extractResourcePath(url: NSURL): String {
        val relativePath = url.relativePath ?: throw LocalProviderError.UnexpectedURL
        val marker = "constellation-mobile-sdk-assets/"
        val index = relativePath.indexOf(marker)
        val path = when {
            url.isSdkAssetAlias() -> relativePath.removePrefix("/")
            index >= 0 -> relativePath.substring(index + marker.length)
            else -> throw LocalProviderError.UnexpectedURL
        }
        if (!path.contains("..")) {
            return path
        }
        throw LocalProviderError.UnexpectedURL
    }

    private fun NSURL.isSdkAssetAlias() = scheme == "https" && host == "constellation-mobile-sdk-assets"
}
