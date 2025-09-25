package com.pega.constellation.sdk.kmp.core.engine

import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngineBuilderBase
import com.pega.constellation.sdk.kmp.core.EngineEventHandler

@Suppress("unused")
class WKWebViewBasedEngineBuilder(
    val customResourceProvider: ResourceProvider
) : ConstellationSdkEngineBuilderBase()
{
    override fun build(
        config: ConstellationSdkConfig,
        handler: EngineEventHandler
    ): ConstellationSdkEngine {
        val engine = WKWebViewBasedEngine(config, handler, customResourceProvider)
        notifyBuilt(engine)
        return engine
    }
}
