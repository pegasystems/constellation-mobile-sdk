package com.pega.mobile.constellation.sample

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.lifecycle.lifecycleScope
import com.pega.mobile.constellation.sample.auth.AuthManager
import com.pega.mobile.constellation.sample.auth.AuthManager.AuthResult.Failed
import com.pega.mobile.constellation.sample.auth.AuthManager.AuthResult.Success
import com.pega.mobile.constellation.sample.ui.screens.LoginScreen
import com.pega.mobile.constellation.sample.ui.theme.SampleSdkTheme
import kotlinx.coroutines.launch
import net.openid.appauth.AuthorizationException

class LoginActivity : ComponentActivity() {
    private val authManager by lazy { AuthManager(this) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (authManager.isAuthorized) {
            proceedToMainActivity()
        } else {
            authManager.register(this)
            setContent()
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        authManager.dispose()
    }

    private fun setContent() {
        setContent {
            SampleSdkTheme {
                LoginScreen(onLogin = { authorize() })
            }
        }
    }

    private fun authorize() {
        lifecycleScope.launch {
            when (val result = authManager.authorize()) {
                is Success -> proceedToMainActivity()
                is Failed -> showError(result.exception)
            }
        }
    }

    private fun proceedToMainActivity() {
        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }

    private fun showError(exception: AuthorizationException) {
        Toast.makeText(this@LoginActivity, exception.errorDescription, Toast.LENGTH_SHORT).show()
    }
}
