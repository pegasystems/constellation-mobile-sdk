package com.pega.constellation.sdk.kmp.engine.webview.ios.providers

import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.engine.webview.ios.ResourceProvider
import platform.Foundation.NSData
import platform.Foundation.NSURLRequest
import platform.Foundation.NSURLResponse
import platform.Foundation.NSURL
import platform.Foundation.NSHTTPURLResponse
import platform.UniformTypeIdentifiers.UTType

abstract class BaseAssetsProvider(
    private val pathMarker: String,
    private val tag: String
) : ResourceProvider {

    override fun shouldHandle(request: NSURLRequest): Boolean {
        val path = request.URL?.path ?: return false
        return path.contains(pathMarker)
    }

    override suspend fun performRequest(request: NSURLRequest): Pair<NSData, NSURLResponse> {
        val url = request.URL ?: throw LocalProviderError.UnexpectedURL

        val data = try {
            provideData(url)
        } catch (e: Throwable) {
            Log.e(tag, "Error while performing local request.", e)
            throw LocalProviderError.FileNotFound
        }

        val response = try {
            createResponse(url)
        } catch (e: Throwable) {
            Log.e(tag, "Error while creating a response for local request.", e)
            throw LocalProviderError.CannotCreateResponse
        }

        return Pair(data, response)
    }

    protected abstract fun provideData(url: NSURL): NSData

    protected fun createResponse(requestURL: NSURL): NSURLResponse {
        val headers = mutableMapOf<String, String>()
        requestURL.pathExtension?.let { ext ->
            UTType.typeWithFilenameExtension(ext)?.preferredMIMEType?.let { mimeType ->
                headers["Content-Type"] = mimeType
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
            throw LocalProviderError.CannotCreateResponse
        }
    }
}

sealed class LocalProviderError : Throwable() {
    object UnexpectedURL : LocalProviderError()
    object FileNotFound : LocalProviderError()
    object CannotCreateResponse : LocalProviderError()
}