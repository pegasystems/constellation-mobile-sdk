package com.pega.constellation.sdk.kmp.test

import androidx.test.platform.app.InstrumentationRegistry
import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.api.Component
import com.pega.constellation.sdk.kmp.core.components.children
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentCardComponent
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentComponent
import com.pega.constellation.sdk.kmp.core.components.containers.DefaultFormComponent
import com.pega.constellation.sdk.kmp.core.components.containers.FlowContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.OneColumnComponent
import com.pega.constellation.sdk.kmp.core.components.containers.RegionComponent
import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ViewComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ViewContainerComponent
import com.pega.constellation.sdk.kmp.core.components.widgets.ActionButtonsComponent
import com.pega.constellation.sdk.kmp.engine.webview.android.AndroidWebViewEngine
import com.pega.constellation.sdk.kmp.test.mock.MockHttpClient
import com.pega.constellation.sdk.kmp.test.mock.MockInterceptor
import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.cancel
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withTimeoutOrNull
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import org.junit.rules.ExternalResource
import kotlin.test.assertTrue
import kotlin.time.Duration.Companion.seconds

class ConstellationSdkTestRule(private val pegaVersion: PegaVersion) : ExternalResource() {
    private val appContext = InstrumentationRegistry.getInstrumentation().targetContext
    private var scope: CoroutineScope? = null
    private lateinit var mockInterceptor: MockInterceptor
    var engine: ConstellationSdkEngine? = null
        private set
    val config = ConstellationSdkConfig(pegaUrl = "https://insert-url-here.example/prweb")
    lateinit var sdk: ConstellationSdk
        private set

    override fun before() {
        runBlocking(Dispatchers.Main) {
            setup()
        }
    }

    override fun after() {
        runBlocking(Dispatchers.Main) {
            tearDown()
        }
    }

    fun runTest(block: suspend ConstellationSdkTestRule.() -> Unit) =
        runBlocking(Dispatchers.Main) {
            for (attempt in 1..2) {
                if (attempt > 1) {
                    setup()
                }
                runCatching {
                    block(this@ConstellationSdkTestRule)
                }.also {
                    if (it.isSuccess) break
                    if (attempt == 2) it.getOrThrow()
                    tearDown()
                }
            }
        }

    fun findMockRequest(urlPart: String): MockRequest? = mockInterceptor.findRequest(urlPart)

    private fun setup() {
        scope = CoroutineScope(Dispatchers.Main)
        mockInterceptor = MockInterceptor(appContext, pegaVersion)
        val engine = AndroidWebViewEngine(
            context = appContext,
            scope = requireNotNull(scope),
            callFactory = MockHttpClient(mockInterceptor),
            nonDxCallFactory = MockHttpClient(mockInterceptor)
        )
        this@ConstellationSdkTestRule.engine = engine
        sdk = ConstellationSdk.create(config, engine)
    }

    private fun tearDown() {
        engine?.destroy()
        scope?.cancel()
    }
}

internal suspend fun waitForStep(flowContainer: FlowContainerComponent, title: String) {
    waitUntil("Step with title '$title' is not visible") {
        flowContainer.title == title
    }
}

internal suspend fun waitUntil(errorMessage: String, predicate: () -> Boolean) =
    withTimeoutOrNull(5.seconds) {
        while (!predicate()) {
            delay(10)
        }
    } ?: throw IllegalStateException(errorMessage)

internal fun Component.descendants(): List<Component> =
    children().flatMap { listOf(it) + it.descendants() }

internal suspend fun ConstellationSdk.assertError(condition: (String) -> Boolean) {
    val errorMessage = assertState<State.Error>().error.message
    assertTrue(condition(errorMessage))
}

internal suspend inline fun <reified S : State> ConstellationSdk.assertState() =
    withTimeoutOrNull(5.seconds) { state.first { it is S } as S }
        ?: error("Timed out waiting for ${S::class.simpleName} state, actual: ${state.value}")

internal fun JsonElement.containsString(value: String): Boolean = when (this) {
    is JsonPrimitive -> isString && content == value
    is JsonObject -> values.any { it.containsString(value) }
    is JsonArray -> any { it.containsString(value) }
}

internal fun Component.clickPrimaryButton(name: String) {
    val actionButtons = (listOf(this) + descendants()).filterIsInstance<ActionButtonsComponent>().single()
    actionButtons.onClick(actionButtons.primaryButtons.single { it.name.trim() == name })
}

internal fun RootContainerComponent.getDefaultForm(): DefaultFormComponent {
    val viewContainer = children()[1] as ViewContainerComponent
    val view = viewContainer.children[0] as ViewComponent
    val oneColumn = view.children[0] as OneColumnComponent
    val region = oneColumn.children[0] as RegionComponent
    val view2 = region.children[0] as ViewComponent
    val region2 = view2.children[0] as RegionComponent
    val view3 = region2.children[0] as ViewComponent
    val flowContainer = view3.children[0] as FlowContainerComponent
    val assignment = flowContainer.children.filterIsInstance<AssignmentComponent>()[0]
    val assignmentCard = assignment.children[0] as AssignmentCardComponent
    val view4 = assignmentCard.children[0] as ViewComponent
    return view4.children[0] as DefaultFormComponent
}
