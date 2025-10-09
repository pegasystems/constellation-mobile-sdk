import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.androidApplication)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
}

kotlin {
    androidTarget {
        compilerOptions {
            jvmTarget.set(JvmTarget.JVM_11)
        }
    }

    sourceSets {
        androidMain.dependencies {
            implementation(project(":samples:base-cmp-app"))
            implementation(compose.preview)
            implementation(libs.androidx.activity.compose)
            implementation(libs.oidc.appsupport)
            implementation(libs.oidc.tokenstore)
            implementation(libs.okhttp)
        }

        androidInstrumentedTest.dependencies {
            implementation(compose.material3)
            @OptIn(org.jetbrains.compose.ExperimentalComposeLibrary::class)
            implementation(compose.uiTest)
            implementation(libs.androidx.lifecycle.viewmodelCompose)
            implementation(libs.androidx.ui.test.junit4)
            implementation(libs.androidx.ui.test.junit4.android)
            implementation(libs.androidx.uiautomator)
            implementation(libs.kotlin.test)
        }
    }
}

android {
    namespace = "com.pega.constellation.sdk.kmp.samples.androidcmpapp"
    compileSdk = libs.versions.android.compileSdk.get().toInt()

    defaultConfig {
        applicationId = "com.pega.constellation.sdk.kmp.samples.androidcmpapp"
        minSdk = libs.versions.android.minSdk.get().toInt()
        targetSdk = libs.versions.android.targetSdk.get().toInt()
        versionCode = 1
        versionName = "1.0"
        manifestPlaceholders["oidcRedirectScheme"] = "com.pega.mobile.constellation.sample"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    dependencies {
        debugImplementation(libs.androidx.ui.test.manifest)
        debugImplementation(project(":test"))
    }
}
