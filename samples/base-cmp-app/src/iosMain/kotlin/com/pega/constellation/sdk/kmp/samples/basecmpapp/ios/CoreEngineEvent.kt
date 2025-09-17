package com.pega.constellation.sdk.kmp.samples.basecmpapp.ios

import com.pega.constellation.sdk.kmp.core.EngineEvent

// These functions are not actually used, but if it is not defined,
// only EngineEvent without subclasses is exposed to iOS

fun loading() = EngineEvent.Loading
fun ready() = EngineEvent.Ready
fun finished(message: String?) = EngineEvent.Finished(message)
fun error(message: String?) = EngineEvent.Error(message)
fun cancelled() = EngineEvent.Cancelled