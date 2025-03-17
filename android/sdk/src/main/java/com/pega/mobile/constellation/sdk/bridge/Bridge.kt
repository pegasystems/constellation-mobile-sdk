package com.pega.mobile.constellation.sdk.bridge

import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebView
import com.pega.mobile.constellation.sdk.FormResult
import com.pega.mobile.constellation.sdk.webview.SdkWebViewClient

internal class SdkBridge(
    private val webView: WebView
) {
    private val webViewClient = webView.webViewClient as SdkWebViewClient
    private var onResultListener: ((FormResult) -> Unit)? = null

    @JavascriptInterface
    fun addComponent(id: Int, type: String) {
        Log.d(TAG, "Adding component - id: $id, type: $type")
        ComponentsManager.addComponent(id, type) { event ->
            sendEvent(id, event)
        }
    }

    @JavascriptInterface
    fun removeComponent(id: Int) {
        Log.d(TAG, "Removing component - id: $id")
        ComponentsManager.removeComponent(id)
    }

    @JavascriptInterface
    fun updateProps(id: String, propsJson: String) {
        Log.d(TAG, "Updating props for component - id: $id, props: $propsJson")
        ComponentsManager.updateComponent(id.toInt(), propsJson)
    }

    @JavascriptInterface
    fun setRequestBody(body: String) {
        Log.d(TAG, "Setting request body: $body")
        webViewClient.requestBody.set(body)
    }

    @JavascriptInterface
    fun formFinished(successMessage: String?) {
        Log.d(TAG, "Form finished, successMessage: $successMessage")
        onResultListener?.let { it(FormResult.Finished(successMessage)) }
    }

    @JavascriptInterface
    fun formCancelled() {
        Log.d(TAG, "Form cancelled")
        onResultListener?.let { it(FormResult.Cancelled) }
    }

    fun sendEvent(viewId: Int, event: ComponentEvent) =
        webView.evaluateJavascript(
            "window.sendEventToComponent($viewId, '${event.toJson()}')", null
        )

    fun setOnResultListener(onResultListener: (FormResult) -> Unit) {
        this.onResultListener = onResultListener
    }

    companion object {
        private const val TAG = "SdkBridge"
    }
}
