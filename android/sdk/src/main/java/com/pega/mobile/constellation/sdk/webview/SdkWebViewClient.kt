package com.pega.mobile.constellation.sdk.webview

import android.app.Activity
import android.net.Uri
import android.util.Log
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.lifecycle.AtomicReference
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewAssetLoader.AssetsPathHandler
import com.pega.mobile.constellation.sdk.ConstellationMobileSDK.Companion.ASSETS_URL
import com.pega.mobile.constellation.sdk.ConstellationMobileSDK.Companion.INDEX_HTML_PATH
import com.pega.mobile.constellation.sdk.SDKConfig
import okhttp3.Headers
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response
import org.json.JSONObject
import java.io.ByteArrayInputStream


class SdkWebViewClient(
    private val activity: Activity,
    private val okHttpClient: OkHttpClient,
    private val sdkConfig: SDKConfig,
    private val jsComponentOverrides: Map<String, String>
) : WebViewClient() {
    internal var requestBody: AtomicReference<String?> = AtomicReference(null)

    private val assetLoader: WebViewAssetLoader = WebViewAssetLoader.Builder()
        .addPathHandler("/assets/", AssetsPathHandler(activity))
        .build()

    override fun shouldInterceptRequest(
        view: WebView,
        request: WebResourceRequest
    ): WebResourceResponse {
        val pegaUrl = sdkConfig.pegaUrl
        return when {
            request.url.toString() == pegaUrl ->
                assetLoader.shouldInterceptRequest(Uri.parse(ASSETS_URL + INDEX_HTML_PATH))
            request.url.toString().contains("$pegaUrl/assets/") -> {
                val newUrl = request.url.toString().replace(pegaUrl, ASSETS_URL)
                assetLoader.shouldInterceptRequest(Uri.parse(newUrl))
            }
            else -> interceptHttpRequest(request)
        } ?: interceptHttpRequest(request)
    }

    private fun interceptHttpRequest(request: WebResourceRequest): WebResourceResponse {
        val requestBody = if (request.method == "POST" || request.method == "PATCH") {
            val requestBody = this.requestBody.get()
            this.requestBody.set(null)
            requestBody
        } else null
        Log.d(
            TAG,
            "Sending request: ${request.method} to ${request.url} with headers ${request.requestHeaders} and body $requestBody "
        )
        runCatching {
            val response = sendHttpRequest(
                request.method,
                request.url.toString(),
                request.requestHeaders,
                requestBody
            )
            val reasonPhrase = if (response.message.isNotEmpty()) {
                response.message
            } else {
                when (response.code) {
                    200 -> "OK"
                    else -> "OK"
                }
            }
            return WebResourceResponse(
                response.header("content-type", response.headers["content-type"]),
                response.header("content-encoding", "utf-8"),
                response.code,
                reasonPhrase,
                response.headers.toMap(),
                response.body?.byteStream()
            )
        }.getOrElse {
            val message = it.message.orEmpty()
            Log.e(TAG, "Network error: $message", it)
            activity.runOnUiThread {
                Toast.makeText(activity, "Network error: $message", Toast.LENGTH_LONG).show()
            }
            return WebResourceResponse(
                "text/html", "utf-8", ByteArrayInputStream(message.toByteArray())
            )
        }
    }

    private fun sendHttpRequest(
        method: String,
        url: String,
        headers: Map<String, String>,
        body: String?
    ): Response {
        val headersBuilder = Headers.Builder()
        headers.forEach {
            headersBuilder.add(it.key, it.value)
        }
        val request = Request.Builder()
            .method(method, body?.toRequestBody())
            .url(url)
            .headers(headersBuilder.build())
            .build()
        val call = okHttpClient.newCall(request)
        return call.execute()
    }

    override fun onPageFinished(view: WebView?, url: String?) {
        super.onPageFinished(view, url)
        val config = JSONObject().apply {
            put("url", sdkConfig.pegaUrl)
            put("version", sdkConfig.pegaVersion)
            put("caseClassName", sdkConfig.caseClassName)
            put("startingFields", JSONObject(sdkConfig.startingFields))
        }.toString()
        val jsComponentsOverridesJsonStr = JSONObject(jsComponentOverrides).toString()
        view?.evaluateJavascript("window.init('$config', '$jsComponentsOverridesJsonStr')", null)
    }

    companion object {
        private const val TAG = "SdkWebViewClient"
    }
}


