import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
    alias(libs.plugins.composeHotReload)
}

kotlin {
    jvm()

    // Source set declarations.
    // Declaring a target automatically creates a source set with the same name. By default, the
    // Kotlin Gradle Plugin creates additional source sets that depend on each other, since it is
    // common to share sources between related targets.
    // See: https://kotlinlang.org/docs/multiplatform-hierarchy.html
    sourceSets {
        jvmMain {
            dependencies {
                implementation(project(":samples:base-cmp-app"))
                implementation(project(":core"))
                implementation(compose.desktop.currentOs)
                implementation(libs.kotlinx.coroutinesSwing)
                implementation(libs.oidc.appsupport)
            }
        }
    }
}

compose.desktop {
    application {
        mainClass = "com.pega.constellation.sdk.kmp.samples.desktopcmpapp.MainKt"

        nativeDistributions {
            targetFormats(TargetFormat.Dmg, TargetFormat.Msi, TargetFormat.Deb)
            packageName = "com.pega.constellation.sdk.kmp.samples.desktopcmpapp"
            packageVersion = "1.0.0"
        }
    }
}