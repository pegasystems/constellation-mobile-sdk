plugins {
    alias(libs.plugins.androidApplication)
    alias(libs.plugins.kotlinAndroid)
    alias(libs.plugins.composeCompiler)
    alias(libs.plugins.composeMultiplatform)
}

android {
    namespace = "com.pega.constellation.sdk.kmp.samples.androidcomposeapp"
    compileSdk = libs.versions.android.compileSdk.get().toInt()

    defaultConfig {
        applicationId = "com.pega.constellation.sdk.kmp.samples.androidcomposeapp"
        minSdk = libs.versions.android.minSdk.get().toInt()
        targetSdk = libs.versions.android.targetSdk.get().toInt()
        versionCode = 1
        versionName = "1.0"
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
}

kotlin {
    jvmToolchain(11)
}

dependencies {
    val sdkVersion = property("version") as String
    implementation("com.pega.constellation.sdk.kmp:ui-components-cmp:$sdkVersion")
    implementation("com.pega.constellation.sdk.kmp:ui-renderer-cmp:$sdkVersion")
    implementation("com.pega.constellation.sdk.kmp:core:$sdkVersion")
    implementation("com.pega.constellation.sdk.kmp:engine-webview:$sdkVersion")

    implementation(compose.foundation)
    implementation(compose.material3)
    implementation(libs.androidx.activity.compose)
    implementation(libs.okhttp)
}
