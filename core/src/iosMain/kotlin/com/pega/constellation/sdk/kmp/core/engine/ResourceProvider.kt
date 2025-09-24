
package com.pega.constellation.sdk.kmp.core.engine

import platform.Foundation.NSData
import platform.Foundation.NSURLRequest
import platform.Foundation.NSURLResponse

interface ResourceProvider {
    fun shouldHandle(request: NSURLRequest): Boolean
    suspend fun performRequest(request: NSURLRequest): Pair<NSData, NSURLResponse>
}