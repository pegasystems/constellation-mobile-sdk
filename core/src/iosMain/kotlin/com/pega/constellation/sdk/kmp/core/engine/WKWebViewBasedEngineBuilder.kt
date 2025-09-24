package com.pega.constellation.sdk.kmp.core.engine

import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngineBuilder
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import kotlinx.cinterop.ExperimentalForeignApi
import platform.Foundation.NSBundle
import platform.Foundation.NSFileManager
import platform.Foundation.NSString
import platform.Foundation.NSUTF8StringEncoding
import platform.Foundation.stringWithContentsOfFile

@Suppress("unused")
class WKWebViewBasedEngineBuilder(
    val customResourceProvider: ResourceProvider
) : ConstellationSdkEngineBuilder
{
    @OptIn(ExperimentalForeignApi::class)
    fun readFileText(path: String): String? {
        return NSString.stringWithContentsOfFile(path, NSUTF8StringEncoding, null)
    }

    @OptIn(ExperimentalForeignApi::class)
    fun listBundleFiles(bundle: NSBundle): List<String>? {
        val resourcePath = bundle.resourcePath ?: return null
        val files = NSFileManager.defaultManager.contentsOfDirectoryAtPath(resourcePath, null)
        return files?.map { it as String }
    }

    override fun build(
        config: ConstellationSdkConfig,
        handler: EngineEventHandler
    ): ConstellationSdkEngine {

        return WKWebViewBasedEngine(config, handler, customResourceProvider)
    }
}
