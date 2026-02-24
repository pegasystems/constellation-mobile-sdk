package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.fake

import org.publicvalue.multiplatform.oidc.OpenIdConnectClient
import org.publicvalue.multiplatform.oidc.flows.CodeAuthFlowFactory

class FakeAuthFlowFactory : CodeAuthFlowFactory {
    override fun createAuthFlow(client: OpenIdConnectClient) = error("Not supported in tests")
    override fun createEndSessionFlow(client: OpenIdConnectClient) = error("Not supported in tests")
}
