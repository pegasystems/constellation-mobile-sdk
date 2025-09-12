package com.pega.constellation.sdk.kmp.engine.androidwebview.internal.webview

import android.annotation.SuppressLint
import android.content.Context
import android.util.Log
import android.webkit.WebView
import android.webkit.WebView.setWebContentsDebuggingEnabled
import android.webkit.WebViewClient
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.EngineEvent
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.core.components.widgets.AlertComponent
import com.pega.constellation.sdk.kmp.core.api.ComponentContextImpl
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.api.ComponentType
import com.pega.constellation.sdk.kmp.engine.androidwebview.defaultHttpClient
import com.pega.constellation.sdk.kmp.engine.androidwebview.internal.webview.SdkBridge.BridgeEvent
import com.pega.constellation.sdk.kmp.engine.androidwebview.internal.webview.SdkBridge.BridgeEvent.AddComponent
import com.pega.constellation.sdk.kmp.engine.androidwebview.internal.webview.SdkBridge.BridgeEvent.OnCancelled
import com.pega.constellation.sdk.kmp.engine.androidwebview.internal.webview.SdkBridge.BridgeEvent.OnError
import com.pega.constellation.sdk.kmp.engine.androidwebview.internal.webview.SdkBridge.BridgeEvent.OnFinished
import com.pega.constellation.sdk.kmp.engine.androidwebview.internal.webview.SdkBridge.BridgeEvent.OnReady
import com.pega.constellation.sdk.kmp.engine.androidwebview.internal.webview.SdkBridge.BridgeEvent.RemoveComponent
import com.pega.constellation.sdk.kmp.engine.androidwebview.internal.webview.SdkBridge.BridgeEvent.SetRequestBody
import com.pega.constellation.sdk.kmp.engine.androidwebview.internal.webview.SdkBridge.BridgeEvent.UpdateComponent
import com.pega.constellation.sdk.kmp.engine.androidwebview.internal.webview.interceptor.WebViewAssetInterceptor
import com.pega.constellation.sdk.kmp.engine.androidwebview.internal.webview.interceptor.WebViewNetworkInterceptor
import okhttp3.OkHttpClient
import org.json.JSONObject

internal class SdkWebViewEngine(
    private val context: Context,
    private val config: ConstellationSdkConfig,
    private val handler: EngineEventHandler,
    okHttpClient: OkHttpClient,
    nonDxOkHttpClient: OkHttpClient = defaultHttpClient()
) : ConstellationSdkEngine {
    init {
        setWebContentsDebuggingEnabled(config.debuggable)
    }

    private val componentManager = config.componentManager
    private val networkInterceptor = WebViewNetworkInterceptor(config.pegaUrl, okHttpClient, nonDxOkHttpClient)
    private val assetInterceptor = WebViewAssetInterceptor(context, config)
    private val interceptors = listOf(assetInterceptor, networkInterceptor)

    private val webViewClient = SdkWebViewClient(interceptors)
    private val webView = createWebView(webViewClient)

    override fun load(caseClassName: String, startingFields: Map<String, Any>) {
        handler.handle(EngineEvent.Loading)
        webViewClient.onPageLoad = { onPageLoad(caseClassName, startingFields) }
        webView.loadUrl(config.pegaUrl)
    }

    private fun onPageLoad(caseClassName: String, startingFields: Map<String, Any>) {
        evaluateInit(
            sdkConfig = JSONObject().apply {
                put("url", config.pegaUrl)
                put("version", config.pegaVersion)
                put("caseClassName", caseClassName)
                put("startingFields", JSONObject(startingFields))
            }.toString(),
            scripts = componentManager.getComponentDefinitions()
                .filter { it.jsFile != null }
                .associate { it.type.type to it.jsFile }
                .let { JSONObject(it) }
                .toString()
        )
    }

    private fun evaluateInit(sdkConfig: String, scripts: String) {
        webView.evaluateJavascript("typeof window.init") { result ->
            if (result == "\"function\"") {
                webView.evaluateJavascript("window.init('$sdkConfig', '$scripts')", null)
            } else {
                handler.handle(EngineEvent.Error("Engine failed to load init scripts"))
            }
        }
    }

    fun onBridgeEvent(event: BridgeEvent) {
        Log.d(TAG, "Bridge event: $event")
        when (event) {
            is AddComponent -> onAddComponent(event.id, event.type)
            is UpdateComponent -> componentManager.updateComponent(event.id, event.propsJson)
            is RemoveComponent -> componentManager.removeComponent(event.id)
            is SetRequestBody -> networkInterceptor.setRequestBody(event.body)
            is OnReady -> handler.handle(EngineEvent.Ready)
            is OnFinished -> handler.handle(EngineEvent.Finished(event.successMessage))
            is OnError -> handler.handle(EngineEvent.Error(event.error))
            is OnCancelled -> handler.handle(EngineEvent.Cancelled)
        }
    }

    private fun onAddComponent(id: ComponentId, type: ComponentType) {
        val onComponentEvent: (ComponentEvent) -> Unit = { sendComponentEvent(id, it) }
        val context = ComponentContextImpl(id, type, componentManager, onComponentEvent)
        componentManager.addComponent(context)
    }

    private fun sendComponentEvent(id: ComponentId, event: ComponentEvent) {
        Log.d(TAG, "Sending: $event")
        val eventJson = JSONObject().apply {
            put("type", event.type)
            put("componentData", JSONObject(event.componentData))
            put("eventData", JSONObject(event.eventData))
        }
        val script = "window.sendEventToComponent('${id.id}', '$eventJson')"
        webView.evaluateJavascript(script, null)
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun createWebView(client: WebViewClient) = WebView(context).apply {
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        webViewClient = client
        webChromeClient =
            SdkWebChromeClient(
                debuggable = config.debuggable,
                onAlert = { message, onConfirm ->
                    componentManager.getAlertComponent().setAlertInfo(
                        AlertComponent.Info(AlertComponent.Type.ALERT, message, onConfirm)
                    )
                },
                onConfirm = { message, onConfirm, onCancel ->
                    componentManager.getAlertComponent().setAlertInfo(
                        AlertComponent.Info(
                            AlertComponent.Type.CONFIRM, message, onConfirm, onCancel
                        )
                    )
                })
        val bridge = SdkBridge(::onBridgeEvent)
        addJavascriptInterface(bridge, "sdkbridge")
    }

    companion object {
        private const val TAG = "SdkWebViewEngine"
    }
}
