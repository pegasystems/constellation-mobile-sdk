package com.pega.constellation.sdk.kmp.engine.webview.android.interceptor

import android.content.Context
import android.net.Uri
import android.util.Log
import android.webkit.WebResourceRequest
import android.webkit.WebView
import androidx.webkit.WebViewAssetLoader
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import constellation_mobile_sdk.engine.webview.generated.resources.Res
import java.net.URL

internal class WebViewAssetInterceptor(
    context: Context,
    config: ConstellationSdkConfig
) : WebViewInterceptor {
    private val pegaUrl = config.pegaUrl
    private val baseUrl = URL(pegaUrl).run { "${protocol}://${host}" }
    private val assetsUrl = "$baseUrl/$ASSETS_PATH/"

    private val assetLoader = WebViewAssetLoader.Builder()
        .addPathHandler("/$ASSETS_PATH/", WebViewAssetLoader.AssetsPathHandler(context))
        .build()

    override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest) =
        request.toAssetUri()?.let { uri ->
            assetLoader.shouldInterceptRequest(uri)
        }

    private fun WebResourceRequest.toAssetUri(): Uri? {
        val url = url.toString()
        return when {
            // handle base url and load index.html
            url == pegaUrl -> Res.getUri("files/scripts/index.html")
            // handle urls with file:///android_asset/
            url.contains(ANDROID_ASSET_URI) -> url.replaceBefore(ANDROID_ASSET_URI, "")
            // handle urls with constellation-mobile-sdk-assets
            url.contains(assetsUrl) -> Res.getUri("files/" + url.removePrefix(assetsUrl))
            else -> {
                if (url.contains(ASSETS_PATH)) {
                    Log.w(TAG, "Request for assets ($url) not handled correctly.")
                }
                null
            }
        }
            ?.replace(ANDROID_ASSET_URI, ANDROID_ASSETS_URL)
            ?.let { Uri.parse(it) }
    }

    companion object {
        private const val TAG = "WebViewAssetInterceptor"
        private const val ASSETS_PATH = "constellation-mobile-sdk-assets"

        private const val ANDROID_ASSET_URI = "file:///android_asset/"
        private const val ANDROID_ASSETS_URL = "https://appassets.androidplatform.net/$ASSETS_PATH/"
    }
}
