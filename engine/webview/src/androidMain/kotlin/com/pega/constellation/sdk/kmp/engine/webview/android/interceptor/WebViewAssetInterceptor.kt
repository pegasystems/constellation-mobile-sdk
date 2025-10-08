package com.pega.constellation.sdk.kmp.engine.webview.android.interceptor

import android.annotation.SuppressLint
import android.content.Context
import android.net.Uri
import android.util.Log
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewAssetLoader.PathHandler
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.api.ComponentScript
import com.pega.constellation.sdk.kmp.webview.generated.resources.Res

@SuppressLint("UseKtx")
internal class WebViewAssetInterceptor(
    context: Context,
    config: ConstellationSdkConfig
) : WebViewInterceptor {
    private val pegaUrl = Uri.parse(config.pegaUrl)

    private val assetHandler = WebViewAssetLoader.AssetsPathHandler(context)
    private val assetLoader = WebViewAssetLoader.Builder()
        .setDomain(checkNotNull(pegaUrl.host) { "Invalid host in $pegaUrl" })
        .addPathHandler("/$SDK_ASSETS/", ComposePathHandler(assetHandler))
        .addPathHandler("/$CUSTOM_ASSETS/", assetHandler)
        .build()

    override fun shouldInterceptRequest(
        view: WebView,
        request: WebResourceRequest
    ): WebResourceResponse? {
        Log.v(TAG, "Intercepting request: ${request.url}")
        val uri = if (request.url == pegaUrl) indexHtmlUri else request.url
        return assetLoader.shouldInterceptRequest(uri)
    }

    private val indexHtmlUri: Uri
        get() = pegaUrl.buildUpon().encodedPath("/$SDK_ASSETS/scripts/index.html").build()

    class ComposePathHandler(val assetHandler: PathHandler) : PathHandler {
        override fun handle(path: String) = assetHandler.handle(
            Res.getUri("files/$path").removePrefix(ANDROID_ASSET_URI)
        )
    }

    companion object {
        private const val TAG = "WebViewAssetInterceptor"
        private const val SDK_ASSETS = "constellation-mobile-sdk-assets"
        private const val CUSTOM_ASSETS = "constellation-sdk-custom-assets"

        private const val ANDROID_ASSET_URI = "file:///android_asset/"

        fun ComponentScript.assetPath(context: Context): String {
            val path = file.removePrefix(ANDROID_ASSET_URI)
            require(path.isNotBlank()) { "File path cannot be blank" }
            require(context.assetExists(path)) { "Asset file does not exist: $path" }
            return "$CUSTOM_ASSETS/$path"
        }

        fun Context.assetExists(path: String) = runCatching { assets.open(path).close() }.isSuccess
    }
}
