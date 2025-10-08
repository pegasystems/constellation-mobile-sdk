package com.pega.constellation.sdk.kmp.engine.webview.android.internal

import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import com.pega.constellation.sdk.kmp.engine.webview.android.interceptor.WebViewInterceptor


internal class SdkWebViewClient(
    private val interceptors: List<WebViewInterceptor> = emptyList(),
) : WebViewClient() {
    internal var onPageLoad: () -> Unit = {}

    override fun shouldInterceptRequest(
        view: WebView,
        request: WebResourceRequest
    ) = interceptors.firstNotNullOfOrNull { it.shouldInterceptRequest(view, request) }

    override fun onPageFinished(view: WebView, url: String?) = onPageLoad()

}
