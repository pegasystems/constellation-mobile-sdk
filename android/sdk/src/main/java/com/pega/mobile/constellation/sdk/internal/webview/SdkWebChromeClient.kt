package com.pega.mobile.constellation.sdk.internal.webview

import android.util.Log
import android.webkit.ConsoleMessage
import android.webkit.ConsoleMessage.MessageLevel.DEBUG
import android.webkit.ConsoleMessage.MessageLevel.ERROR
import android.webkit.ConsoleMessage.MessageLevel.LOG
import android.webkit.ConsoleMessage.MessageLevel.TIP
import android.webkit.ConsoleMessage.MessageLevel.WARNING
import android.webkit.WebChromeClient

class SdkWebChromeClient : WebChromeClient() {
    override fun onConsoleMessage(consoleMessage: ConsoleMessage): Boolean {
        val priority = consoleMessage.messageLevel().toPriority()
        val errorMsg = consoleMessage.getErrorMessage()
        Log.println(priority, CONSOLE_TAG, consoleMessage.message() + errorMsg)
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
        private const val CONSOLE_TAG = "SdkWebViewConsole"
    }
}
