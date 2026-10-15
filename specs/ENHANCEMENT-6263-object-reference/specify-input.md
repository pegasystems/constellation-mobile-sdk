# SpecKit Specify Input: ENHANCEMENT-6263-object-reference

This document preserves the agreed implementation proposal as input to the specify workflow. It is research/design context, not a generated SpecKit implementation plan. The requirements are in [spec.md](spec.md).

## User Decisions

- Use current `master` as the baseline; use PR #48's `Add ObjectReference support` commit `ddd58848a9d9d63861c33e9b7979884a41b1b8bc` as draft input.
- Assess compatibility with Pega 24, 25, and 26 where ObjectReference metadata is available.
- Include obtaining representative cases and sanitized DX responses as a prerequisite task.
- Prioritize a working, demo-able Android/iOS CMP implementation.
- Do not implement missing child components such as Autocomplete for native SwiftUI; provide ObjectReference wrapper support using existing views and document limitations.

## Proposed Delivery Scope

Implement ObjectReference as a metadata adapter reusing existing controls. Cover single Autocomplete/Dropdown, multiple Combobox/Multiselect, Checkbox Group, Cards, Table/SimpleTable, and read-only/display-only modes where valid for supplied metadata. Verify selection, required/disabled/hidden behavior, parameter changes, refreshes, and saved references.

Android CMP and iOS CMP are primary demo platforms. Android native Jetpack Compose uses the existing CMP renderer and must be verified against newly published local artifacts. Native SwiftUI receives only a wrapper integration and an existing-child Dropdown example; missing generated-child views retain the sample's explicit unsupported-renderer behavior.

Defer Advanced Search and Select, creating referenced records, interactive reference navigation/details, Map, Embedded Insight Table, and review-mode persistence. Do not silently claim support for excluded capabilities.

## Research Provenance

- Repository guidance: `AGENTS.md`, `.specify/memory/constitution.md`, `CONTRIBUTING.md`, relevant module/sample READMEs and integration docs, and component/migration/test skills.
- Mobile draft: https://github.com/Pega-ProductEngineering/constellation-mobile-sdk/pull/48 and commit `ddd58848a9d9d63861c33e9b7979884a41b1b8bc`.
- Angular components inspected at `aeec6ab9236b98600dc7c85fe86b8d05bc9d1576`: `packages/angular-sdk-components/src/lib/_components/field/object-reference/object-reference.component.ts`, its HTML template, and `_helpers/objectReference-utils.ts`.
- React components inspected at `44a8f4d3f5e1e436a7ab88c5e7c37d22107eac69`: `packages/react-sdk-components/src/components/field/ObjectReference/ObjectReference.tsx` and `utils.ts`.
- Angular application inspected at `d925bd8e04ea4e720e8bb4ffdb2ae13fc16d6a19`; React application at `86e1a7b24883e90f0d48c0b437bac61a6576a4ee`. The application repositories consume their respective component packages.

Both upstream components translate ObjectReference metadata into existing controls, normalize Combobox by cardinality, and carry reference type, paths, datasource parameters, descriptors, and composite-key metadata. They differ in calculated Cards, Map routing, and composite-key matching. Establish mobile contracts from representative data, rather than mixing upstream differences speculatively.

## Draft Findings to Carry Into Planning

- Adapt old `scripts/` locations to the canonical `engine-webview/src/commonMain/composeResources/files/scripts/` directory.
- Correct early `readonly-multi` text routing so configured Cards/tables remain reachable.
- Preserve annotated composite-key references required by existing select helpers; align selected datasource key and destination value path.
- Guard parameterized CheckboxGroup requests against stale completion and context changes; verify failure/reload behavior.
- Use current `BaseComponent` PConnect/context resubscription and container lifecycle conventions.
- Do not enable review editing without persistence; this capability is excluded from the initial delivery.
- Avoid single-value Autocomplete fallback for multiple-selection configurations.
- Trace callbacks through every reused child; passing `onRecordChange` does not establish that every child consumes it.
- Review draft Checkbox/Card event-boundary changes only if required and protect DataReference regressions.
- Add deterministic fixtures and behavioral coverage; the draft's syntax/compilation checks do not establish feature readiness.

## Proposed Work Sequence

1. Specify supported combinations and obtain demo metadata/responses: single Dropdown/Autocomplete, multiple Combobox, read-only saved references, and one dependent parameter change first; extend to Cards, Checkbox Group, and tables.
2. Add the JS adapter/helpers under `dxcomponents/components/fields/` and register in `dxcomponents/mappings/sdk-pega-component-map.js`. Preserve child contracts, context lifecycle, visibility teardown, async guards, and required refresh behavior.
3. Add `ObjectReferenceComponent` under `core/.../components/containers/`, its component type/default producer, and a delegating CMP renderer under `ui-renderer-cmp/.../containers/`. Add default renderer registration. Reuse existing UI primitives.
4. Demonstrate through the CMP case picker. Publish SDK artifacts for Android native sample verification. Check its existing `defaultHttpClient()` call against current `defaultCallFactory()` API if compilation is blocked.
5. Add only a SwiftUI ObjectReference wrapper in `SDKSupport/UI/Containers/` and explicit dispatch before the generic container in `SDKSupport/UI/Renderer.swift`; verify an existing Dropdown child.
6. Verify correct submitted identities/page instructions, preselected replacement, composite keys, nested contexts, hidden required fields, disabled/read-only state, parameter races/failure recovery, and dependent refresh. Run related DataReference/selector regressions when shared behavior changes.
7. Document the support matrix, provenance, exact checks/results, and reproducible Android/iOS CMP demo steps in relevant READMEs and a feature demo guide.

## Planned Verification Inputs

Use shared sanitized responses under `test/src/commonMain/composeResources/files/responses/` and Android CMP instrumented tests alongside DataReference tests. Add only the minimal mocked JS runner needed to test helper/lifecycle/race contracts; no established component JS test suite was found during research.

Candidate verification commands from the proposal (not executed during specification):

```bash
./gradlew :core:compileKotlinJvm :core:jvmTest :engine-webview:jvmTest :ui-renderer-cmp:compileKotlinJvm
./gradlew :samples:android-cmp-app:assembleDebug
./gradlew :test:pixelAndroidDeviceTest
./gradlew :samples:android-cmp-app:pixelDebugAndroidTest
./gradlew publishToMavenLocal
./gradlew :samples:android-compose-app:assembleDebug
./gradlew :engine-webview:assembleConstellationSdkDebugXCFramework
./gradlew :engine-webview:assembleConstellationSdkReleaseXCFramework
```

Build/run iOS CMP and native SwiftUI through their Xcode integration phases. Verify the SwiftUI `UITest` scheme and minimal Dropdown scenario. Later planning must resolve precise task/scheme applicability and record environment prerequisites.

## Delivery Gate

The primary CMP demo must complete real selection, parameter refresh, submission, and read-only persisted results on Android and iOS. Supported submissions must match selected identities. Android native must consume updated artifacts; native SwiftUI must recognize the wrapper and work for its existing Dropdown view. Platform/version limitations and regression results must be recorded. Prioritize the selector vertical slice before expanding presentation coverage.
