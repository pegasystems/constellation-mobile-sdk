package com.pega.mobile.constellation.sdk

import android.app.Activity
import android.view.ViewGroup
import android.webkit.WebView
import com.pega.mobile.constellation.sdk.bridge.ComponentEvent
import com.pega.mobile.constellation.sdk.bridge.ComponentsManager
import com.pega.mobile.constellation.sdk.bridge.SdkBridge
import com.pega.mobile.constellation.sdk.components.Component
import com.pega.mobile.constellation.sdk.webview.SdkWebViewClient
import okhttp3.OkHttpClient

typealias ComponentProducer = (sendEventCallback: (ComponentEvent) -> Unit) -> Component

class ConstellationMobileSDK(
    activity: Activity,
    private val config: SDKConfig,
    okHttpClient: OkHttpClient,
    componentsDefOverrides: Map<String, ComponentDefinition> = emptyMap()
) {
    private val webView = WebView(activity).apply {
        layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            200
        )
        settings.javaScriptEnabled = true
        val jsOverrides =  componentsDefOverrides.map {
            it.key to it.value.jsFileNamePath
        }.toMap()
        webViewClient = SdkWebViewClient(activity, okHttpClient, config, jsOverrides)
        WebView.setWebContentsDebuggingEnabled(true)
    }

    private val bridge = SdkBridge(webView)

    init {
        val componentsOverrides = componentsDefOverrides.map {
            it.key to it.value.componentProducer
        }.toMap()
        ComponentsManager.setComponentsOverrides(componentsOverrides)
        ComponentsManager.addComponent(1, "RootContainer") {}

        webView.addJavascriptInterface(bridge, "sdkbridge")
    }

    fun createCase(onResult: (FormResult) -> Unit = {}): Component {
        webView.loadUrl(config.pegaUrl)
        bridge.setOnResultListener(onResult)
        return requireNotNull(ComponentsManager.getComponent(1))
    }


    companion object {
        const val ASSETS_URL = "https://appassets.androidplatform.net"
        const val INDEX_HTML_PATH = "/assets/scripts/index.html"
    }
}

/**
 * Class which defines component
 * @property jsFileNamePath relative path to js file. Root of the path is assets folder.
 * e.g.: if there is assets/components_override/custom_component_email.js
 * jsFileNamePath should be 'components_override/custom_component_email.js'
 *
 * @property componentProducer function which takes event callback and returns ViewComponent
 * Event callback is used to send data from native code to javascript.
 */
data class ComponentDefinition(
    val jsFileNamePath: String,
    val componentProducer: ComponentProducer
)

sealed class FormResult {
    data class Finished(val successMessage: String?) : FormResult()
    data object Cancelled : FormResult()
}