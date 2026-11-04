# GitHub Copilot Instructions

## Repository Context

This repository is the Pega Constellation Mobile SDK, a Kotlin Multiplatform SDK for native Android and iOS applications. It includes shared core logic, platform-specific WebView engines, Compose Multiplatform UI components and renderers, JavaScript bridge components, tests, and sample applications.

Read `AGENTS.md`, `.specify/memory/constitution.md`, the relevant module README, and the relevant `docs/` page before proposing or changing code.

## Required Behavior

- For non-trivial work, use the spec-driven sequence: specification, clarification/research, plan, tasks, implementation, verification.
- Treat `specs/<feature>/spec.md`, `plan.md`, and `tasks.md` as the source of truth for feature scope.
- Inspect existing code and tests before making assumptions. Never invent APIs, module names, supported platforms, or test results.
- Preserve Kotlin Multiplatform source-set and module boundaries.
- Prefer minimal changes that follow existing Kotlin, Compose, SwiftUI, JavaScript, and Gradle patterns.
- Keep authentication tokens, customer data, and secrets out of source, fixtures, logs, and documentation.
- Update documentation and release notes when public behavior, supported versions, or integration steps change.
- Do not create or modify GitHub Actions workflows unless the user explicitly requests that exception.

## Verification

Use the checked-in Gradle Wrapper. Select the narrowest relevant checks first, then run broader checks when practical. Report commands that were run and any limitations, especially when Android devices, Xcode, or external Pega environments are unavailable.
