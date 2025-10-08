package com.pega.constellation.sdk.kmp.engine.webview.ios.providers

import com.pega.constellation.sdk.kmp.engine_webview.generated.resources.Res
import platform.Foundation.NSData
import platform.Foundation.NSURL
import platform.Foundation.dataWithContentsOfURL

class BundledResourcesProvider : BaseAssetsProvider(
    pathMarker = "/constellation-mobile-sdk-assets/",
    tag = "BundledResourcesProvider"
) {
    override fun provideData(url: NSURL): NSData {
        val path = extractResourcePath(url)
        val resUri = Res.getUri("files/$path")
        return NSData.dataWithContentsOfURL(NSURL(string = resUri)) ?: throw LocalProviderError.FileNotFound
    }

    private fun extractResourcePath(url: NSURL): String {
        val relativePath = url.relativePath ?: throw LocalProviderError.UnexpectedURL
        val marker = "constellation-mobile-sdk-assets/"
        val index = relativePath.indexOf(marker)
        if (index >= 0) {
            val path = relativePath.substring(index + marker.length)
            if (!path.contains("..")) {
                return path
            }
        }
        throw LocalProviderError.UnexpectedURL
    }
}
