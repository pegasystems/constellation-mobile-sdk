package com.pega.constellation.sdk.kmp.test

import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.pega.constellation.sdk.kmp.engine.webview.android.AndroidWebViewEngine
import com.pega.constellation.sdk.kmp.test.mock.MockHttpClient
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import org.junit.runner.RunWith
import kotlin.test.BeforeTest

@RunWith(AndroidJUnit4::class)
class ConstellationSdkTest : ConstellationSdkBaseTest() {
    private val appContext = InstrumentationRegistry.getInstrumentation().targetContext

    @BeforeTest
    fun setup() {
        engine = AndroidWebViewEngine(
            context = appContext,
            okHttpClient = MockHttpClient(appContext, PegaVersion.v24_1_0),
            nonDxOkHttpClient = MockHttpClient(appContext, PegaVersion.v24_1_0)
        )
    }
}