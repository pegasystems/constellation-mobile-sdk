# Quickstart Validation: Engine Lifecycle Race Fix

## Prerequisites

- JDK 17 or newer.
- A checkout of the repository with the Gradle Wrapper available.
- Android and/or iOS platform tooling for platform-specific tests when available.

## Validation

1. Run the common and engine-focused checks:

   ```bash
   ./gradlew :test:allTests
   ./gradlew :engine-webview:jvmTest
   ```

2. Run the platform-specific engine tests available in the local environment.

3. Verify the following outcomes:

   - Destroying during initialization produces no later SDK events.
   - Android page-load, JavaScript evaluation, bridge, and queued component callbacks are safe after destruction.
   - iOS form/script callbacks are safe after handlers or component managers are cleared.
   - Normal initialization and event delivery still pass.
   - Repeated destruction does not crash.

The public lifecycle expectations are defined in [`contracts/engine-lifecycle.md`](contracts/engine-lifecycle.md), and the internal state model is documented in [`data-model.md`](data-model.md).
