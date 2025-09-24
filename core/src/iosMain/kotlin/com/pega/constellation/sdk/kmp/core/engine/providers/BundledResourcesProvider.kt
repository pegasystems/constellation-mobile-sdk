package com.pega.constellation.sdk.kmp.core.engine.providers

import com.pega.constellation.sdk.kmp.core.engine.ResourceProvider
import constellation_mobile_sdk.core.generated.resources.Res
import platform.Foundation.*
import platform.UniformTypeIdentifiers.*

class BundledResourcesProvider : ResourceProvider {

    override fun shouldHandle(request: NSURLRequest): Boolean {
        val path = request.URL?.path ?: return false
        return path.contains("/constellation-mobile-sdk-assets/")
    }

    override suspend fun performRequest(request: NSURLRequest): Pair<NSData, NSURLResponse> {
        val url = request.URL ?: throw LocalProviderError.UnexpectedURL
        
        val data = try {
            data(from = "files/${extractResourcePath(url)}")
        } catch (e: Throwable) {
            println("iosMain :: BundledResourceProvider :: Error while performing local request: $e")
            throw LocalProviderError.FileNotFound
        }

        val response = try {
            createResponse(url)
        } catch (e: Throwable) {
            println("iosMain :: BundledResourceProvider :: Error while creating a response for local request: $e")
            throw LocalProviderError.CannotCreateResponse
        }

        return Pair(data, response)
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

    private fun data(from: String): NSData {
        val resUri = Res.getUri(from)
        return NSData.dataWithContentsOfURL(NSURL(string = resUri)) ?: throw LocalProviderError.FileNotFound
    }

    private fun createResponse(requestURL: NSURL): NSURLResponse {
        val headers = mutableMapOf<String, String>()
        requestURL.pathExtension?.let { ext ->
            UTType.typeWithFilenameExtension(ext)?.preferredMIMEType?.let { mimeType ->
                headers.put("Content-Type", mimeType)
            }
        }

        try {
            return NSHTTPURLResponse(
                requestURL,
                200,
                null,
                headers.toMap()
            )
        } catch (_: Throwable) {
            // Just in case failable constructor fails (Kotlin does not see it's failable)
            throw LocalProviderError.CannotCreateResponse
        }

    }
}

sealed class LocalProviderError : Throwable() {
    object UnexpectedURL : LocalProviderError()
    object FileNotFound : LocalProviderError()
    object CannotCreateResponse : LocalProviderError()
}
