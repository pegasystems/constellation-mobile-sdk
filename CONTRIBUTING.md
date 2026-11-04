# Contributing to Constellation Mobile SDK

## Before You Start

Read the root `AGENTS.md`, `.specify/memory/constitution.md`, the relevant module README, and any related page under `docs/`. Use existing code, tests, and fixtures as the primary source of truth. Do not include secrets, customer data, or generated build output in a change.

## Spec-Driven Development

Use the following sequence for non-trivial features, behavior changes, public API changes, and cross-platform work:

1. Create `specs/<feature>/spec.md` with user value, scope, prioritized scenarios, acceptance criteria, constraints, and success criteria.
2. Resolve ambiguity in `specs/<feature>/research.md` before planning. Ask the user when repository evidence is insufficient.
3. Create `specs/<feature>/plan.md` with affected modules/source sets, design, compatibility impact, test strategy, and documentation impact.
4. Create `specs/<feature>/tasks.md` with exact paths, dependencies, acceptance-test tasks, and validation tasks.
5. Implement the approved tasks without unrelated refactoring. Keep the specification and plan current when discoveries change scope.
6. Run the planned checks, review the complete diff, and update documentation or release notes as needed.

GitHub Copilot users can use the installed Spec-Kit skills in this order: `/speckit-specify`,
`/speckit-clarify` when needed, `/speckit-plan`, `/speckit-tasks`, `/speckit-analyze`,
`/speckit-implement`, and `/speckit-converge` when needed. Use `/speckit-checklist` when a
requirements checklist is useful. Read the existing constitution; use `/speckit-constitution`
only when intentionally creating or amending it. Analysis requires existing spec, plan, and
tasks artifacts. The skills are guidance, not a substitute for engineering review.

Repository skills live in `.github/skills/`. Alongside Spec-Kit and release preparation, they cover Angular-to-JavaScript migration, JavaScript component unit tests, core Kotlin components, Compose Multiplatform UI components and renderers, Android instrumented Compose UI tests (`android-instrumented-ui-test`), and non-UI SDK/WebView integration tests (`constellation-sdk-test`).

When a branch spans multiple features, select the intended feature explicitly rather than
assuming `.specify/feature.json` follows the Git branch. See
[Spec-Kit feature selection](.specify/README.md#selecting-an-existing-feature).

## Local Verification

Use the checked-in wrapper and JDK 17 or newer:

```bash
./gradlew build
```

Run narrower checks when appropriate, for example:

```bash
./gradlew :core:allTests
./gradlew :test:pixelAndroidDeviceTest
```

For connected Android devices, use `:test:connectedAndroidDeviceTest` for SDK integration
tests or `:samples:android-cmp-app:connectedDebugAndroidTest` for sample UI tests. Sample
scenarios are grouped by Pega version; SDK classes currently cover Pega 24 and 25. Follow
the [sample test guide](samples/android-cmp-app/README.md#instrumented-tests) and
[fixture/CDN guide](test/src/commonMain/composeResources/files/responses/README.md).
Do not treat an empty test selection or SDK Android coverage as iOS coverage.

Android device tests require an available emulator or device. iOS sample and UI tests require macOS and a compatible Xcode installation. If a check cannot run locally, report the limitation and validate the remaining affected paths.

## Pull Requests

- Explain the user or integrator value and link the relevant specification.
- Summarize affected modules, platforms, public APIs, and compatibility impact.
- List verification commands and results, including unavailable checks.
- Include screenshots or recordings for meaningful UI changes when practical.
- Keep changes focused and do not add GitHub workflows as part of scaffolding or feature work unless explicitly requested.
