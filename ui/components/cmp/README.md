## Constellation SDK - Compose Multiplatform UI Components

This module provides multiplatform UI components for the Constellation SDK.
It supports Android, iOS, and JVM platforms via Compose Multiplatform.

### Gradle setup

To use these components in your Compose Multiplatform application, add the dependency to your `build.gradle.kts` file.

### Android setup

As some components may require Android-specific context, ensure to initialize the AppContext in your `Application` or `Activity`:

```kotlin
AppContext.init(this)
```
