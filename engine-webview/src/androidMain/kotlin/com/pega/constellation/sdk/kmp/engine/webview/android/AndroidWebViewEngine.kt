package com.pega.constellation.sdk.kmp.engine.webview.android

import android.annotation.SuppressLint
import android.content.Context
import android.util.Log
import android.webkit.WebView
import android.webkit.WebView.setWebContentsDebuggingEnabled
import android.webkit.WebViewClient
import com.pega.constellation.sdk.kmp.core.ConstellationSdkAction
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.EngineEvent
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.core.EnvironmentInfo.Companion.toEnvironmentInfo
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
import com.pega.constellation.sdk.kmp.engine.webview.common.EngineConfiguration
import com.pega.constellation.sdk.kmp.engine.webview.common.InternalError
import com.pega.constellation.sdk.kmp.engine.webview.common.JsError
import androidx.annotation.MainThread
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

import okhttp3.OkHttpClient
import org.json.JSONObject
import java.util.concurrent.TimeUnit

/**
 * WebView-based implementation of [ConstellationSdkEngine] for Android.
 *
 * Embeds a [WebView] hosting the Constellation CoreJS engine with JS components.
 * Network requests are intercepted and routed through the provided [OkHttpClient] instances.
 *
 * @param context The Android [android.content.Context] used to create the [WebView].
 * An Activity context (or a context wrapping an Activity) is recommended.
 * While we haven't encountered any issues using an Application context,
 * the official Android documentation states it may cause WebView to behave incorrectly.
 * (https://developer.android.com/reference/android/webkit/WebView#WebView(android.content.Context)
 * @param scope [CoroutineScope] used to dispatch async work. The engine does not cancel this
 * scope on [destroy], prefer lifecycle-aware scopes such as `lifecycleScope` or
 * `viewModelScope` that are canceled automatically when the host is destroyed.
 * @param okHttpClient Primary client for Constellation DX API requests.
 * @param nonDxOkHttpClient Client for non-DX requests. Defaults to [Companion.defaultHttpClient].
 */
class AndroidWebViewEngine(
    private val context: Context,
    private val scope: CoroutineScope,
    private val okHttpClient: OkHttpClient,
    private val nonDxOkHttpClient: OkHttpClient = defaultHttpClient()
) : ConstellationSdkEngine {

    private lateinit var config: ConstellationSdkConfig
    private lateinit var handler: EngineEventHandler
    private lateinit var componentManager: ComponentManager
    private lateinit var networkInterceptor: WebViewNetworkInterceptor
    private lateinit var webViewClient: SdkWebViewClient
    private var webView: WebView? = null

    override fun configure(config: ConstellationSdkConfig, handler: EngineEventHandler) {
        this.config = config
        this.handler = handler

        this.componentManager = config.componentManager
        this.networkInterceptor =
            WebViewNetworkInterceptor(scope, config.pegaUrl, okHttpClient, nonDxOkHttpClient)
        val assetInterceptor = WebViewAssetInterceptor(context, config)

        val interceptors = listOf(assetInterceptor, networkInterceptor)
        this.webViewClient = SdkWebViewClient(interceptors)
        setWebContentsDebuggingEnabled(config.debuggable)
        this.webView = createWebView(webViewClient)
    }

    override fun performAction(action: ConstellationSdkAction) {
        handler.handle(EngineEvent.Loading)
        webViewClient.onPageLoad = { onPageLoad(action) }
        val webView = requireNotNull(webView) { WEBVIEW_NULL_MESSAGE }
        webView.loadUrl(config.pegaUrl)
    }

    /**
     * Releases all resources held by the engine.
     *
     * Must be called from the **main thread** — from `Activity.onDestroy()`,
     * a Compose `DisposableEffect`, or `ViewModel.onCleared()` (via `Dispatchers.Main`).
     */
    @MainThread
    override fun destroy() {
        val wv = webView ?: return
        Log.d(TAG, "Destroying WebView")
        networkInterceptor.close()
        with(wv) {
            stopLoading()
            removeJavascriptInterface("sdkbridge")
            webViewClient = WebViewClient()
            webChromeClient = null
            destroy()
        }
        webView = null
    }

    /**
     * Pauses engine processing.
     *
     * Should be called when the host view is paused.
     * Must be called from the **main thread** — from `Activity.onPause()`.
     */
    @MainThread
    fun pause() {
        val wv = webView ?: return
        Log.d(TAG, "Pausing WebView")
        wv.onPause()
        wv.pauseTimers()
    }

    /**
     * Resumes engine processing after a previous [pause] call.
     *
     * Should be called when the host view is resumed.
     * Must be called from the **main thread** — from `Activity.onResume()`.
     */
    @MainThread
    fun resume() {
        val wv = webView ?: return
        Log.d(TAG, "Resuming WebView")
        wv.onResume()
        wv.resumeTimers()
    }

    private fun onPageLoad(action: ConstellationSdkAction) {
        val configuration = EngineConfiguration(
            url = config.pegaUrl,
            action = action,
            debuggable = config.debuggable
        )
        evaluateInit(
            sdkConfig = configuration.toJsonString(),
            scripts = componentManager.getCustomComponentDefinitions()
                .filter { it.script != null }
                .associate { it.type.type to it.script!!.assetPath(context) }
                .let { JSONObject(it) }
                .toString()
        )
    }

    private fun evaluateInit(sdkConfig: String, scripts: String) {
        val webView = requireNotNull(webView) { WEBVIEW_NULL_MESSAGE }
        webView.evaluateJavascript("typeof window.init") { result ->
            if (result == "\"function\"") {
                webView.evaluateJavascript("window.init('$sdkConfig', '$scripts')", null)
            } else {
                handler.handle(EngineEvent.Error(InternalError("Engine failed to load init scripts")))
            }
        }
    }

    private fun onBridgeEvent(event: BridgeEvent) {
        Log.d(TAG, "Bridge event: $event")
        when (event) {
            is AddComponent -> onAddComponent(event.id, event.type)
            is UpdateComponent -> componentManager.updateComponent(event.id, event.propsJson)
            is RemoveComponent -> componentManager.removeComponent(event.id)
            is SetRequestBody -> networkInterceptor.setRequestBody(event.requestId, event.body)
            is OnReady -> handler.handle(EngineEvent.Ready(event.envInfoJson.toEnvironmentInfo()))
            is OnFinished -> handler.handle(EngineEvent.Finished(event.successMessage))
            is OnError -> handler.handle(
                EngineEvent.Error(JsError(event.type, event.message))
            )

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
        val webView = requireNotNull(webView) { WEBVIEW_NULL_MESSAGE }
        this.scope.launch(Dispatchers.Main.immediate) {
            webView.evaluateJavascript(script, null)
        }
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
        private const val WEBVIEW_NULL_MESSAGE = "WebView is null, probably has been destroyed."

        fun defaultHttpClient() = OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .build()
    }
}
