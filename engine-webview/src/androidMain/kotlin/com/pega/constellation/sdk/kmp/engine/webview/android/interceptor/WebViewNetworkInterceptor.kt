package com.pega.constellation.sdk.kmp.engine.webview.android.interceptor

import android.util.Log
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import okhttp3.Headers.Companion.toHeaders
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import okhttp3.RequestBody.Companion.toRequestBody
import java.util.concurrent.ConcurrentHashMap

internal class WebViewNetworkInterceptor(
    scope: CoroutineScope,
    private val pegaUrl: String,
    private val okHttpClient: OkHttpClient,
    private val nonDxOkHttpClient: OkHttpClient
) : WebViewInterceptor {
    private val requestBodies = ConcurrentHashMap<String, RequestBodyEntry>()
    private val cleanupJob: Job = scope.launch(Dispatchers.Default) {
        while (isActive) {
            delay(CLEANUP_INTERVAL_MS)
            cleanupExpiredBodies()
        }
    }

    override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest) =
        runCatching {
            if (request.url.toString().startsWith(pegaUrl)) {
                okHttpClient.execute(request).toWebResourceResponse()
            } else {
                nonDxOkHttpClient.execute(request).toWebResourceResponse()
            }
        }.getOrElse {
            val message = it.message.orEmpty()
            Log.e(TAG, "Network error: $message", it)
            // simulating http error to make JS code to throw exception
            WebResourceResponse(
                "text/html",
                "utf-8",
                499,
                "Network error",
                mapOf("Access-Control-Allow-Origin" to "*"), // Allow CORS for dummy response
                null
            )
        }

    fun setRequestBody(requestId: String, body: String) {
        requestBodies[requestId] = RequestBodyEntry(body, System.currentTimeMillis())
    }

    fun close() {
        cleanupJob.cancel()
        requestBodies.clear()
    }

    private fun OkHttpClient.execute(request: WebResourceRequest): Response {
        val requestId = request.requestHeaderValue(REQUEST_BODY_ID_HEADER)
        val body = requestId
            ?.let { requestBodies.remove(it)?.body }
            ?.toRequestBody()
        val filteredHeaders = request.requestHeaders.filterNot {
            isAuthorizationHeaderUndefined(it.key, it.value) || isHeaderDisallowed(it.key)
        }
        val okHttpRequest = Request.Builder()
            .method(request.method, body)
            .url(request.url.toString())
            .headers(filteredHeaders.toHeaders())
            .build()
        return newCall(okHttpRequest).execute()
    }

    private fun Response.toWebResourceResponse() = WebResourceResponse(
        header("content-type"),
        header("content-encoding", "utf-8"),
        code,
        message.ifEmpty { "OK" },
        headers.toMap(),
        body?.byteStream()
    )

    /**
     *  Remove "Authorization" header if necessary due to JS layer unnecessarily appending
     * `undefined` value to it
     */
    private fun isAuthorizationHeaderUndefined(headerKey: String, headerValue: String) =
        headerKey.lowercase() == "authorization" && headerValue.lowercase() == "undefined"

    private fun isHeaderDisallowed(headerKey: String) =
        DISALLOWED_HEADERS_LIST.any {
            if (it.endsWith("*")) {
                headerKey.lowercase().startsWith(it.removeSuffix("*"))
            } else {
                headerKey.lowercase() == it
            }
        }

    private fun WebResourceRequest.requestHeaderValue(headerName: String) =
        requestHeaders.entries.firstOrNull { it.key.equals(headerName, ignoreCase = true) }?.value

    private fun cleanupExpiredBodies() {
        val cutoff = System.currentTimeMillis() - REQUEST_BODY_TTL_MS
        requestBodies.entries.removeIf { it.value.createdAtMillis < cutoff }
    }

    private data class RequestBodyEntry(
        val body: String,
        val createdAtMillis: Long
    )

    companion object {
        private const val TAG = "WebViewNetworkInterceptor"
        private const val REQUEST_BODY_ID_HEADER = "X-Request-Body-Id"
        private const val CLEANUP_INTERVAL_MS = 60_000L
        private const val REQUEST_BODY_TTL_MS = 300_000L
        private val DISALLOWED_HEADERS_LIST = listOf(
            "Referer",
            "Origin",
            "X-Requested-With",
            "User-Agent",
            "sec-ch-ua*",
            REQUEST_BODY_ID_HEADER
        ).map { it.lowercase() }
    }
}
