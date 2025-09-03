package com.pega.mobile.constellation.sdk.internal.webview

import android.util.Log
import android.webkit.ConsoleMessage
import android.webkit.ConsoleMessage.MessageLevel.DEBUG
import android.webkit.ConsoleMessage.MessageLevel.ERROR
import android.webkit.ConsoleMessage.MessageLevel.LOG
import android.webkit.ConsoleMessage.MessageLevel.TIP
import android.webkit.ConsoleMessage.MessageLevel.WARNING
import android.webkit.JsResult
import android.webkit.WebChromeClient
import android.webkit.WebView

internal class SdkWebChromeClient(
    private val debuggable: Boolean,
    private val onAlert: (message: String, onConfirm: () -> Unit) -> Unit,
    private val onConfirm: (message: String, onConfirm: () -> Unit, onCancel: () -> Unit) -> Unit
) : WebChromeClient() {
    override fun onConsoleMessage(consoleMessage: ConsoleMessage): Boolean {
        val priority = consoleMessage.messageLevel().toPriority()
        if (debuggable || priority == Log.ERROR || priority == Log.WARN) {
            val errorMsg = consoleMessage.getErrorMessage()
            Log.println(priority, TAG, consoleMessage.message() + errorMsg)
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

    private fun ConsoleMessage.getErrorMessage() =
        if (messageLevel() == ERROR) ", source: ${sourceId()} (${lineNumber()})" else ""

    private fun ConsoleMessage.MessageLevel.toPriority() = when (this) {
        TIP -> Log.VERBOSE
        LOG -> Log.VERBOSE
        WARNING -> Log.WARN
        ERROR -> Log.ERROR
        DEBUG -> Log.DEBUG
    }

    companion object {
        private const val TAG = "SdkWebViewConsole"
    }
}
