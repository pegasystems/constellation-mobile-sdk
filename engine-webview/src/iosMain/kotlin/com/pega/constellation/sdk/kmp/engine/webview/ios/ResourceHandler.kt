package com.pega.constellation.sdk.kmp.engine.webview.ios

import com.pega.constellation.sdk.kmp.core.Log
import kotlinx.cinterop.ObjCSignatureOverride
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import platform.Foundation.NSData
import platform.Foundation.NSError
import platform.Foundation.NSLocalizedDescriptionKey
import platform.Foundation.NSURLRequest
import platform.Foundation.NSURLResponse
import platform.WebKit.WKURLSchemeHandlerProtocol
import platform.WebKit.WKURLSchemeTaskProtocol
import platform.WebKit.WKWebView
import platform.darwin.NSObject

private const val TAG = "ResourceHandler"

interface ResourceHandlerDelegate {
    suspend fun performRequest(request: NSURLRequest): Pair<NSData, NSURLResponse>
}

class ResourceHandler(
    val mainScope: () -> CoroutineScope
) : NSObject(), WKURLSchemeHandlerProtocol {
    lateinit var delegate: ResourceHandlerDelegate
    private val tasks = mutableMapOf<NSURLRequest, Job>()

    private suspend fun send(request: NSURLRequest): Pair<NSData, NSURLResponse> {
        return delegate.performRequest(request)
    }

    @ObjCSignatureOverride
    override fun webView(
        webView: WKWebView,
        startURLSchemeTask: WKURLSchemeTaskProtocol
    ) {
        mainScope().launch {
            try {
                Log.i(TAG, "Starting WKURLScheme task. <${startURLSchemeTask.request.URL}>")
                val (data, response) = send(startURLSchemeTask.request)
                if (!isActive) {
                    Log.i(TAG, "WKURLScheme task cancelled. <${startURLSchemeTask.request.URL}>")
                    return@launch
                }
                Log.i(TAG, "WKURLScheme task is finished. <${startURLSchemeTask.request.URL}>")
                tasks.remove(startURLSchemeTask.request)
                startURLSchemeTask.didReceiveResponse(response)
                startURLSchemeTask.didReceiveData(data)
                startURLSchemeTask.didFinish()
            } catch (e: Throwable) {
                if (!isActive) {
                    Log.i(TAG, "WKURLScheme task cancelled. <${startURLSchemeTask.request.URL}> error=${e.message}")
                    return@launch
                }
                Log.w(TAG, "WKURLScheme task failed. <${startURLSchemeTask.request.URL}> error=${e.message}")
                startURLSchemeTask.didFailWithError(e.toNSError())
            }
        }.let { job ->
            tasks[startURLSchemeTask.request] = job
        }
    }

    @ObjCSignatureOverride
    override fun webView(
        webView: WKWebView,
        stopURLSchemeTask: WKURLSchemeTaskProtocol
    ) {
        Log.i(TAG, "Stopping WKURLScheme task. <${stopURLSchemeTask.request.URL}>")
        tasks[stopURLSchemeTask.request]?.cancel()
        tasks.remove(stopURLSchemeTask.request)
    }
}
private fun Throwable.toNSError(): NSError {
    val domain = "ResourceHandlerError"
    val userInfo = mapOf(
        NSLocalizedDescriptionKey to (this.message ?: this.toString())
    )
    return NSError(domain, 0, userInfo.toMap())
}