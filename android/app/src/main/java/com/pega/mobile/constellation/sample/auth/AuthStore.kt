/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sample.auth

import android.content.Context
import android.content.Context.MODE_PRIVATE
import net.openid.appauth.AuthState

class AuthStore(context: Context) {
    private val prefs = context.getSharedPreferences("auth", MODE_PRIVATE)

    fun read(): AuthState =
        prefs.getString("state", null)
            ?.let { AuthState.jsonDeserialize(it) }
            ?: AuthState()

    fun write(state: AuthState) {
        prefs.edit()
            .putString("state", state.jsonSerializeString())
            .apply()
    }
}
