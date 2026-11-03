# Tasks

- [x] Remove native setting/transport and extra initialization-string encoding.
- [x] Hardcode the guarded false update and warn only when the method is missing.
- [x] Remove the standalone WebView test at the user's request; avoid test-only infrastructure.
- [x] Remove obsolete public-API documentation and tests.
- [x] Run targeted verification and review the scoped changes.

## Verification results

The standalone WebView smoke test was run successfully, then removed at the user's
request because it added little value. It is not part of the final change; there is no
dedicated automated test for this private-API guard.

Passed on 2026-11-02:

```bash
./gradlew :engine-webview:jvmTest :test:pixelAndroidDeviceTest '-Pandroid.testInstrumentationRunnerArguments.class=com.pega.constellation.sdk.kmp.test.CaseSummaryRefreshTest'
git diff --check
```

The Android command passed before the focused test was removed. The engine JVM suite
and `git diff --check` pass for the final scoped changes.

Native config/engine files and the existing SDK test class match their pre-change
contents, including EOF formatting. Only the JavaScript initializer has production
code changes. Full regression suites and iOS UI tests were not run. Existing sample
configuration and workflow-output changes are excluded from the PR.
