package com.pega.mobile.constellation.sdk.internal.webview.interceptor

import android.content.Context
import android.net.Uri
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import androidx.webkit.WebViewAssetLoader
import com.pega.mobile.constellation.sdk.ConstellationSdkConfig
import java.net.URL

internal class WebViewAssetInterceptor(
    context: Context,
    config: ConstellationSdkConfig
) : WebViewInterceptor {
    private val pegaUrl = config.pegaUrl
    private val baseUrl = URL(pegaUrl).run { "${protocol}://${host}" }
    private val baseUrlWithAssetsPath = "$baseUrl/$ASSETS_PATH"
    private val assetLoader = WebViewAssetLoader.Builder()
        .addPathHandler("/$ASSETS_PATH/", WebViewAssetLoader.AssetsPathHandler(context))
        .build()

    override fun shouldInterceptRequest(
        view: WebView,
        request: WebResourceRequest
    ): WebResourceResponse? {
        val requestUrl = request.url.toString()
        val url = when {
            requestUrl == pegaUrl -> "$ASSETS_URL/$INDEX_HTML_PATH"
            requestUrl.contains(baseUrlWithAssetsPath) -> requestUrl.replace(baseUrl, ASSETS_URL)
            else -> null
        }
        return url?.let { assetLoader.shouldInterceptRequest(Uri.parse(it)) }
    }

    companion object {
        private const val ASSETS_URL = "https://appassets.androidplatform.net"
        private const val ASSETS_PATH = "constellation-mobile-sdk-assets"
        private const val INDEX_HTML_PATH = "$ASSETS_PATH/scripts/index.html"

    }
}