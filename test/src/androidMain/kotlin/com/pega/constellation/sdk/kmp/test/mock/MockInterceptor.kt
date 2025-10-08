package com.pega.constellation.sdk.kmp.test.mock

import android.content.Context
import android.util.Log
import com.pega.constellation.sdk.kmp.test.generated.resources.Res
import com.pega.constellation.sdk.kmp.test.mock.handlers.CdnHandler
import com.pega.constellation.sdk.kmp.test.mock.handlers.DxAssignmentsHandler
import com.pega.constellation.sdk.kmp.test.mock.handlers.DxCasesHandler
import com.pega.constellation.sdk.kmp.test.mock.handlers.DxDataViewsHandler
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Asset
import com.pega.constellation.sdk.kmp.test.mock.MockResponse.Error
import okhttp3.Interceptor
import okhttp3.Protocol
import okhttp3.Request
import okhttp3.RequestBody
import okhttp3.Response
import okhttp3.ResponseBody
import okhttp3.ResponseBody.Companion.toResponseBody
import okio.Buffer

class MockInterceptor(private val context: Context) : Interceptor {

    private val handlers = listOf(
        CdnHandler(),
        DxAssignmentsHandler(),
        DxCasesHandler(),
        DxDataViewsHandler(),
    )

    override fun intercept(chain: Interceptor.Chain) = chain.request()
        .apply { Log.i(TAG, "request: [$method] $url") }
        .runCatching {
            val mockedRequest = MockRequest(method, url.toString(), body?.string())
            val handler = handlers.firstOrNull { it.canHandle(mockedRequest) }
            val response = handler?.handle(mockedRequest)
            requireNotNull(response) { "Missing handler" }
        }
        .getOrElse { Error(message = it.message ?: "Unknown error") }
        .also { Log.i(TAG, " -> response: $it") }
        .toResponse(chain.request())

    private fun MockResponse.toResponse(request: Request): Response = when (this) {
        is Asset -> context.asset(path).toResponseBody().toResponse(request, 200)
        is Error -> message.toResponseBody().toResponse(request, code)
    }

    private fun Context.asset(asset: String) = assets.open(asset.formatFileUri()).bufferedReader().readText()

    private fun String.formatFileUri() = Res.getUri("files/$this").removePrefix(ANDROID_ASSETS_PREFIX)

    private fun ResponseBody.toResponse(request: Request, code: Int) = Response.Builder()
        .request(request)
        .protocol(Protocol.HTTP_1_1)
        .code(code)
        .message("OK")
        .header("Content-Type", "application/javascript")
        .apply { header("Access-Control-Allow-Origin", "*") }  // Allow CORS for testing
        .body(this)
        .build()

    companion object {
        private const val TAG = "MockInterceptor"
        private const val ANDROID_ASSETS_PREFIX = "file:///android_asset/"

        fun RequestBody.string() = Buffer().apply { writeTo(this) }.readUtf8()
    }
}
