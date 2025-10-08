package com.pega.constellation.sdk.kmp.engine.webview.ios

import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.webview.generated.resources.Res
import kotlinx.cinterop.ExperimentalForeignApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import platform.Foundation.NSCocoaErrorDomain
import platform.Foundation.NSError
import platform.Foundation.NSFileNoSuchFileError
import platform.Foundation.NSString
import platform.Foundation.NSURL
import platform.Foundation.NSUTF8StringEncoding
import platform.Foundation.stringWithContentsOfURL
import platform.WebKit.WKWebView

class ScriptInjector {
    private val scripts = mutableListOf<String>()

    @OptIn(ExperimentalForeignApi::class)
    @Throws(Exception::class)
    fun loadScript(name: String): String {

        val path = Res.getUri("files/$name.js")
        val fileURL = NSURL(string = path)
        val contents =  NSString.stringWithContentsOfURL(fileURL, encoding = NSUTF8StringEncoding, error = null)
        if (contents != null) {
            return contents
        }
        Log.w(TAG, "Cannot inject script, file does not exist: $path")
        throw NSError.errorWithDomain(
            domain = NSCocoaErrorDomain,
            code = NSFileNoSuchFileError,
            userInfo = null
        ).asThrowable()
    }

    @Throws(Exception::class)
    fun load(name: String) {
        Log.i(TAG, "Loading $name")
        val script = loadScript(name)
        Log.i(TAG, "$name loaded, size = ${script.length}")
        scripts.add(script)
    }

    fun append(script: String) {
        scripts.add("(function () {$script})();")
    }

    @Throws(Exception::class)
    suspend fun inject(into: Any) {
        val webView = into as WKWebView
        val script = scripts.joinToString(";") + ";0"
        withContext(Dispatchers.Main) {
            webView.evaluateJavaScript(script, null)
        }
    }

    companion object {
        private const val TAG = "ScriptInjector"
    }
}

private fun NSError.asThrowable() = Exception(this.localizedDescription)
