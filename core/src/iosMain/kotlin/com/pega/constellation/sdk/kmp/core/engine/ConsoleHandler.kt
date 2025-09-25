package com.pega.constellation.sdk.kmp.core.engine

import com.pega.constellation.sdk.kmp.core.Log
import platform.WebKit.WKScriptMessage
import platform.WebKit.WKScriptMessageHandlerProtocol
import platform.WebKit.WKUserContentController
import platform.darwin.NSObject

class ConsoleHandler(
    private val showDebugLogs: Boolean
) {

    fun handleMessage(body: Any?) {
        val input = body as? List<*>
        val logLevel = (input?.getOrNull(0) as? Double)?.toInt()
        val logMessage = input?.getOrNull(1) as? String

        if (input == null || logLevel == null || logMessage == null) {
            Log.e(TAG, "Unexpected input passed from JS")
            return
        }

        if (!showDebugLogs && logLevel > 2) {
            return
        }

        when (logLevel) {
            1 -> Log.e(TAG, "JS: $logMessage")
            2 -> Log.w(TAG, "JS: $logMessage")
            else -> Log.i(TAG, "JS: $logMessage")
        }
    }

    companion object {
        private const val TAG = "ConsoleHandler"
    }
}

class ConsoleScriptMessageHandler(
    private val delegate: ConsoleHandler
) : NSObject(), WKScriptMessageHandlerProtocol {

    override fun userContentController(
        userContentController: WKUserContentController,
        didReceiveScriptMessage: WKScriptMessage
    ) {
        delegate.handleMessage(didReceiveScriptMessage.body)
    }
}