@file:Suppress("UnstableApiUsage")

rootProject.name = "constellation-mobile-sdk"
enableFeaturePreview("TYPESAFE_PROJECT_ACCESSORS")

pluginManagement {
    repositories {
        google {
            mavenContent {
                includeGroupAndSubgroups("androidx")
                includeGroupAndSubgroups("com.android")
                includeGroupAndSubgroups("com.google")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositories {
        google {
            mavenContent {
                includeGroupAndSubgroups("androidx")
                includeGroupAndSubgroups("com.android")
                includeGroupAndSubgroups("com.google")
            }
        }
        mavenCentral()
        mavenLocal()
    }
}

include(":core")
include(":engine-mock")
include(":engine-webview")
include(":samples:android-cmp-app")
include(":samples:android-compose-app")
include(":samples:base-cmp-app")
include(":samples:desktop-cmp-app")
include(":test")
include(":ui-components-cmp")
include(":ui-renderer-cmp")
