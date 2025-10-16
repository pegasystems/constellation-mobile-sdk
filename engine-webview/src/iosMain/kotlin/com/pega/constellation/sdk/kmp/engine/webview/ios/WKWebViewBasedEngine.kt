package com.pega.constellation.sdk.kmp.engine.webview.ios

import PegaMobileWKWebViewTweaks.allowForHTTPSchemeHandlerRegistration
import PegaMobileWKWebViewTweaks.applyTweaks
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.api.ComponentScript
import com.pega.constellation.sdk.kmp.core.components.widgets.Dialog
import com.pega.constellation.sdk.kmp.engine.webview.ios.WKWebViewBasedEngine.Companion.COMPONENT_ASSETS_PREFIX
import kotlinx.cinterop.ExperimentalForeignApi
import kotlinx.cinterop.readValue
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch
import kotlinx.serialization.Serializable
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.json.Json
import platform.CoreGraphics.CGRectZero
import platform.Foundation.NSURL
import platform.Foundation.NSURLRequest
import platform.Foundation.setValue
import platform.WebKit.WKFrameInfo
import platform.WebKit.WKNavigation
import platform.WebKit.WKNavigationDelegateProtocol
import platform.WebKit.WKUIDelegateProtocol
import platform.WebKit.WKWebView
import platform.WebKit.WKWebViewConfiguration
import platform.darwin.NSObject

fun ComponentScript.assetPath() = "$COMPONENT_ASSETS_PREFIX$file"

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

    fun toJsonString(): String =
        Json.encodeToString(this)
            .replace("\n", " ")

}

@OptIn(ExperimentalForeignApi::class)
class WKWebViewBasedEngine(
    val provider: ResourceProvider
) : ConstellationSdkEngine {
    val webView: WKWebView
    private lateinit var config: ConstellationSdkConfig
    private lateinit var handler: EngineEventHandler
    private var mainScope: CoroutineScope? = null
    private val formHandler = FormHandler()
    private val resourceHandler = ResourceHandler(
        mainScope = { mainScope as CoroutineScope }
    )
    private var initScript: String? = null
    private var initialNavigation: WKNavigation? = null
    private var uiDelegate: WKUIDelegateProtocol? = null

    init {
        val wkConfig = WKWebViewConfiguration()
        registerCustomHTTPSchemeHandler(wkConfig)
        wkConfig.setValue(true, forKey = "allowUniversalAccessFromFileURLs")

        wkConfig.userContentController.addScriptMessageHandler(
            ConsoleScriptMessageHandler(ConsoleHandler(showDebugLogs = true)),
            name = "consoleHandler"
        )
        wkConfig.userContentController.addScriptMessageHandler(formHandler, name = "formHandler")
        webView = WKWebView(frame = CGRectZero.readValue(), wkConfig)
    }

    override fun configure(
        config: ConstellationSdkConfig,
        handler: EngineEventHandler
    ) {
        this.config = config
        this.handler = handler
        this.formHandler.eventHandler = handler
        this.formHandler.componentManager = config.componentManager
        val resourceProviderManager =
            ResourceProviderManager(config.pegaUrl, config.componentManager, provider)
        this.resourceHandler.delegate = resourceProviderManager
    }

    override fun createCase(
        caseClassName: String,
        startingFields: Map<String, Any>
    ) {
        mainScope?.cancel()
        mainScope = CoroutineScope(Dispatchers.Main)

        formHandler.handleLoading()

        val engineConfig = EngineConfiguration(
            url = config.pegaUrl,
            version = config.pegaVersion,
            caseClassName = caseClassName,
            debuggable = config.debuggable
        )

        val customAndOverriddenComponents =
            formHandler.componentManager.getCustomComponentDefinitions()
                .mapNotNull { definition ->
                    definition.script?.assetPath()?.let { path ->
                        definition.type.type to path
                    }
                }
                .toMap()
                .let {
                    Json.encodeToString(
                        MapSerializer(String.serializer(), String.serializer()),
                        it
                    )
                }

        initScript = buildInitScript(customAndOverriddenComponents, engineConfig)

        configureUIDelegate()
        configureNavigationDelegate()

        webView.setInspectable(config.debuggable)

        Log.i(TAG, "Bootstrapping Constellation engine.")
        val indexURL =
            NSURL(string = config.pegaUrl).URLByAppendingPathComponent(pathComponent = "constellation-mobile-sdk-assets/scripts/index.html")
        initialNavigation = webView.loadRequest(NSURLRequest(uRL = indexURL!!))
    }

    @OptIn(ExperimentalForeignApi::class)
    private fun registerCustomHTTPSchemeHandler(config: WKWebViewConfiguration) {
        if (!tweaksApplied) {
            applyTweaks()
            tweaksApplied = true
        }
        allowForHTTPSchemeHandlerRegistration = true
        config.setURLSchemeHandler(resourceHandler, forURLScheme = "http")
        config.setURLSchemeHandler(resourceHandler, forURLScheme = "https")
        allowForHTTPSchemeHandlerRegistration = false
    }

    private fun buildInitScript(
        customAndOverriddenComponents: String,
        configuration: EngineConfiguration
    ): String {
        val configString = configuration.toJsonString()
        return """
        window.onload = function() {
           window.init('$configString', '$customAndOverriddenComponents');
        }
        """.trimIndent()
    }

    private fun configureUIDelegate() {
        uiDelegate = object : NSObject(), WKUIDelegateProtocol {
            override fun webView(
                webView: WKWebView,
                runJavaScriptAlertPanelWithMessage: String,
                initiatedByFrame: WKFrameInfo,
                completionHandler: () -> Unit
            ) {
                config.componentManager.rootContainerComponent?.presentDialog(
                    Dialog.Config(
                        Dialog.Type.ALERT,
                        runJavaScriptAlertPanelWithMessage,
                        completionHandler
                    )
                ) ?: run {
                    completionHandler()
                    Log.w(TAG, "No root container to present alert dialog.")
                }
            }

            override fun webView(
                webView: WKWebView,
                runJavaScriptTextInputPanelWithPrompt: String,
                defaultText: String?,
                initiatedByFrame: WKFrameInfo,
                completionHandler: (String?) -> Unit
            ) {
                config.componentManager.rootContainerComponent?.presentDialog(
                    Dialog.Config(
                        Dialog.Type.PROMPT,
                        runJavaScriptTextInputPanelWithPrompt,
                        promptDefault = defaultText,
                        onPromptConfirm = { result -> completionHandler(result) },
                        onCancel = { completionHandler(null) }
                    )
                ) ?: run {
                    completionHandler(null)
                    Log.w(TAG, "No root container to present prompt dialog.")
                }
            }

            override fun webView(
                webView: WKWebView,
                runJavaScriptConfirmPanelWithMessage: String,
                initiatedByFrame: WKFrameInfo,
                completionHandler: (Boolean) -> Unit
            ) {
                config.componentManager.rootContainerComponent?.presentDialog(
                    Dialog.Config(
                        Dialog.Type.CONFIRM,
                        runJavaScriptConfirmPanelWithMessage,
                        onConfirm = {
                            completionHandler(true)
                        },
                        onCancel = {
                            completionHandler(false)
                        }
                    )
                ) ?: run {
                    completionHandler(false)
                    Log.w(TAG, "No root container to present confirm dialog.")
                }
            }
        }
        webView.UIDelegate = uiDelegate
    }

    private fun configureNavigationDelegate() {
        webView.navigationDelegate = object : NSObject(), WKNavigationDelegateProtocol {
            override fun webView(webView: WKWebView, didFinishNavigation: WKNavigation?) {
                if (didFinishNavigation == initialNavigation) {
                    Log.i(TAG, "Initial navigation completed, injecting scripts.")
                    val injector = ScriptInjector()
                    mainScope?.launch {
                        try {
                            injector.load("Console")
                            injector.load("FormHandler")
                            injector.append(initScript ?: "")
                            injector.inject(webView)
                        } catch (e: Throwable) {
                            Log.e(TAG, "Error during engine initialization.", e)
                        }
                    }
                    mainScope?.launch {
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
    }

    companion object {
        private const val TAG = "WKWebViewBasedEngine"
        const val COMPONENT_ASSETS_PREFIX = "/constellation-mobile-sdk-assets/components/"
        private var tweaksApplied = false
    }
}
