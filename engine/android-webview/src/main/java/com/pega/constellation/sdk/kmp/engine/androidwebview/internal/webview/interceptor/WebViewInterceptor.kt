package com.pega.constellation.sdk.kmp.engine.androidwebview.internal.webview.interceptor

import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView

internal interface WebViewInterceptor {
    fun shouldInterceptRequest(view: WebView, request: WebResourceRequest): WebResourceResponse?
}
