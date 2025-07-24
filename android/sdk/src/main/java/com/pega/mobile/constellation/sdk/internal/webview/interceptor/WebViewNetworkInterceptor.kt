package com.pega.mobile.constellation.sdk.internal.webview.interceptor

import android.util.Log
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import androidx.lifecycle.AtomicReference
import com.pega.mobile.constellation.sdk.ConstellationSdkConfig
import okhttp3.Headers.Companion.toHeaders
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response
import java.io.ByteArrayInputStream

internal class WebViewNetworkInterceptor(private val config: ConstellationSdkConfig) :
    WebViewInterceptor {
    private var requestBody = AtomicReference<String?>(null)

    override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest) =
        runCatching {
            if (request.url.toString().startsWith(config.pegaUrl)) {
                config.okHttpClient.execute(request).toWebResourceResponse()
            } else {
                config.nonDxOkHttpClient.execute(request).toWebResourceResponse()
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
                emptyMap(),
                ByteArrayInputStream(message.toByteArray())
            )
        }

    fun setRequestBody(body: String) {
        requestBody.set(body)
    }

    private fun OkHttpClient.execute(request: WebResourceRequest): Response {
        val body = requestBody.takeIf { request.method in listOf("POST", "PATCH") }
            ?.getAndSet(null)
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

    companion object {
        private const val TAG = "SdkWebViewNetworkInterceptor"
        val DISALLOWED_HEADERS_LIST = listOf(
            "Referer",
            "Origin",
            "X-Requested-With",
            "User-Agent",
            "sec-ch-ua*"
        ).map { it.lowercase() }
    }
}
