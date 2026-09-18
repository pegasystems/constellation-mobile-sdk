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
            implementation(libs.compose.ui.tooling.preview)
            implementation(libs.androidx.activity.compose)
            implementation(libs.oidc.appsupport)
            implementation(libs.oidc.tokenstore)
            implementation(libs.okhttp)
        }

        androidInstrumentedTest.dependencies {
            implementation(libs.compose.material3)
            implementation(libs.compose.ui.test)
            implementation(libs.androidx.lifecycle.viewmodelCompose)
            implementation(libs.androidx.ui.test.junit4)
            implementation(libs.androidx.ui.test.junit4.android)
            implementation(libs.androidx.uiautomator)
            implementation(libs.kotlin.test)
            implementation(libs.androidx.test.core)
            implementation(libs.androidx.test.espresso.core)
            implementation(libs.androidx.test.runner)
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
        testInstrumentationRunnerArguments["useTestStorageService"] = "true"
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

    testOptions {
        execution = "ANDROIDX_TEST_ORCHESTRATOR"

        @Suppress("UnstableApiUsage")
        managedDevices {
            localDevices {
                create("pixel") {
                    device = "Pixel 8"
                    apiLevel = 35
                    systemImageSource = "aosp-atd"
                }
            }
        }
    }

    dependencies {
        debugImplementation(libs.androidx.ui.test.manifest)
        debugImplementation(project(":test"))
        androidTestUtil(libs.androidx.orchestrator)
    }
}
