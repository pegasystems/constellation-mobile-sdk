package com.pega.constellation.sdk.kmp.engine.webview.android.interceptor

import android.content.Context
import android.net.Uri
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import androidx.webkit.WebViewAssetLoader
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
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
            requestUrl == pegaUrl -> "$ASSETS_URL/scripts/index.html"
            requestUrl.contains(baseUrlWithAssetsPath) ->
                requestUrl.replace(baseUrlWithAssetsPath, ASSETS_URL)
            else -> null
        }
        return url?.let { assetLoader.shouldInterceptRequest(Uri.parse(it)) }
    }

    companion object {
        private const val ASSETS_PATH = "constellation-mobile-sdk-assets"
        private const val COMPOSE_RES =
            "composeResources/constellation_mobile_sdk.engine.webview.generated.resources/files"
        private const val ASSETS_URL =
            "https://appassets.androidplatform.net/$ASSETS_PATH/$COMPOSE_RES"
    }
}
