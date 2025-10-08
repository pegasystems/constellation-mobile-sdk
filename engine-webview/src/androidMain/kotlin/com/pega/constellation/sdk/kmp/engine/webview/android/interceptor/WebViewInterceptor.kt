package com.pega.constellation.sdk.kmp.engine.webview.android.interceptor

import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView

internal interface WebViewInterceptor {
    fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse?
}
