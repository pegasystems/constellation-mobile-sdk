package com.pega.constellation.sdk.kmp.engine.webview.ios.providers

import kotlinx.coroutines.runBlocking
import platform.Foundation.NSHTTPURLResponse
import platform.Foundation.NSURL
import platform.Foundation.NSURLRequest
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull
import kotlin.test.assertTrue

class BundledResourcesProviderTest {
    private val provider = BundledResourcesProvider()

    @Test
    fun test_only_https_sdk_alias_is_recognized() {
        assertTrue(provider.shouldHandle(request("https://constellation-mobile-sdk-assets/scripts/init/init.js")))
        assertFalse(provider.shouldHandle(request("http://constellation-mobile-sdk-assets/scripts/init/init.js")))
        assertFalse(provider.shouldHandle(request("https://example.com/scripts/init/init.js")))
    }

    @Test
    fun test_alias_serves_bundled_modules_with_cors() = runBlocking {
        val paths = listOf(
            "scripts/dxcomponents/components/fields/field-base.component.js",
            "scripts/dxcomponents/components/base.component.js",
            "scripts/dxcomponents/helpers/event-util.js"
        )
        for (path in paths) {
            val aliasRequest = request("https://constellation-mobile-sdk-assets/$path")
            val originalRequest = request("https://example.com/constellation-mobile-sdk-assets/$path")
            assertTrue(provider.shouldHandle(originalRequest))

            val (aliasData, aliasResponse) = provider.performRequest(aliasRequest)
            val (originalData, originalResponse) = provider.performRequest(originalRequest)
            val aliasHttpResponse = aliasResponse as NSHTTPURLResponse
            val originalHttpResponse = originalResponse as NSHTTPURLResponse

            assertTrue(aliasData.length > 0uL)
            assertEquals(originalData, aliasData)
            assertEquals(aliasRequest.URL, aliasResponse.URL)
            assertEquals(200L, aliasHttpResponse.statusCode)
            assertEquals("*", aliasHttpResponse.allHeaderFields["Access-Control-Allow-Origin"])
            assertEquals(originalResponse.MIMEType, aliasResponse.MIMEType)
            assertNull(originalHttpResponse.allHeaderFields["Access-Control-Allow-Origin"])
        }
    }

    private fun request(url: String) = NSURLRequest(uRL = NSURL(string = url))
}

