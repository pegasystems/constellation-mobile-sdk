package com.pega.constellation.sdk.kmp.engine.webview.ios.providers

import com.pega.constellation.sdk.kmp.core.api.ComponentManager
import platform.Foundation.NSData
import platform.Foundation.NSURL
import platform.Foundation.dataWithContentsOfFile

class ComponentAssetsProvider(
    private val componentManager: ComponentManager
) : BaseAssetsProvider(
    pathMarker = "/constellation-mobile-sdk-assets/components/",
    tag = "ComponentAssetsProvider"
) {
    override fun provideData(url: NSURL): NSData {
        val fileName = url.lastPathComponent ?: throw LocalProviderError.FileNotFound

        val componentFile = componentManager.getComponentDefinitions()
            .firstOrNull { it.jsFile?.endsWith(fileName) == true }
            ?.jsFile ?: throw LocalProviderError.FileNotFound

        val filePath = NSURL.URLWithString(componentFile)?.path ?: throw LocalProviderError.FileNotFound
        return NSData.dataWithContentsOfFile(filePath) ?: throw LocalProviderError.FileNotFound
    }
}