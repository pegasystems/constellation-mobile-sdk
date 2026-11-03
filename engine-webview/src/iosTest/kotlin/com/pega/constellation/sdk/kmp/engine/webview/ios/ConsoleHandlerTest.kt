package com.pega.constellation.sdk.kmp.engine.webview.ios

import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import kotlinx.cinterop.ExperimentalForeignApi
import kotlinx.cinterop.allocArray
import kotlinx.cinterop.memScoped
import kotlinx.cinterop.toKString
import platform.posix.SEEK_SET
import platform.posix.STDOUT_FILENO
import platform.posix.close
import platform.posix.dup
import platform.posix.dup2
import platform.posix.fclose
import platform.posix.fflush
import platform.posix.fgets
import platform.posix.fileno
import platform.posix.fseek
import platform.posix.stdout
import platform.posix.tmpfile
import kotlin.test.Test
import kotlin.test.assertEquals

@OptIn(ExperimentalForeignApi::class)
class ConsoleHandlerTest {
    @Test
    fun forwardedLevelsFollowTheGlobalSetting() {
        val previous = ConstellationSdk.debuggable
        try {
            val handlers = listOf(ConsoleHandler(), ConsoleHandler())
            val logged = captureOutput {
                for (enabled in listOf(false, true, false)) {
                    ConstellationSdk.debuggable = enabled
                    for (handler in handlers) {
                        for (level in 1..4) {
                            handler.handleMessage(listOf(level.toDouble(), "message $level"))
                        }
                    }
                }
            }
            val warningsAndErrors = listOf(
                "E: [ConsoleHandler] JS: message 1 null",
                "W: [ConsoleHandler] JS: message 2"
            )
            val allLevels = warningsAndErrors + listOf(
                "I: [ConsoleHandler] JS: message 3",
                "D: [ConsoleHandler] JS: message 4"
            )
            assertEquals(
                warningsAndErrors + warningsAndErrors + allLevels + allLevels +
                    warningsAndErrors + warningsAndErrors,
                logged
            )
        } finally {
            ConstellationSdk.debuggable = previous
        }
    }

    @Test
    fun malformedMessagesAreErrorsUnderEitherSetting() {
        val previous = ConstellationSdk.debuggable
        try {
            val handler = ConsoleHandler()
            val logged = captureOutput {
                ConstellationSdk.debuggable = false
                handler.handleMessage(listOf("invalid"))
                ConstellationSdk.debuggable = true
                handler.handleMessage(listOf(1.0))
            }
            assertEquals(
                List(2) { "E: [ConsoleHandler] Unexpected input passed from JS null" },
                logged
            )
        } finally {
            ConstellationSdk.debuggable = previous
        }
    }

    @Test
    fun unknownNumericLevelsRetainTheInfoFallback() {
        val previous = ConstellationSdk.debuggable
        try {
            val logged = captureOutput {
                ConstellationSdk.debuggable = true
                ConsoleHandler().handleMessage(listOf(99.0, "unknown level"))
            }
            assertEquals(listOf("I: [ConsoleHandler] JS: unknown level"), logged)
        } finally {
            ConstellationSdk.debuggable = previous
        }
    }

    private fun captureOutput(block: () -> Unit): List<String> {
        val file = checkNotNull(tmpfile()) { "Cannot create stdout capture file" }
        val original = dup(STDOUT_FILENO)
        try {
            check(original >= 0) { "Cannot duplicate stdout" }
            check(fflush(stdout) == 0) { "Cannot flush stdout" }
            check(dup2(fileno(file), STDOUT_FILENO) >= 0) { "Cannot redirect stdout" }
            block()
            check(fflush(stdout) == 0) { "Cannot flush captured stdout" }
            check(fseek(file, 0, SEEK_SET) == 0) { "Cannot rewind captured stdout" }
            return memScoped {
                val buffer = allocArray<kotlinx.cinterop.ByteVar>(4096)
                buildString {
                    while (fgets(buffer, 4096, file) != null) {
                        append(buffer.toKString())
                    }
                }.lineSequence().filter { it.isNotEmpty() }.toList()
            }
        } finally {
            if (original >= 0) {
                dup2(original, STDOUT_FILENO)
                close(original)
            }
            fclose(file)
        }
    }
}
