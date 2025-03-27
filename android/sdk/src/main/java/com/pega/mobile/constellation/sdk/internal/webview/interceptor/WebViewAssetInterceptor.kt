package com.pega.mobile.constellation.sdk.internal.webview.interceptor

import android.content.Context
import android.net.Uri
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import androidx.webkit.WebViewAssetLoader
import com.pega.mobile.constellation.sdk.ConstellationSdkConfig

internal class WebViewAssetInterceptor(
    context: Context,
    config: ConstellationSdkConfig
) : WebViewInterceptor {
    private val pegaUrl = config.pegaUrl
    private val assetLoader = WebViewAssetLoader.Builder()
        .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(context))
        .build()

    override fun shouldInterceptRequest(
        view: WebView,
        request: WebResourceRequest
    ): WebResourceResponse? {
        val requestUrl = request.url.toString()
        val url = when {
            requestUrl == pegaUrl -> ASSETS_URL + INDEX_HTML_PATH
            requestUrl.contains("$pegaUrl/assets/") -> requestUrl.replace(pegaUrl, ASSETS_URL)
            else -> null
        }
        return url?.let { assetLoader.shouldInterceptRequest(Uri.parse(it)) }
    }

    companion object {
        private const val ASSETS_URL = "https://appassets.androidplatform.net"
        private const val INDEX_HTML_PATH = "/assets/scripts/index.html"
    }
}