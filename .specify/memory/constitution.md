<!--
Sync Impact Report
- Version: 1.0.2 -> 1.1.0
- Modified principles: None
- Added sections: Engineering standard for avoiding unjustified duplication.
- Removed sections: None
- Templates requiring updates: None; templates read the constitution at runtime.
- Follow-up TODOs: None
-->

# Constellation Mobile SDK Constitution

## Core Principles

### I. Specification Before Implementation

Every non-trivial change MUST begin with a feature specification under `specs/<feature>/spec.md` before implementation work starts. The specification MUST describe the user or integrator value, scope, assumptions, prioritized independently testable scenarios, acceptance criteria, and measurable success conditions. Ambiguities MUST be resolved in the specification rather than hidden in code.

### II. Preserve Multiplatform Boundaries

Changes MUST respect the Kotlin Multiplatform architecture and existing module responsibilities. Shared behavior belongs in `commonMain` unless platform APIs are required. Android, iOS, and JVM-specific behavior MUST remain in the appropriate source set. UI components, renderers, engines, JavaScript bridge code, and samples MUST not gain accidental cross-module dependencies.

### III. Public APIs Are Compatibility Contracts

Changes to public Kotlin APIs, component types, renderer contracts, JavaScript component mappings, resource paths, or published module behavior MUST document compatibility impact and migration guidance. Existing supported use cases MUST remain stable unless a breaking change is explicitly specified, reviewed, and called out in release documentation.

### IV. Verification Is Part of the Design

Each specification MUST define how behavior will be verified. Implementations MUST include the smallest appropriate automated tests and MUST run relevant Gradle, Android, iOS, JavaScript, or sample checks before review. Test fixtures and deterministic mocked responses SHOULD be preferred over network-dependent tests. A change is not complete when it compiles only; the acceptance scenarios and affected platform paths must be exercised.

Tests MUST NOT be created for test classes or test infrastructure, including mock handlers,
test rules, helpers, and fixtures. Changes to that infrastructure MUST be verified through
existing SDK or sample scenarios that use it, rather than adding tests of the tests.

### V. Secure and Observable Integration

Authentication tokens, customer data, and environment-specific secrets MUST NOT be committed, logged, or embedded in examples. WebView and network changes MUST preserve request isolation and existing authentication boundaries. Failures MUST surface through the SDK's established state and error mechanisms, with enough diagnostic context for troubleshooting but without leaking sensitive data.

### VI. Documentation Is a Deliverable

User-visible behavior, public APIs, supported platform constraints, integration steps, and release-impacting changes MUST be documented in the relevant README or `docs/` page as part of the same change. Examples MUST use the checked-in Gradle Wrapper and current project versions. AI-facing instructions MUST defer to repository documentation and MUST never invent unsupported APIs or platform behavior.

## Engineering Standards

- Use the existing Kotlin, Kotlin Multiplatform, Compose Multiplatform, SwiftUI, JavaScript, and Gradle conventions before introducing new abstractions.
- Avoid unjustified code duplication in production and test code. Reuse existing
  methods or extract common helpers for equivalent behavior when doing so preserves
  clarity, behavior, and module boundaries; retain duplication when a concrete
  architectural or behavioral difference justifies it.
- Write Kotlin `if` constructs with braces and each branch on separate lines, even when a branch contains a single statement or expression; do not use single-line branches.
- Keep changes focused. Do not mix unrelated refactoring, dependency upgrades, formatting churn, or generated artifacts with feature work.
- Prefer explicit types and small composable functions. Add comments only where the intent or platform constraint is not obvious from the code.
- New components MUST define both the business-logic integration needed by the JavaScript bridge and the native rendering or fallback behavior required by supported platforms.
- UI changes MUST account for Android and iOS behavior and include appropriate unit, instrumented, or sample coverage when applicable.
- Changes to test fixtures, CDN assets, or generated resources MUST explain their provenance and update any associated instructions.

## Spec-Driven Workflow

1. Write or update `specs/<feature>/spec.md` and validate user scenarios and scope.
2. Record unresolved decisions in `specs/<feature>/research.md` or resolve them through clarification before planning.
3. Create `plan.md` with affected modules, source sets, APIs, test strategy, documentation impact, and compatibility assessment.
4. Create `tasks.md` with ordered, independently verifiable tasks grouped by user story and exact repository paths.
5. Implement only the approved scope, keeping the specification and plan synchronized when discoveries require a change.
6. Run the checks listed in the plan, review the diff, and update documentation and release notes when applicable.

## Governance

This constitution supplements `AGENTS.md`, module READMEs, and existing build or contribution documentation. When guidance conflicts, the more specific repository or module rule applies, while security and compatibility requirements remain mandatory. Constitution changes require a rationale, an update to the version and amendment date below, and review by the repository maintainers. Version amendments follow semantic versioning: major for incompatible governance changes, minor for new or materially expanded guidance, and patch for clarifications. Reviews MUST check compliance and document justified exceptions.

**Version**: 1.1.0 | **Ratified**: 2026-08-12 | **Last Amended**: 2026-11-04
