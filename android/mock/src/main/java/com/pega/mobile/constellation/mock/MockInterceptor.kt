package com.pega.mobile.constellation.mock

import android.content.Context
import android.util.Log
import com.pega.mobile.constellation.mock.MockResponse.Asset
import com.pega.mobile.constellation.mock.MockResponse.Error
import com.pega.mobile.constellation.mock.handlers.CdnHandler
import com.pega.mobile.constellation.mock.handlers.DxAssignmentsHandler
import com.pega.mobile.constellation.mock.handlers.DxCasesHandler
import com.pega.mobile.constellation.mock.handlers.DxDataViewsHandler
import okhttp3.Interceptor
import okhttp3.Protocol
import okhttp3.Request
import okhttp3.RequestBody
import okhttp3.Response
import okhttp3.ResponseBody
import okhttp3.ResponseBody.Companion.toResponseBody
import okio.Buffer
import java.net.URL

class MockInterceptor(private val context: Context, private val pegaUrl: String) : Interceptor {

    private val handlers = listOf(
        CdnHandler(),
        DxAssignmentsHandler(),
        DxCasesHandler(),
        DxDataViewsHandler(),
    )

    override fun intercept(chain: Interceptor.Chain) = chain.request()
        .apply { Log.i(TAG, "request: [$method] $url") }
        .runCatching {
            val handler = handlers.firstOrNull { it.canHandle(this) }
            val response = handler?.handle(this)
            requireNotNull(response) { "Missing handler" }
        }
        .getOrElse { Error(message = it.message ?: "Unknown error") }
        .also { Log.i(TAG, " -> response: $it") }
        .toResponse(chain.request())

    private fun MockResponse.toResponse(request: Request): Response = when (this) {
        is Asset -> context.asset(path).toResponseBody().toResponse(request, 200)
        is Error -> message.toResponseBody().toResponse(request, code)
    }

    private fun Context.asset(asset: String) = assets.open(asset).bufferedReader().readText()

    private fun ResponseBody.toResponse(request: Request, code: Int) = Response.Builder()
        .request(request)
        .protocol(Protocol.HTTP_1_1)
        .code(code)
        .message("OK")
        .header("Content-Type", "application/javascript")
        .apply { header("Access-Control-Allow-Origin", "https://${URL(pegaUrl).host}") }  // Allow CORS for testing
        .body(this)
        .build()

    companion object {
        private const val TAG = "MockInterceptor"
        const val DX_API_PATH = "/prweb/api/application/v2/"

        fun Request.isDxApi(path: String) = url.encodedPath.startsWith(DX_API_PATH + path)

        fun RequestBody.string() = Buffer().apply { writeTo(this) }.readUtf8()
    }
}
