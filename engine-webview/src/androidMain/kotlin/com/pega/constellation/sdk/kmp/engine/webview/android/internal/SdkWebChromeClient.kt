package com.pega.constellation.sdk.kmp.engine.webview.android.internal

import android.webkit.ConsoleMessage
import android.webkit.ConsoleMessage.MessageLevel.DEBUG
import android.webkit.ConsoleMessage.MessageLevel.ERROR
import android.webkit.ConsoleMessage.MessageLevel.LOG
import android.webkit.ConsoleMessage.MessageLevel.TIP
import android.webkit.ConsoleMessage.MessageLevel.WARNING
import android.webkit.JsPromptResult
import android.webkit.JsResult
import android.webkit.WebChromeClient
import android.webkit.WebView
import com.pega.constellation.sdk.kmp.core.Log

internal class SdkWebChromeClient(
    private val onAlert: (message: String, onConfirm: () -> Unit) -> Unit,
    private val onConfirm: (message: String, onConfirm: () -> Unit, onCancel: () -> Unit) -> Unit,
    private val onPrompt: (message: String, defaultValue: String?, onConfirm: (String?) -> Unit, onCancel: () -> Unit) -> Unit
) : WebChromeClient() {
    override fun onConsoleMessage(consoleMessage: ConsoleMessage): Boolean {
        val message = { consoleMessage.message() + consoleMessage.getErrorMessage() }
        when (consoleMessage.messageLevel()) {
            TIP -> Log.v(TAG, message)
            LOG -> Log.i(TAG, message)
            DEBUG -> Log.d(TAG, message)
            WARNING -> Log.w(TAG, message())
            ERROR -> Log.e(TAG, message())
        }
        return true
    }

    override fun onJsAlert(
        view: WebView,
        url: String,
        message: String,
        result: JsResult
    ): Boolean {
        onAlert(message) { result.confirm() }
        return true
    }

    override fun onJsConfirm(
        view: WebView,
        url: String,
        message: String,
        result: JsResult
    ): Boolean {
        onConfirm(message, { result.confirm() }, { result.cancel() })
        return true
    }

    override fun onJsPrompt(
        view: WebView,
        url: String,
        message: String,
        defaultValue: String,
        result: JsPromptResult
    ): Boolean {
        onPrompt(message, defaultValue, { value -> result.confirm(value) }, { result.cancel() })
        return true
    }

    private fun ConsoleMessage.getErrorMessage() =
        if (messageLevel() == ERROR) ", source: ${sourceId()} (${lineNumber()})" else ""

    companion object {
        private const val TAG = "SdkWebViewConsole"
    }
}
