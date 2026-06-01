package com.pega.constellation.sdk.kmp.test

import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State
import com.pega.constellation.sdk.kmp.core.components.structure
import com.pega.constellation.sdk.kmp.engine.webview.android.AndroidWebViewEngine
import com.pega.constellation.sdk.kmp.test.mock.MockHttpClient
import com.pega.constellation.sdk.kmp.test.mock.MockInterceptor
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.cancel
import kotlinx.coroutines.runBlocking
import org.junit.runner.RunWith
import kotlin.test.AfterTest
import kotlin.test.BeforeTest
import kotlin.test.Test
import kotlin.test.assertEquals

@RunWith(AndroidJUnit4::class)
class ConstellationSdkTest : ConstellationSdkBaseTest() {
    private val appContext = InstrumentationRegistry.getInstrumentation().targetContext
    private val scope = CoroutineScope(Dispatchers.Main)

    @BeforeTest
    fun setup() {
        runBlocking(Dispatchers.Main) {
            val interceptor = MockInterceptor(appContext, PegaVersion.v24_1_0)
            val engine = AndroidWebViewEngine(
                context = appContext,
                scope = scope,
                okHttpClient = MockHttpClient(interceptor),
                nonDxOkHttpClient = MockHttpClient(interceptor)
            )
            this@ConstellationSdkTest.engine = engine
            sdk = ConstellationSdk.create(config, engine)
        }
    }

    @AfterTest
    fun teardown() {
        runBlocking(Dispatchers.Main) {
            engine?.destroy()
            scope.cancel()
        }
    }

    @Test
    fun test_engine_pause_resume() = runTest {
        (engine as AndroidWebViewEngine).pause()
        sdk.createCase(CASE_CLASS)
        sdk.assertState<State.Loading>()
        (engine as AndroidWebViewEngine).resume()
        val root = sdk.assertState<State.Ready>().root
        assertEquals(EXPECTED_COMPONENT_STRUCTURE, root.structure())
    }
}