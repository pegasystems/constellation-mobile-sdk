package com.pega.constellation.sdk.kmp.engine.webview.ios

import PegaMobileWKWebViewTweaks.*
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.core.Log
import kotlinx.cinterop.ExperimentalForeignApi
import kotlinx.cinterop.readValue
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import platform.CoreGraphics.CGRectZero
import platform.Foundation.NSURL
import platform.Foundation.NSURLRequest
import platform.Foundation.setValue
import platform.WebKit.WKNavigation
import platform.WebKit.WKNavigationDelegateProtocol
import platform.WebKit.WKWebView
import platform.WebKit.WKWebViewConfiguration
import platform.darwin.NSObject

data class ComponentEvent(
    val id: Int,
    val eventContent: String
)

@Serializable
data class EngineConfiguration(
    val url: String,
    val version: String,
    val caseClassName: String? = null,
    val debuggable: Boolean
) {
    constructor(other: EngineConfiguration, caseClassName: String): this(
        url = other.url,
        version = other.version,
        caseClassName = caseClassName,
        debuggable = other.debuggable
    )

    fun toJsonString(): String =
        Json.encodeToString(this)
            .replace("\n", " ")

}

@OptIn(ExperimentalForeignApi::class)
class WKWebViewBasedEngine(
    val config: ConstellationSdkConfig,
    val handler: EngineEventHandler,
    val provider: ResourceProvider,
    private val resourceProviderManager: ResourceProviderManager = ResourceProviderManager(config.pegaUrl, provider),
    private val resourceHandler: ResourceHandler = ResourceHandler(delegate = resourceProviderManager),
) : ConstellationSdkEngine {

    private var wkWebView: WKWebView
    private val formHandler = FormHandler(handler, config.componentManager)
    private var initScript: String? = null
    private var eventStreamJob: Job? = null
    private var initialNavigation: WKNavigation? = null

    init {
        val wkConfig = WKWebViewConfiguration()
        registerCustomHTTPSchemeHandler(wkConfig)
        wkConfig.setValue(true, forKey = "allowUniversalAccessFromFileURLs")

        wkConfig.userContentController.addScriptMessageHandler(
            ConsoleScriptMessageHandler(ConsoleHandler(showDebugLogs = true)),
            name = "consoleHandler")
        wkConfig.userContentController.addScriptMessageHandler(formHandler, name = "formHandler")
        wkWebView = WKWebView(frame = CGRectZero.readValue(), wkConfig)
    }

    override val nativeHandle: Any?
        get() = wkWebView

    override fun load(
        caseClassName: String,
        startingFields: Map<String, Any>
    ) {
        formHandler.handleLoading()

        val engineConfig = EngineConfiguration(
            url = config.pegaUrl,
            version = config.pegaVersion,
            caseClassName = caseClassName,
            debuggable =  config.debuggable
        )

        initScript = buildInitScript(overrideString = "{}", engineConfig)

        wkWebView.navigationDelegate = object : NSObject(), WKNavigationDelegateProtocol {
            override fun webView(webView: WKWebView, didFinishNavigation: WKNavigation?) {
                if (didFinishNavigation == initialNavigation) {
                    Log.i(TAG, "Initial navigation completed, injecting scripts.")
                    val injector = ScriptInjector()
                    CoroutineScope(Dispatchers.Main).launch {
                        try {
                            injector.load("Console")
                            injector.load("FormHandler")
                            injector.append(initScript ?: "")
                            injector.inject(webView)
                        } catch (e: Throwable) {
                            Log.e(TAG, "Error during engine initialization.", e)
                        }
                    }
                    eventStreamJob = CoroutineScope(Dispatchers.Main).launch {
                        formHandler.eventStream.collect { event ->
                            webView.evaluateJavaScript(
                                "window.sendEventToComponent(${event.id}, '${event.eventContent}')",
                                completionHandler = null
                            )
                        }
                    }
                }
            }
        }
        wkWebView.setInspectable(config.debuggable)

        val indexURL = NSURL(string = config.pegaUrl).URLByAppendingPathComponent(pathComponent = "constellation-mobile-sdk-assets/scripts/index.html")
        initialNavigation = wkWebView.loadRequest(NSURLRequest(uRL = indexURL!!))
    }

    @OptIn(ExperimentalForeignApi::class)
    private fun registerCustomHTTPSchemeHandler(config: WKWebViewConfiguration) {
        applyTweaks()
        allowForHTTPSchemeHandlerRegistration = true
        config.setURLSchemeHandler(resourceHandler, forURLScheme = "http")
        config.setURLSchemeHandler(resourceHandler, forURLScheme = "https")
        allowForHTTPSchemeHandlerRegistration = false
    }

    private fun buildInitScript(overrideString: String, configuration: EngineConfiguration): String {
        val configString = configuration.toJsonString()
        return """
        window.onload = function() {
           window.init('$configString', '$overrideString');
        }
        """.trimIndent()
    }

    companion object {
        private const val TAG = "WKWebViewBasedEngine"
    }
}
