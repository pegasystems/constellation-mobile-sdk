import org.jetbrains.kotlin.gradle.ExperimentalKotlinGradlePluginApi
import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.plugin.KotlinSourceSetTree

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
        @OptIn(ExperimentalKotlinGradlePluginApi::class)
        instrumentedTestVariant.sourceSetTree.set(KotlinSourceSetTree.test)
        dependencies {
            debugImplementation(libs.androidx.ui.test.manifest)
        }
    }

    sourceSets {
        androidMain.dependencies {
            implementation(project(":core"))
            implementation(project(":engine:webview"))
            implementation(project(":samples:base-cmp-app"))
            implementation(project(":ui:components:cmp"))
            implementation(project(":ui:renderer:cmp"))
            implementation(compose.preview)
            implementation(libs.androidx.activity.compose)
            implementation(libs.oidc.appsupport)
            implementation(libs.oidc.tokenstore)
            implementation(libs.okhttp)
        }

        androidInstrumentedTest.dependencies {
            implementation(kotlin("test"))
            @OptIn(org.jetbrains.compose.ExperimentalComposeLibrary::class)
            implementation(compose.uiTest)

            implementation(libs.androidx.activity.compose)
            implementation(compose.material3)
            implementation(libs.androidx.lifecycle.viewmodelCompose)
//            implementation(libs.kotlin.test)
            implementation(libs.androidx.ui.test.junit4)
//            implementation(libs.androidx.ui.test.junit4.android)
            implementation(libs.androidx.ui.tooling)
            implementation(libs.androidx.ui.test.manifest)
//            implementation(libs.androidx.junit)
//            implementation(libs.junit)
            implementation(libs.androidx.uiautomator)
            implementation(libs.oidc.appsupport)
            implementation(libs.oidc.tokenstore)
            implementation(libs.okhttp)
            implementation(libs.androidx.activity.compose)
            implementation(project(":core"))
            implementation(project(":engine:webview"))
            implementation(project(":samples:base-cmp-app"))
            implementation(project(":ui:components:cmp"))
            implementation(project(":ui:renderer:cmp"))
            implementation(project(":test"))
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
}
