package com.pega.constellation.sdk.kmp.engine.webview

import com.pega.constellation.sdk.kmp.engine.webview.common.asJavaScriptStringLiteral
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonPrimitive
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse

class JavaScriptStringLiteralTest {
    @Test
    fun escapesStringForJavaScriptAndPreservesItsValue() {
        val value = buildString {
            append(('!'..'/').joinToString(""))
            append((':'..'@').joinToString(""))
            append(('['..'`').joinToString(""))
            append(('{'..'~').joinToString(""))
            for (codePoint in 0x00..0x1F) append(codePoint.toChar())
            append(" café 漢字 😀 \u2028 \u2029")
        }

        val literal = value.asJavaScriptStringLiteral()

        assertEquals(value, Json.parseToJsonElement(literal).jsonPrimitive.content)
        assertFalse(literal.contains('\u2028'))
        assertFalse(literal.contains('\u2029'))
    }
}
