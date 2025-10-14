package com.pega.constellation.sdk.kmp.engine.webview.android

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
import com.pega.constellation.sdk.kmp.core.api.ComponentContextImpl
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.api.ComponentManager
import com.pega.constellation.sdk.kmp.core.api.ComponentType
import com.pega.constellation.sdk.kmp.core.components.widgets.Dialog
import com.pega.constellation.sdk.kmp.engine.webview.android.interceptor.WebViewAssetInterceptor
import com.pega.constellation.sdk.kmp.engine.webview.android.interceptor.WebViewAssetInterceptor.Companion.assetPath
import com.pega.constellation.sdk.kmp.engine.webview.android.interceptor.WebViewNetworkInterceptor
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent.AddComponent
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent.OnCancelled
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent.OnError
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent.OnFinished
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent.OnReady
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent.RemoveComponent
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent.SetRequestBody
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkBridge.BridgeEvent.UpdateComponent
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkWebChromeClient
import com.pega.constellation.sdk.kmp.engine.webview.android.internal.SdkWebViewClient
import okhttp3.OkHttpClient
import org.json.JSONObject
import java.util.concurrent.TimeUnit

class AndroidWebViewEngine(
    private val context: Context,
    private val okHttpClient: OkHttpClient,
    private val nonDxOkHttpClient: OkHttpClient = defaultHttpClient()
) : ConstellationSdkEngine {

    private lateinit var config: ConstellationSdkConfig
    private lateinit var handler: EngineEventHandler
    private lateinit var componentManager: ComponentManager
    private lateinit var networkInterceptor: WebViewNetworkInterceptor
    private lateinit var webViewClient: SdkWebViewClient
    private lateinit var webView: WebView

    override fun configure(config: ConstellationSdkConfig, handler: EngineEventHandler) {
        this.config = config
        this.handler = handler

        this.componentManager = config.componentManager
        this.networkInterceptor =
            WebViewNetworkInterceptor(config.pegaUrl, okHttpClient, nonDxOkHttpClient)
        val assetInterceptor = WebViewAssetInterceptor(context, config)

        val interceptors = listOf(assetInterceptor, networkInterceptor)
        this.webViewClient = SdkWebViewClient(interceptors)
        setWebContentsDebuggingEnabled(config.debuggable)
        this.webView = createWebView(webViewClient)
    }

    override fun createCase(caseClassName: String, startingFields: Map<String, Any>) {
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
            scripts = componentManager.getCustomComponentDefinitions()
                .filter { it.script != null }
                .associate { it.type.type to it.script!!.assetPath(context) }
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

    private fun onBridgeEvent(event: BridgeEvent) {
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
                    componentManager.rootContainerComponent?.presentDialog(
                        Dialog.Config(
                            Dialog.Type.ALERT,
                            message,
                            onConfirm
                        )
                    ) ?: Log.w(TAG, "No root container to present alert dialog")
                },
                onConfirm = { message, onConfirm, onCancel ->
                    componentManager.rootContainerComponent?.presentDialog(
                        Dialog.Config(
                            Dialog.Type.CONFIRM,
                            message,
                            onConfirm,
                            onCancel
                        )
                    ) ?: Log.w(TAG, "No root container to present confirm dialog")
                },
                onPrompt = { message, defaultValue, onConfirm, onCancel ->
                    componentManager.rootContainerComponent?.presentDialog(
                        Dialog.Config(
                            Dialog.Type.PROMPT,
                            message,
                            promptDefault = defaultValue,
                            onPromptConfirm = onConfirm,
                            onCancel = onCancel
                        )
                    ) ?: Log.w(TAG, "No root container to present prompt dialog")
                })

        val bridge = SdkBridge(::onBridgeEvent)
        addJavascriptInterface(bridge, "sdkbridge")
    }

    companion object Companion {
        private const val TAG = "AndroidWebViewEngine"

        fun defaultHttpClient() = OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .build()
    }
}
